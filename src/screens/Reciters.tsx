import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store/useStore';
import { Search, Download, Trash2, PlayCircle, CheckCircle, Headphones, Loader2 } from 'lucide-react';

interface Qari {
  identifier: string;
  name: string;
  englishName: string;
  language: string;
}

export default function Reciters() {
  const { t, i18n } = useTranslation();
  const { qariId, setQariId, downloadedReciters, addDownloadedReciter, removeDownloadedReciter } = useStore();
  
  const [qaris, setQaris] = useState<Qari[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // To track download progress per reciter (mocking the download)
  const [downloadProgress, setDownloadProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/edition/format/audio')
      .then(res => res.json())
      .then(data => {
        const arabicQaris = data.data.filter((q: Qari) => q.language === 'ar');
        setQaris(arabicQaris);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleDownload = (id: string) => {
    setDownloadProgress(prev => ({ ...prev, [id]: 0 }));
    
    // Mock download progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5; // increment by 5-20%
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        addDownloadedReciter(id);
        // Remove from progress state after done
        setTimeout(() => {
          setDownloadProgress(prev => {
            const next = { ...prev };
            delete next[id];
            return next;
          });
        }, 1000);
      }
      setDownloadProgress(prev => ({ ...prev, [id]: progress }));
    }, 500);
  };

  const filteredQaris = qaris.filter(q => 
    q.name.toLowerCase().includes(search.toLowerCase()) || 
    q.englishName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500 pb-32">
      
      {/* Hero 3D Card */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#063023] to-[#021812] border border-[#d4af37]/30 p-8 text-white shadow-[0_20px_40px_rgba(0,0,0,0.3),inset_0_2px_10px_rgba(212,175,55,0.2)] mb-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 flex items-center justify-center mb-4 border border-[#d4af37]/40 shadow-inner">
            <Headphones size={32} className="text-[#fde047]" />
          </div>
          <h1 className="text-3xl font-bold font-amiri text-[#fde047] mb-2 drop-shadow-md">
            {t('reciters.title')}
          </h1>
          <p className="text-sm text-[#a0c4b3]">
            {t('reciters.desc')}
          </p>
        </div>
      </div>


      <div className="relative">
        <input
          type="text"
          placeholder={t('reciters.search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/60 dark:bg-[#063023]/60 backdrop-blur-md border border-[#d4af37]/30 rounded-2xl py-3 px-12 text-slate-800 dark:text-white outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-[#d4af37]" size={40} />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQaris.map(qari => {
            const isDownloaded = downloadedReciters.includes(qari.identifier);
            const isDownloading = downloadProgress[qari.identifier] !== undefined;
            const progress = downloadProgress[qari.identifier] || 0;
            const isActive = qariId === qari.identifier;
            
            return (
              <div 
                key={qari.identifier}
                className={`relative overflow-hidden rounded-2xl p-4 transition-all ${
                  isActive ? 'border border-[#d4af37] bg-gradient-to-r from-[#0a402e] to-[#04241a] shadow-[0_10px_20px_rgba(0,0,0,0.3)] scale-[1.02]' : 'glass-panel hover:bg-white/60 dark:hover:bg-[#063023]/60'
                }`}
              >
                {/* Downloading Progress Bar Background */}
                {isDownloading && (
                  <div 
                    className="absolute top-0 left-0 bottom-0 bg-[#d4af37]/20 transition-all duration-300 ease-out" 
                    style={{ width: `${progress}%`, right: i18n.dir() === 'rtl' ? 0 : 'auto', left: i18n.dir() === 'rtl' ? 'auto' : 0 }} 
                  />
                )}
                
                <div className="relative z-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  
                  <div className="flex items-center gap-4 cursor-pointer flex-1" onClick={() => setQariId(qari.identifier)}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-inner ${
                      isActive ? 'bg-[#d4af37] text-white' : 'bg-slate-100 dark:bg-[#0a402e] text-[#ca8a04] dark:text-[#d4af37]'
                    }`}>
                      <Headphones size={24} />
                    </div>
                    <div>
                      <h3 className={`font-bold font-amiri text-lg ${isActive ? 'text-white' : 'text-slate-800 dark:text-white'}`}>{qari.name}</h3>
                      <p className={`text-xs ${isActive ? 'text-[#a0c4b3]' : 'text-slate-500 dark:text-slate-400'}`}>{qari.englishName}</p>
                      {isActive && <p className="text-xs font-bold text-[#d4af37] mt-1">{t('reciters.active')}</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end mt-2 sm:mt-0">
                    {isDownloading ? (
                      <div className="flex items-center gap-2 text-[#d4af37] bg-[#d4af37]/10 px-3 py-1.5 rounded-full text-sm font-medium">
                        <Loader2 className="animate-spin" size={16} />
                        <span>{progress}%</span>
                      </div>
                    ) : isDownloaded ? (
                      <button 
                        onClick={() => removeDownloadedReciter(qari.identifier)}
                        className="flex items-center gap-1.5 text-rose-500 bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
                      >
                        <Trash2 size={16} />
                        <span className="hidden sm:inline">{t('reciters.remove')}</span>
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleDownload(qari.identifier)}
                        className="flex items-center gap-1.5 text-[#ca8a04] dark:text-[#d4af37] bg-[#ca8a04]/10 dark:bg-[#d4af37]/10 hover:bg-[#ca8a04]/20 px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
                      >
                        <Download size={16} />
                        <span className="hidden sm:inline">{t('reciters.download')}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
