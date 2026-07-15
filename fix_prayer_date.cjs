const fs = require('fs');
let code = fs.readFileSync('src/screens/Prayer.tsx', 'utf8');

// Ensure the Gregorian date uses standard numerals and localized names via moment if preferred,
// but Intl is actually better for offline since it's native. Let's make sure it's formatting nicely.
code = code.replace(
  "setGregorianDate(new Intl.DateTimeFormat('ar-SA', { day: 'numeric', month: 'long', year: 'numeric' }).format(date));",
  "setGregorianDate(new Intl.DateTimeFormat(i18n.language === 'ar' ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' }).format(date));"
);

code = code.replace(
  "setHijriDate(new Intl.DateTimeFormat('ar-SA-u-ca-islamic', { day: 'numeric', month: 'long', year: 'numeric' }).format(date));",
  "setHijriDate(new Intl.DateTimeFormat(i18n.language === 'ar' ? 'ar-SA-u-ca-islamic' : 'en-US-u-ca-islamic', { day: 'numeric', month: 'long', year: 'numeric' }).format(date));"
);

// We need to add i18n to useEffect dependency if we use it, 
// let's just make it use i18n.language
if (code.includes('const { t } = useTranslation();')) {
  code = code.replace(
    'const { t } = useTranslation();',
    'const { t, i18n } = useTranslation();'
  );
}

code = code.replace(
  'useEffect(() => {',
  'useEffect(() => {\n    const currentLang = i18n.resolvedLanguage || i18n.language;'
);

code = code.replace(
  "i18n.language === 'ar' ? 'ar-EG' : 'en-US'",
  "currentLang.startsWith('ar') ? 'ar-EG' : 'en-US'"
);

code = code.replace(
  "i18n.language === 'ar' ? 'ar-SA-u-ca-islamic' : 'en-US-u-ca-islamic'",
  "currentLang.startsWith('ar') ? 'ar-SA-u-ca-islamic' : 'en-US-u-ca-islamic'"
);

fs.writeFileSync('src/screens/Prayer.tsx', code);
