const fs = require('fs');
let code = fs.readFileSync('src/screens/Quran/SurahReader.tsx', 'utf8');

code = code.replace(
  'const { quranFontSize, quranFontFamily, qariId, lastRead, setLastRead, completedSurahs, toggleSurahCompleted } = useStore();',
  'const { quranFontSize, quranFontFamily, qariId, lastRead, setLastRead, completedSurahs, toggleSurahCompleted, bookmarkedAyahs, toggleAyahBookmark } = useStore();'
);

code = code.replace(
  "import { ArrowRight, Play, Pause, Settings2, SkipForward, SkipBack, Maximize, Minimize, CheckCircle } from 'lucide-react';",
  "import { ArrowRight, Play, Pause, Settings2, SkipForward, SkipBack, Maximize, Minimize, CheckCircle, Bookmark } from 'lucide-react';"
);

const footerReplacement = `              <div className="flex-1 px-3 truncate">
                <p className="text-sm font-bold text-slate-800 dark:text-white font-amiri truncate">{surah.name}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-slate-500">الآية {activeAyah}</p>
                  <button 
                    onClick={() => {
                      const ayahText = surah.ayahs.find(a => a.numberInSurah === activeAyah)?.text || '';
                      toggleAyahBookmark({ surah: surah.number, surahName: surah.name, ayah: activeAyah, text: ayahText });
                    }}
                    className={\`p-1 rounded-full transition-colors \${bookmarkedAyahs?.find(b => b.surah === surah.number && b.ayah === activeAyah) ? 'text-primary-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}\`}
                  >
                    <Bookmark size={14} fill={bookmarkedAyahs?.find(b => b.surah === surah.number && b.ayah === activeAyah) ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>`;

code = code.replace(
  /<div className="flex-1 px-3 truncate">[\s\S]*?<p className="text-xs text-slate-500">الآية \{activeAyah\}<\/p>\s*<\/div>/,
  footerReplacement
);

fs.writeFileSync('src/screens/Quran/SurahReader.tsx', code);
