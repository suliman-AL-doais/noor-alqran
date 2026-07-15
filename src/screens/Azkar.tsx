import { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Copy, Heart, CheckCircle2, RotateCcw, Search, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import azkarData from '../data/azkar.json';

interface Zikr {
  id: string;
  text: string;
  title: string;
  count: number;
  source: string;
}

interface Category {
  id: string;
  title: string;
  azkar: Zikr[];
}

const ZikrCard = ({ zikr, globalCount }: { zikr: Zikr; globalCount: number; key?: string | number }) => {
  const [count, setCount] = useState(zikr.count);
  const { quranFontFamily, quranFontSize, favoriteAzkar, toggleFavoriteZikr, completedAzkar, toggleCompletedZikr } = useStore();

  const isFavorite = favoriteAzkar.includes(zikr.id);
  const isCompleted = completedAzkar.includes(zikr.id) || count === 0;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ text: zikr.text });
      } else {
        await navigator.clipboard.writeText(zikr.text);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(zikr.text);
  };

  const handleRepeat = () => {
    if (count > 0) {
      setCount(c => c - 1);
      if (count - 1 === 0 && !completedAzkar.includes(zikr.id)) {
        toggleCompletedZikr(zikr.id);
      }
    }
  };
  
  const handleReset = () => {
    setCount(zikr.count);
    if (completedAzkar.includes(zikr.id)) {
      toggleCompletedZikr(zikr.id);
    }
  };

  return (
    <div className={`glass p-5 rounded-2xl space-y-4 transition-all duration-500 relative ${isCompleted ? 'opacity-70 bg-slate-50/50 dark:bg-slate-900/50 border-primary-500/30' : 'opacity-100'}`}>
      
      {/* Header Actions */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {zikr.title && zikr.title !== zikr.source && (
            <p className="text-sm font-bold text-primary-600 dark:text-primary-400 mb-1">{zikr.title}</p>
          )}
          {zikr.source && (
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-800 inline-block px-2 py-1 rounded-md">
              {zikr.source}
            </p>
          )}
        </div>
        <div className="flex gap-1" dir="ltr">
          <button onClick={() => toggleFavoriteZikr(zikr.id)} className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/30' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
            <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          <button onClick={handleCopy} className="p-2 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Copy size={18} />
          </button>
        </div>
      </div>

      <p 
        className="leading-[2.2] text-slate-800 dark:text-slate-100 text-center pb-2"
        style={{ 
          fontSize: `${Math.max(16, quranFontSize - 4)}px`, 
          fontFamily: quranFontFamily === 'Amiri Quran' ? '"Amiri Quran", serif' : quranFontFamily === 'Scheherazade New' ? '"Scheherazade New", serif' : quranFontFamily === 'Amiri' ? 'Amiri, serif' : 'sans-serif' 
        }}
      >
        {zikr.text}
      </p>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
        <button 
          onClick={handleShare}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 rounded-lg font-bold transition-all"
        >
          <span>مشاركة</span>
          <Share2 size={14} />
        </button>
        
        <div className="flex items-center gap-2">
           {isCompleted && (
              <button onClick={handleReset} className="p-2 text-slate-400 hover:text-primary-500 transition-colors" title="إعادة">
                <RotateCcw size={18} />
              </button>
           )}
          <button 
            onClick={handleRepeat}
            disabled={isCompleted}
            className={`flex items-center gap-3 px-5 py-2 rounded-xl font-bold transition-all ${
              !isCompleted 
                ? 'bg-primary-500 text-white hover:bg-primary-600 ring-1 ring-gold-500/50 dark:bg-primary-900/50 dark:text-primary-300 dark:hover:bg-primary-900/70 shadow-sm' 
                : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500 cursor-default'
            }`}
          >
            {isCompleted ? (
              <>
                <span>تمت القراءة</span>
                <CheckCircle2 size={18} className="text-primary-500 dark:text-primary-400" />
              </>
            ) : (
              <>
                <span>التكرار</span>
                <span className="flex items-center justify-center w-6 h-6 rounded-full text-sm font-bold bg-white/20 dark:bg-slate-800 text-white dark:text-primary-400">
                  {count}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Azkar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setSelectedCategoryId(category);
    }
  }, [location.search]);

  // When closing the category, we should also clear the URL param so it doesn't reopen if they navigate back
  const handleCloseCategory = () => {
    setSelectedCategoryId(null);
    navigate('/azkar', { replace: true });
  };

  const [search, setSearch] = useState('');
  
  const categories = azkarData as Category[];
  
  const selectedCategory = useMemo(() => 
    categories.find(c => c.id === selectedCategoryId),
  [categories, selectedCategoryId]);

  const filteredCategories = useMemo(() => {
    if (!search) return categories;
    return categories.filter(c => c.title.includes(search));
  }, [categories, search]);

  if (selectedCategory) {
    return (
      <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6 animate-in slide-in-from-right-4 duration-300">
        <header className="glass-panel px-4 py-3 flex items-center gap-4 rounded-3xl sticky top-4 z-10 mb-6 shadow-sm">
          <button 
            onClick={handleCloseCategory}
            className="p-2 rounded-full hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <ArrowRight size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-slate-800 dark:text-white font-amiri">
              {selectedCategory.title}
            </h1>
            <p className="text-xs text-slate-500">{selectedCategory.azkar.length} ذكر</p>
          </div>
        </header>

        <div className="space-y-4 pb-20">
          {selectedCategory.azkar.map((zikr) => (
            <ZikrCard 
              key={zikr.id}
              zikr={zikr} 
              globalCount={zikr.count}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
           <h1 className="text-3xl font-bold text-primary-700 dark:text-primary-400 font-amiri">حصن المسلم</h1>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="ابحث عن قسم (مثال: أذكار الصباح)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full glass-panel py-4 px-12 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow rounded-3xl"
          />
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-20">
        {filteredCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategoryId(cat.id)}
            className="glass p-4 rounded-2xl flex items-center justify-between text-right group hover:bg-slate-50/50 dark:hover:bg-slate-800/50"
          >
            <div className="flex-1 pl-2">
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary-600 transition-colors">{cat.title}</h2>
              <p className="text-xs text-slate-400 mt-1">{cat.azkar.length} أذكار</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/50 group-hover:text-primary-500 transition-colors">
              <ChevronLeft size={18} className="rtl:-scale-x-100" />
            </div>
          </button>
        ))}
        {filteredCategories.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            لا توجد أقسام مطابقة للبحث
          </div>
        )}
      </div>
    </div>
  );
}
