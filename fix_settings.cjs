const fs = require('fs');
let code = fs.readFileSync('src/screens/Settings.tsx', 'utf8');

// The language section was missing, let's add it right after the header
const langSection = `
      {/* Settings Sections */}
      <div className="space-y-4">
        {/* Language Item */}
        <button
          onClick={() => setShowLanguages(true)}
          className="w-full flex items-center justify-between p-4 glass rounded-2xl hover:bg-white/40 dark:hover:bg-slate-800/40 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl">
              <Type size={24} />
            </div>
            <div className="text-right">
              <h2 className="font-bold text-slate-800 dark:text-white">{t('settings.language')}</h2>
              <p className="text-sm text-slate-500">{languages.find(l => (i18n.resolvedLanguage || i18n.language).startsWith(l.code))?.name || 'العربية'}</p>
            </div>
          </div>
          <div className="text-slate-400 rotate-180">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </button>
`;

code = code.replace(
  '<section className="space-y-4">',
  langSection + '\n      <section className="space-y-4">'
);

if (!code.includes('const [showLanguages, setShowLanguages] = useState(false);')) {
  code = code.replace(
    'const [loadingQaris, setLoadingQaris] = useState(true);',
    'const [loadingQaris, setLoadingQaris] = useState(true);\n  const [showLanguages, setShowLanguages] = useState(false);'
  );
}

// Ensure the Globe icon is imported if needed, actually we used Type but let's import Globe
code = code.replace(
  'import { Moon, Sun, Monitor, Type, Vibrate, VibrateOff, PlayCircle, Bell, BellOff, Clock, Sunset } from \'lucide-react\';',
  'import { Moon, Sun, Monitor, Type, Vibrate, VibrateOff, PlayCircle, Bell, BellOff, Clock, Sunset, Globe, ArrowLeft, ArrowRight } from \'lucide-react\';'
);

code = code.replace(
  '<Type size={24} />',
  '<Globe size={24} />'
);

const renderLogic = `
  if (showLanguages) {
    const isRtl = i18n.dir() === 'rtl';
    return (
      <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-300 pb-10">
        <header className="flex items-center gap-4">
          <button 
            onClick={() => setShowLanguages(false)}
            className="p-2 glass rounded-full hover:bg-white/40 dark:hover:bg-slate-800/40 transition-colors"
          >
            {isRtl ? <ArrowRight size={24} /> : <ArrowLeft size={24} />}
          </button>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{t('settings.language')}</h1>
        </header>

        <div className="glass rounded-3xl p-2 overflow-hidden">
          {languages.map((lang, idx) => {
            const isActive = (i18n.resolvedLanguage || i18n.language).startsWith(lang.code);
            return (
              <button
                key={lang.code}
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                }}
                className={\`w-full flex items-center justify-between p-4 rounded-2xl transition-all \${isActive ? 'bg-primary-500/10 dark:bg-primary-500/20 text-primary-700 dark:text-primary-400' : 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'}\`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl leading-none">{lang.flag}</span>
                  <span className="font-bold text-lg">{lang.name}</span>
                </div>
                {isActive && (
                  <div className="w-3 h-3 rounded-full bg-primary-500" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    );
  }

  return (
`;

code = code.replace(
  'return (\n    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">',
  renderLogic + '    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">'
);

// fix "الإعدادات" to use translation
code = code.replace(
  '<h1 className="text-2xl font-bold text-slate-800 dark:text-white">الإعدادات</h1>',
  '<h1 className="text-2xl font-bold text-slate-800 dark:text-white">{t("settings.title")}</h1>'
);

// also close the <div> that we opened for Settings Sections
code = code.replace(
  '</section>\n    </div>\n  );\n}',
  '</section>\n      </div>\n    </div>\n  );\n}'
);

fs.writeFileSync('src/screens/Settings.tsx', code);
