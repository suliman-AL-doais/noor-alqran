import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Play, Pause, Settings2, SkipForward, SkipBack, Maximize, Minimize, CheckCircle, Bookmark } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  audio: string;
}

interface SurahData {
  number: number;
  name: string;
  englishName: string;
  ayahs: Ayah[];
}

export default function SurahReader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { quranFontSize, quranFontFamily, qariId, lastRead, setLastRead, completedSurahs, toggleSurahCompleted, bookmarkedAyahs, toggleAyahBookmark } = useStore();
  
  const [surah, setSurah] = useState<SurahData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeAyah, setActiveAyah] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ayahRefs = useRef<Record<number, HTMLSpanElement | null>>({});

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.alquran.cloud/v1/surah/${id}/${qariId}`)
      .then(res => res.json())
      .then(data => {
        setSurah(data.data);
        const parsedId = parseInt(id || '1');
        const queryParams = new URLSearchParams(location.search);
        const targetAyah = queryParams.get('ayah');
        if (targetAyah) {
          setActiveAyah(parseInt(targetAyah));
        } else if (useStore.getState().lastRead?.surah === parsedId) {
          setActiveAyah(useStore.getState().lastRead!.ayah);
        } else {
          setActiveAyah(data.data.ayahs[0].numberInSurah);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id, qariId]);

  useEffect(() => {
    if (surah && activeAyah) {
      setLastRead({ surah: surah.number, ayah: activeAyah });
    }
  }, [surah, activeAyah, setLastRead]);

  useEffect(() => {
    // Scroll active ayah into view
    if (activeAyah && ayahRefs.current[activeAyah]) {
      ayahRefs.current[activeAyah]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeAyah]);

  const currentAudioSrc = surah?.ayahs.find(a => a.numberInSurah === activeAyah)?.audio;
  const nextAudioSrc = surah?.ayahs.find(a => a.numberInSurah === activeAyah + 1)?.audio;

  useEffect(() => {
    if (nextAudioSrc) {
      const audio = new Audio(nextAudioSrc);
      audio.preload = 'auto';
    }
  }, [nextAudioSrc]);

  useEffect(() => {
    if (isPlaying && audioRef.current && currentAudioSrc) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          if (e.name !== 'AbortError') {
            console.log('Playback prevented:', e);
            setIsPlaying(false);
          }
        });
      }
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [currentAudioSrc, isPlaying]);

  useEffect(() => {
    if ('mediaSession' in navigator && surah) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: surah.name,
        artist: `الآية ${activeAyah}`,
        album: 'قرآن واذكار بدون انترنت',
      });

      navigator.mediaSession.setActionHandler('play', () => setIsPlaying(true));
      navigator.mediaSession.setActionHandler('pause', () => setIsPlaying(false));
      navigator.mediaSession.setActionHandler('nexttrack', handleNext);
      navigator.mediaSession.setActionHandler('previoustrack', handlePrev);
    }
  }, [surah, activeAyah]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (!surah) return;
    const currentIndex = surah.ayahs.findIndex(a => a.numberInSurah === activeAyah);
    if (currentIndex < surah.ayahs.length - 1) {
      setActiveAyah(surah.ayahs[currentIndex + 1].numberInSurah);
    } else {
      if (surah.number < 114) {
        navigate(`/quran/${surah.number + 1}`);
      } else {
        setIsPlaying(false);
        setActiveAyah(surah.ayahs[0].numberInSurah);
      }
    }
  };

  const handlePrev = () => {
    if (!surah) return;
    const currentIndex = surah.ayahs.findIndex(a => a.numberInSurah === activeAyah);
    if (currentIndex > 0) {
      setActiveAyah(surah.ayahs[currentIndex - 1].numberInSurah);
    } else {
      if (surah.number > 1) {
        navigate(`/quran/${surah.number - 1}`);
      }
    }
  };

  const handleAudioEnded = () => {
    handleNext();
  };

  const playSpecificAyah = (ayahNumber: number) => {
    setActiveAyah(ayahNumber);
    setIsPlaying(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen pb-20">
        <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!surah) return <div className="p-8 text-center">حدث خطأ أثناء تحميل السورة</div>;

  return (
    <div className={`flex flex-col relative transition-colors duration-500 ${isFullscreen ? 'fixed inset-0 z-[60] bg-[#fffdf7] dark:bg-[#01140e] h-[100dvh]' : 'h-[100dvh] bg-[#fbf6eb] dark:bg-transparent'}`}>
      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M50 0L100 50L50 100L0 50Z\' fill=\'%23d4af37\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")', backgroundSize: '40px 40px' }} />
      <main className="flex-1 overflow-y-auto px-4 py-8 pb-48 scroll-smooth relative z-10">
        <div 
          className="max-w-3xl mx-auto text-center leading-[2.5]"
          style={{ 
            fontSize: `${quranFontSize}px`, 
            fontFamily: quranFontFamily === 'Amiri Quran' ? '"Amiri Quran", serif' : quranFontFamily === 'Scheherazade New' ? '"Scheherazade New", serif' : quranFontFamily === 'Amiri' ? 'Amiri, serif' : 'sans-serif' 
          }}
        >
          {surah.number !== 1 && surah.number !== 9 && (
            <div className="mb-8 text-primary-700 dark:text-primary-400 font-bold">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
          )}
          
          <div className="inline">
            {surah.ayahs.map((ayah) => (
              <span 
                key={ayah.numberInSurah} 
                ref={(el) => ayahRefs.current[ayah.numberInSurah] = el}
                className={`inline transition-colors duration-300 rounded-lg ${
                  activeAyah === ayah.numberInSurah 
                    ? 'bg-primary-100/80 text-primary-900 dark:bg-primary-900/50 dark:text-primary-100 shadow-[0_0_10px_rgba(34,197,94,0.2)]' 
                    : 'text-slate-800 dark:text-slate-200'
                }`}
                onClick={() => playSpecificAyah(ayah.numberInSurah)}
                role="button"
                tabIndex={0}
              >
                {/* Remove Bismillah from Al-Fatihah first ayah text if returned by API */}
                {surah.number === 1 && ayah.numberInSurah === 1 
                  ? ayah.text 
                  : ayah.text.replace('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ', '')}
                
                <span className="inline-flex items-center justify-center relative mx-2 text-[0.42em] w-[2.8em] h-[2.8em] align-middle font-sans font-bold text-slate-800 dark:text-slate-100">
                  <svg className="absolute inset-0 w-full h-full text-[#ca8a04] dark:text-[#d4af37]/80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="3" />
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3" />
                    <path d="M50 12 L59 28 L77 23 L72 41 L88 50 L72 59 L77 77 L59 72 L50 88 L41 72 L23 77 L28 59 L12 50 L28 41 L23 23 L41 28 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                  <span className="relative z-10 pt-[2px]">{ayah.numberInSurah}</span>
                </span>
              </span>
            ))}
          </div>
        </div>
      </main>

      {/* Controls Container */}
      <div className={`fixed left-4 right-4 md:left-auto md:right-1/2 md:translate-x-1/2 md:w-[500px] flex flex-col gap-3 z-40 transition-all duration-300 ${isFullscreen ? 'bottom-8' : 'bottom-[115px] md:bottom-[115px]'}`}>
        
        <audio 
          ref={audioRef} 
          src={currentAudioSrc} 
          onEnded={handleAudioEnded}
           autoPlay={isPlaying}
        />

        {isFullscreen ? (
          <div className="flex items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
             <button 
                onClick={togglePlay}
                className="w-14 h-14 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all"
              >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
              </button>
              <button 
                onClick={() => setIsFullscreen(false)} 
                className="w-12 h-12 rounded-full glass-panel text-slate-700 dark:text-slate-200 flex items-center justify-center shadow-lg active:scale-95 transition-all"
              >
                <Minimize size={20} />
              </button>
          </div>
        ) : (
          <>
            {/* Navigation & Settings */}
            <header className="glass-panel px-4 py-3 flex items-center justify-between rounded-3xl animate-in fade-in duration-300">
              <Link to="/quran" className="p-2 -ml-2 rounded-full hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors">
                <ArrowRight size={22} />
              </Link>
              <h1 className="text-lg font-bold font-amiri">{surah.name}</h1>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => toggleSurahCompleted(surah.number)}
                  className={`p-2 rounded-full transition-colors ${completedSurahs.includes(surah.number) ? 'text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/30' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  title={completedSurahs.includes(surah.number) ? 'إلغاء إتمام السورة' : 'تحديد كـ مقروءة'}
                >
                  <CheckCircle size={20} />
                </button>
                <button 
                  onClick={() => setIsFullscreen(true)} 
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500"
                >
                  <Maximize size={20} />
                </button>
                <Link to="/settings" className="p-2 -mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500">
                  <Settings2 size={22} />
                </Link>
              </div>
            </header>

            {/* Audio Player Footer */}
            <footer className="glass-panel rounded-3xl p-3 flex items-center justify-between animate-in fade-in duration-300">
                            <div className="flex-1 px-3 truncate">
                <p className="text-sm font-bold text-slate-800 dark:text-white font-amiri truncate">{surah.name}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-slate-500">الآية {activeAyah}</p>
                  <button 
                    onClick={() => {
                      const ayahText = surah.ayahs.find(a => a.numberInSurah === activeAyah)?.text || '';
                      toggleAyahBookmark({ surah: surah.number, surahName: surah.name, ayah: activeAyah, text: ayahText });
                    }}
                    className={`p-1 rounded-full transition-colors ${bookmarkedAyahs?.find(b => b.surah === surah.number && b.ayah === activeAyah) ? 'text-primary-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                  >
                    <Bookmark size={14} fill={bookmarkedAyahs?.find(b => b.surah === surah.number && b.ayah === activeAyah) ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1" dir="ltr">
                <button 
                  onClick={handlePrev}
                  className="p-2 rounded-full text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                >
                  <SkipBack size={20} />
                </button>
                
                <button 
                  onClick={togglePlay}
                  className="w-10 h-10 mx-1 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center active:scale-95 transition-all shadow-md"
                >
                  {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                </button>

                <button 
                  onClick={handleNext}
                  className="p-2 rounded-full text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                >
                  <SkipForward size={20} />
                </button>
              </div>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}

