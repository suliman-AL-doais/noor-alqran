const fs = require('fs');
let code = fs.readFileSync('src/screens/Settings.tsx', 'utf8');

// Ensure useTranslation is imported
if (!code.includes('useTranslation')) {
  code = code.replace(
    "import { useState, useEffect } from 'react';",
    "import { useState, useEffect } from 'react';\nimport { useTranslation } from 'react-i18next';"
  );
}

// Ensure useTranslation hook is used
if (!code.includes('const { t, i18n } = useTranslation();')) {
  code = code.replace(
    "export default function Settings() {",
    "export default function Settings() {\n  const { t, i18n } = useTranslation();\n\n  const languages = [\n    { code: 'ar', name: 'العربية', flag: '🇸🇦' },\n    { code: 'en', name: 'English', flag: '🇬🇧' },\n    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },\n    { code: 'fr', name: 'Français', flag: '🇫🇷' },\n    { code: 'id', name: 'Indonesia', flag: '🇮🇩' },\n    { code: 'ur', name: 'اردو', flag: '🇵🇰' },\n    { code: 'es', name: 'Español', flag: '🇪🇸' },\n  ];"
  );
}

const languageSection = `
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-primary-600 dark:text-primary-400">{t('settings.language')}</h2>
        
        <div className="glass rounded-2xl p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => i18n.changeLanguage(lang.code)}
                className={\`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all \${
                  i18n.language === lang.code
                    ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                    : 'border-transparent bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                }\`}
              >
                <span className="text-2xl leading-none">{lang.flag}</span>
                <span className="font-semibold text-sm">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
`;

if (!code.includes('t(\'settings.language\')')) {
  code = code.replace(
    '<section className="space-y-4">\n        <h2 className="text-lg font-bold text-primary-600 dark:text-primary-400">إعدادات القارئ والتلاوة</h2>',
    languageSection + '\n      <section className="space-y-4">\n        <h2 className="text-lg font-bold text-primary-600 dark:text-primary-400">إعدادات القارئ والتلاوة</h2>'
  );
}

// Translations replacements
code = code.replace(
  '<h1 className="text-3xl font-bold text-slate-800 dark:text-white">الإعدادات</h1>',
  '<h1 className="text-3xl font-bold text-slate-800 dark:text-white">{t("settings.title")}</h1>'
);
code = code.replace(
  '<h2 className="text-lg font-bold text-primary-600 dark:text-primary-400">المظهر</h2>',
  '<h2 className="text-lg font-bold text-primary-600 dark:text-primary-400">{t("settings.appearance")}</h2>'
);

code = code.replace(
  "{ id: 'light', icon: Sun, label: 'فاتح' },",
  "{ id: 'light', icon: Sun, label: t('settings.theme.light') },"
);
code = code.replace(
  "{ id: 'dark', icon: Moon, label: 'داكن' },",
  "{ id: 'dark', icon: Moon, label: t('settings.theme.dark') },"
);
code = code.replace(
  "{ id: 'system', icon: Monitor, label: 'النظام' },",
  "{ id: 'system', icon: Monitor, label: t('settings.theme.system') },"
);
code = code.replace(
  "{ id: 'auto', icon: Sunset, label: 'تلقائي' },",
  "{ id: 'auto', icon: Sunset, label: t('settings.theme.auto') },"
);


fs.writeFileSync('src/screens/Settings.tsx', code);
