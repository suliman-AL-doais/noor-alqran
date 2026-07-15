const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

code = code.replace(
  "import { BookOpenText, Settings, HandHeart, Home } from 'lucide-react';",
  "import { BookOpenText, Settings, HandHeart, Home, ScrollText } from 'lucide-react';"
);

code = code.replace(
  "const navItems = [",
  "const navItems = [\n  { to: '/hadith', icon: ScrollText, label: 'الحديث' },"
);

// Note: putting 'الحديث' at the beginning so it shows up. Let's make sure it doesn't break styling with 6 items.
// wait, 6 items in the nav bar might be crowded on mobile. Let's see.

fs.writeFileSync('src/components/Layout.tsx', code);
