const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

code = code.replace(
  "import { useStore } from '../store/useStore';",
  "import { useStore } from '../store/useStore';\nimport { useTranslation } from 'react-i18next';"
);

code = code.replace(
  /const navItems = \[\s*\{ to: '\/hadith', icon: ScrollText, label: 'الحديث' \},\s*\{ to: '\/', icon: Home, label: 'الرئيسية' \},\s*\{ to: '\/quran', icon: BookOpenText, label: 'القرآن' \},\s*\{ to: '\/azkar', icon: HandHeart, label: 'الأذكار' \},\s*\{ to: '\/tasbeeh', icon: Disc3, label: 'السبحة' \},\s*\{ to: '\/settings', icon: Settings, label: 'الإعدادات' \},\s*\];/g,
  ""
);

code = code.replace(
  "export default function Layout() {",
  "export default function Layout() {\n  const { t } = useTranslation();\n\n  const navItems = [\n    { to: '/hadith', icon: ScrollText, label: t('nav.hadith') },\n    { to: '/', icon: Home, label: t('nav.home') },\n    { to: '/quran', icon: BookOpenText, label: t('nav.quran') },\n    { to: '/azkar', icon: HandHeart, label: t('nav.azkar') },\n    { to: '/tasbeeh', icon: Disc3, label: t('nav.tasbeeh') },\n    { to: '/settings', icon: Settings, label: t('nav.settings') },\n  ];"
);

code = code.replace(
  /"absolute bottom-1.5 text-\[11px\] font-bold font-cairo/g,
  '"absolute bottom-1.5 text-[11px] font-bold'
);

fs.writeFileSync('src/components/Layout.tsx', code);
