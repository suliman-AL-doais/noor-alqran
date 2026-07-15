const fs = require('fs');
let code = fs.readFileSync('src/screens/Home.tsx', 'utf8');

code = code.replace(
  "{ title: t('features.eveningAzkar.title'), icon: Moon, path: '/azkar', desc: t('features.eveningAzkar.desc') }",
  "{ title: t('features.eveningAzkar.title'), icon: Moon, path: '/azkar?category=' + encodeURIComponent('أذكار-المساء'), desc: t('features.eveningAzkar.desc') }"
);

code = code.replace(
  "{ title: t('features.morningAzkar.title'), icon: Sun, path: '/azkar', desc: t('features.morningAzkar.desc') }",
  "{ title: t('features.morningAzkar.title'), icon: Sun, path: '/azkar?category=' + encodeURIComponent('أذكار-الصباح'), desc: t('features.morningAzkar.desc') }"
);

fs.writeFileSync('src/screens/Home.tsx', code);
