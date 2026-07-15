const fs = require('fs');
let code = fs.readFileSync('src/screens/Home.tsx', 'utf8');

code = code.replace(
  "import { BookOpen, Heart, Clock, Compass, Grid, Star, PlayCircle, Bell, Search, Moon, Sun, HandHeart, Calendar } from 'lucide-react';",
  "import { BookOpen, Heart, Clock, Compass, Grid, Star, PlayCircle, Bell, Search, Moon, Sun, HandHeart, Calendar, ScrollText } from 'lucide-react';"
);

code = code.replace(
  "{ title: t('features.azkar.title'), icon: Heart, path: '/azkar', desc: t('features.azkar.desc') },",
  "{ title: t('features.hadith.title'), icon: ScrollText, path: '/hadith', desc: t('features.hadith.desc') },"
);

fs.writeFileSync('src/screens/Home.tsx', code);
