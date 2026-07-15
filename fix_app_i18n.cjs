const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  "import { useAutoTheme } from './hooks/useAutoTheme';",
  "import { useAutoTheme } from './hooks/useAutoTheme';\nimport { useTranslation } from 'react-i18next';"
);

code = code.replace(
  "  const autoThemeState = useAutoTheme();",
  "  const autoThemeState = useAutoTheme();\n  const { i18n } = useTranslation();\n\n  useEffect(() => {\n    document.documentElement.dir = i18n.dir();\n    document.documentElement.lang = i18n.language;\n    \n    // Remove old font classes\n    document.documentElement.classList.remove('font-cairo', 'font-inter', 'font-urdu');\n    \n    // Add new font class based on language\n    if (i18n.language === 'ar') {\n      document.documentElement.classList.add('font-cairo');\n    } else if (i18n.language === 'ur') {\n      document.documentElement.classList.add('font-urdu');\n    } else {\n      document.documentElement.classList.add('font-inter');\n    }\n  }, [i18n.language]);"
);

fs.writeFileSync('src/App.tsx', code);
