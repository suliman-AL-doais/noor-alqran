const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  "document.documentElement.lang = i18n.language;",
  "const currentLang = i18n.resolvedLanguage || i18n.language;\n    document.documentElement.lang = currentLang;"
);

code = code.replace(
  "if (i18n.language === 'ar') {",
  "if (currentLang.startsWith('ar')) {"
);

code = code.replace(
  "} else if (i18n.language === 'ur') {",
  "} else if (currentLang.startsWith('ur')) {"
);

code = code.replace(
  "}, [i18n.language]);",
  "}, [i18n.language, i18n.resolvedLanguage]);"
);

fs.writeFileSync('src/App.tsx', code);
