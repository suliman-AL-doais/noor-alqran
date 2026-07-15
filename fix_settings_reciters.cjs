const fs = require('fs');
let code = fs.readFileSync('src/screens/Settings.tsx', 'utf8');

// Replace the whole section with a Link to /reciters
code = code.replace(
  /<h2 className="text-lg font-bold text-primary-600 dark:text-primary-400">الصوت والتلاوة<\/h2>[\s\S]*?<\/section>/,
  `<h2 className="text-lg font-bold text-primary-600 dark:text-primary-400">{t('settings.audio')}</h2>
        <Link to="/reciters" className="block w-full">
          <div className="glass rounded-2xl p-4 flex items-center justify-between hover:bg-white/40 dark:hover:bg-slate-800/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl">
                <PlayCircle size={24} />
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-800 dark:text-white">{t('reciters.title')}</p>
                <p className="text-sm text-slate-500">{t('reciters.desc')}</p>
              </div>
            </div>
            <div className="text-slate-400">
              {i18n.dir() === 'rtl' ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
            </div>
          </div>
        </Link>
      </section>`
);

if (code.includes('<h2 className="text-lg font-bold text-primary-600 dark:text-primary-400">عام</h2>')) {
  code = code.replace(
    '<h2 className="text-lg font-bold text-primary-600 dark:text-primary-400">عام</h2>',
    '<h2 className="text-lg font-bold text-primary-600 dark:text-primary-400">{t("settings.general")}</h2>'
  );
}
if (code.includes('الاهتزاز (Haptic Feedback)')) {
  code = code.replace(
    'الاهتزاز (Haptic Feedback)',
    '{t("settings.haptic")}'
  );
  code = code.replace(
    'تفعيل أو تعطيل الاهتزاز عند التفاعل مع التطبيق',
    '{t("settings.haptic_desc")}'
  );
}

// Make sure Link is imported
if (!code.includes("import { Link } from 'react-router-dom';")) {
  code = code.replace(
    "import { useTranslation } from 'react-i18next';",
    "import { useTranslation } from 'react-i18next';\nimport { Link } from 'react-router-dom';"
  );
}

fs.writeFileSync('src/screens/Settings.tsx', code);
