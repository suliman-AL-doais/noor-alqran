import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bookmark, Tag, BookOpen, Quote } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { hadithsData, hadithCategories } from '../../data/hadiths';

export default function HadithList() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { lastReadHadith, bookmarkedHadiths } = useStore();

  const filteredHadiths = hadithsData.filter((h) => {
    const matchesSearch = 
      h.title.includes(search) || 
      h.text.includes(search) || 
      h.narrator.includes(search) || 
      h.book.includes(search);
    
    const matchesCategory = selectedCategory ? h.category === selectedCategory : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold font-amiri text-primary-700 dark:text-primary-400">الأحاديث النبوية</h1>
          
          {lastReadHadith && (
            <Link to={`/hadith/${lastReadHadith}`} className="inline-flex items-center justify-center gap-2 bg-primary-500 text-white ring-1 ring-gold-500/50 dark:bg-primary-900/50 dark:text-primary-300 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors">
              <Bookmark size={18} />
              متابعة القراءة
            </Link>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="ابحث في الأحاديث، الرواة، أو الكتب..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full glass-panel py-4 px-12 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow rounded-3xl text-slate-800 dark:text-slate-100"
          />
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
        </div>


        {/* Hadith of the Day / Random */}
        {!search && !selectedCategory && (
          <div className="mb-6">
            <div className="glass-panel p-6 rounded-3xl relative overflow-hidden group hover:scale-[1.01] transition-transform">
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
              <div className="flex items-center gap-2 mb-4 text-primary-600 dark:text-primary-400">
                <Quote size={20} className="text-primary-500" />
                <h2 className="font-bold text-lg">حديث عشوائي</h2>
              </div>
              <Link to={`/hadith/${hadithsData[Math.floor(Math.random() * hadithsData.length)].id}`} className="block">
                <p className="text-slate-700 dark:text-slate-200 font-amiri leading-loose line-clamp-3 mb-4">
                  اضغط هنا لقراءة حديث عشوائي من السنة النبوية المطهرة.
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400">
                  قراءة الحديث
                  <BookOpen size={16} />
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Categories */}

        <div className="flex overflow-x-auto gap-2 pb-2 snap-x hide-scrollbar">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors snap-start ${
              selectedCategory === null 
                ? 'bg-primary-500 text-white shadow-md' 
                : 'glass hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            الكل
          </button>
          {hadithCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors snap-start ${
                selectedCategory === cat 
                  ? 'bg-primary-500 text-white shadow-md' 
                  : 'glass hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Bookmarked Section (if no search and no category selected) */}
      {!search && !selectedCategory && bookmarkedHadiths.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Bookmark size={22} className="text-primary-500" />
            الأحاديث المحفوظة
          </h2>
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
            {hadithsData.filter(h => bookmarkedHadiths.includes(h.id)).map(hadith => (
              <Link 
                key={hadith.id}
                to={`/hadith/${hadith.id}`}
                className="glass-panel p-5 rounded-3xl min-w-[280px] max-w-[280px] snap-start hover:scale-[1.02] transition-transform group"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold font-amiri text-lg text-primary-700 dark:text-primary-400 line-clamp-1">{hadith.title}</h3>
                  <Bookmark size={16} className="text-primary-500 fill-primary-500 flex-shrink-0" />
                </div>
                <p className="text-sm font-amiri text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-3">
                  {hadith.text}
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <BookOpen size={12} />
                  <span>{hadith.book}</span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Hadith List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-20">
        {filteredHadiths.map((hadith) => (
          <Link
            key={hadith.id}
            to={`/hadith/${hadith.id}`}
            className="glass p-5 rounded-3xl hover:bg-slate-50/50 dark:hover:bg-slate-800/50 active:scale-95 transition-all group flex flex-col h-full border border-white/20 dark:border-white/5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center flex-shrink-0">
                <Quote size={18} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg font-amiri text-slate-800 dark:text-slate-100 line-clamp-1">{hadith.title}</h3>
                <p className="text-xs text-primary-600/80 dark:text-primary-400/80 font-medium">عن {hadith.narrator}</p>
              </div>
              {bookmarkedHadiths.includes(hadith.id) && (
                <Bookmark size={18} className="text-primary-500 fill-primary-500" />
              )}
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-300 font-amiri leading-loose line-clamp-2 mb-4 flex-1">
              {hadith.text}
            </p>
            
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <BookOpen size={14} />
                <span className="truncate max-w-[120px]">{hadith.book}</span>
              </div>
              <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                <Tag size={12} />
                <span>{hadith.category}</span>
              </div>
            </div>
          </Link>
        ))}
        {filteredHadiths.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            لا توجد أحاديث مطابقة للبحث
          </div>
        )}
      </div>
    </div>
  );
}
