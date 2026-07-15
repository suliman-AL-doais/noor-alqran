const fs = require('fs');
let code = fs.readFileSync('src/screens/Home.tsx', 'utf8');

// Add import
if (!code.includes('useTranslation')) {
  code = code.replace(
    "import { Link } from 'react-router-dom';",
    "import { Link } from 'react-router-dom';\nimport { useTranslation } from 'react-i18next';"
  );
}

// remove static features and put it inside the component
code = code.replace(
  /const features = \[[\s\S]*?\];/,
  ""
);

code = code.replace(
  "export default function Home() {",
  `export default function Home() {\n  const { t } = useTranslation();\n\n  const features = [\n    { title: t('features.eveningAzkar.title'), icon: Moon, path: '/azkar', desc: t('features.eveningAzkar.desc') },\n    { title: t('features.morningAzkar.title'), icon: Sun, path: '/azkar', desc: t('features.morningAzkar.desc') },\n    { title: t('features.quran.title'), icon: BookOpen, path: '/quran', desc: t('features.quran.desc') },\n    { title: t('features.azkar.title'), icon: Heart, path: '/azkar', desc: t('features.azkar.desc') },\n    { title: t('features.khatma.title'), icon: Star, path: '/khatma', desc: t('features.khatma.desc') },\n    { title: t('features.prayer.title'), icon: Clock, path: '/prayer', desc: t('features.prayer.desc') },\n    { title: t('features.tasbeeh.title'), icon: Grid, path: '/tasbeeh', desc: t('features.tasbeeh.desc') },\n    { title: t('features.dua.title'), icon: HandHeart, path: '/azkar', desc: t('features.dua.desc') },\n  ];`
);

// Translating text inside JSX
code = code.replace(
  ">نُورُ القُرْآنِ<",
  ">{t('home.title')}<"
);
code = code.replace(
  ">          نُورُ القُرْآنِ        <",
  ">{t('home.title')}<"
);
code = code.replace(
  ">السلام عليكم<",
  ">{t('home.greeting')}<"
);
code = code.replace(
  ">مرحباً بك في تطبيق قرآن واذكار<",
  ">{t('home.welcome')}<"
);
code = code.replace(
  ">آخر قراءة<",
  ">{t('home.lastRead')}<"
);
code = code.replace(
  ">سورة الكهف<",
  ">{t('home.surahAlKahf')}<"
);
code = code.replace(
  ">الآية 10 • الجزء 15<",
  ">{t('home.ayah10')}<"
);
code = code.replace(
  ">متابعة القراءة<",
  ">{t('home.continueReading')}<"
);
code = code.replace(
  ">الخدمات<",
  ">{t('home.services')}<"
);
code = code.replace(
  /font-cairo/g,
  ""
); // remove font-cairo so the auto font from App.tsx applies.

fs.writeFileSync('src/screens/Home.tsx', code);
