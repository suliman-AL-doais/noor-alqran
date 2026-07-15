const fs = require('fs');
let code = fs.readFileSync('src/screens/Quran/SurahList.tsx', 'utf8');

code = code.replace(
  "const { lastRead, completedSurahs, toggleSurahCompleted } = useStore();",
  "const { lastRead, completedSurahs, toggleSurahCompleted, bookmarkedAyahs, toggleAyahBookmark } = useStore();"
);

code = code.replace(
  "import { Search, Bookmark, CheckCircle } from 'lucide-react';",
  "import { Search, Bookmark, CheckCircle, Trash2, ArrowLeft } from 'lucide-react';"
);

const bookmarksSection = `        {/* Bookmarks Section */}
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
                    to={\`/quran/\${bookmark.surah}\`}
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
`;

code = code.replace(
  /<div className="relative">\s*<input/g,
  bookmarksSection + '\n        <div className="relative">\n          <input'
);

fs.writeFileSync('src/screens/Quran/SurahList.tsx', code);
