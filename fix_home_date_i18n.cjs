const fs = require('fs');
let code = fs.readFileSync('src/screens/Home.tsx', 'utf8');

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
  "setHijriDate(new Intl.DateTimeFormat('ar-SA-u-ca-islamic', options).format(date));",
  "setHijriDate(new Intl.DateTimeFormat(currentLang.startsWith('ar') ? 'ar-SA-u-ca-islamic' : 'en-US-u-ca-islamic', options).format(date));"
);

code = code.replace(
  "setGregorianDate(new Intl.DateTimeFormat('ar-SA', options).format(date));",
  "setGregorianDate(new Intl.DateTimeFormat(currentLang.startsWith('ar') ? 'ar-EG' : 'en-US', options).format(date));"
);

code = code.replace(
  'fetchLocation();\n    }\n  }, []);',
  'fetchLocation();\n    }\n  }, [i18n.language, i18n.resolvedLanguage]);'
);

fs.writeFileSync('src/screens/Home.tsx', code);
