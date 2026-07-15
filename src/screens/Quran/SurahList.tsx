import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bookmark, CheckCircle, Trash2, ArrowLeft } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface SurahMeta {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export default function SurahList() {
  const [surahs, setSurahs] = useState<SurahMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { lastRead, completedSurahs, toggleSurahCompleted, bookmarkedAyahs, toggleAyahBookmark } = useStore();

  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/meta')
      .then(res => res.json())
      .then(data => {
        setSurahs(data.data.surahs.references);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredSurahs = surahs.filter(s => 
    s.name.includes(search) || 
    s.englishName.toLowerCase().includes(search.toLowerCase())
  );

  const completionPercentage = Math.round(((completedSurahs?.length || 0) / 114) * 100);

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <h1 className="text-3xl font-bold font-amiri text-primary-700 dark:text-primary-400">القرآن الكريم</h1>
          {lastRead && (
            <Link to={`/quran/${lastRead.surah}`} className="inline-flex items-center justify-center gap-2 bg-primary-500 text-white ring-1 ring-gold-500/50 dark:bg-primary-900/50 dark:text-primary-300 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors">
              <Bookmark size={18} />
              المتابعة من حيث توقفت
            </Link>
          )}
        </div>

        {/* Progress Bar */}
        <div className="glass-panel p-4 rounded-3xl mb-6">
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">نسبة إتمام الختمة</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">تم قراءة {completedSurahs?.length || 0} من 114 سورة</p>
            </div>
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400 font-mono">{completionPercentage}%</span>
          </div>
          <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-400 transition-all duration-1000 ease-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

                {/* Bookmarks Section */}
        {bookmarkedAyahs && bookmarkedAyahs.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
              <Bookmark size={20} className="text-primary-500" />
              العلامات المرجعية
            </h2>
            <div className="flex overflow-x-auto gap-3 pb-2 snap-x">
              {bookmarkedAyahs.map((bookmark, index) => (
                <div key={index} className="glass-panel p-4 rounded-2xl min-w-[260px] max-w-[260px] snap-start flex flex-col justify-between relative group">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-100">{bookmark.surahName}</p>
                      <p className="text-xs text-slate-500">الآية {bookmark.ayah}</p>
                    </div>
                    <button 
                      onClick={(e) => { e.preventDefault(); toggleAyahBookmark(bookmark); }}
                      className="p-1.5 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-sm font-amiri text-slate-600 dark:text-slate-300 line-clamp-2 leading-loose">
                    {bookmark.text}
                  </p>
                  <Link 
                    to={`/quran/${bookmark.surah}?ayah=${bookmark.ayah}`}
                    className="mt-3 flex items-center justify-end gap-1 text-xs font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 transition-colors"
                  >
                    <span>الانتقال للآية</span>
                    <ArrowLeft size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="relative">
          <input
            type="text"
            placeholder="ابحث عن سورة..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full glass-panel py-4 px-12 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow rounded-3xl"
          />
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
        </div>
      </header>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
          {filteredSurahs.map((surah) => (
            <Link
              key={surah.number}
              to={`/quran/${surah.number}`}
              className="glass p-4 rounded-3xl flex items-center gap-4 hover:scale-[1.02] hover:bg-slate-50/50 dark:hover:bg-slate-800/50 active:scale-95 transition-all group"
            >
              <div className="w-12 h-12 flex-shrink-0 bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 rounded-xl flex items-center justify-center font-bold relative overflow-hidden">
                <span className="relative z-10">{surah.number}</span>
                <div className="absolute inset-0 border-[3px] border-primary-200 dark:border-primary-800 rounded-xl rotate-45 scale-110 group-hover:rotate-90 transition-transform duration-500"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg font-amiri text-slate-800 dark:text-slate-100">{surah.name}</h3>
                  {completedSurahs?.includes(surah.number) && (
                    <CheckCircle size={18} className="text-primary-500" />
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <span>{surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}</span>
                  <span>•</span>
                  <span>{surah.numberOfAyahs} آية</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
