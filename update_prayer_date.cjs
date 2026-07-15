const fs = require('fs');
let code = fs.readFileSync('src/screens/Prayer.tsx', 'utf8');

code = code.replace(
  "<p className=\"font-bold text-slate-800 dark:text-white text-sm\">{hijriDate}</p>\n              <p className=\"text-xs text-slate-500 dark:text-[#a0c4b3]\">{t('prayer.hijri_date')}</p>",
  "<p className=\"font-bold text-slate-800 dark:text-white text-sm\">{hijriDate}</p>\n              <p className=\"text-xs text-slate-500 dark:text-[#a0c4b3] font-medium\">{gregorianDate}</p>"
);

fs.writeFileSync('src/screens/Prayer.tsx', code);
