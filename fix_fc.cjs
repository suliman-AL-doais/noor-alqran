const fs = require('fs');
let code = fs.readFileSync('src/screens/Azkar.tsx', 'utf8');
code = code.replace(
  'import React from "react";\nconst ZikrCard = ({ zikr, globalCount }: { zikr: Zikr; globalCount: number; key?: string | number }) => {',
  'const ZikrCard = ({ zikr, globalCount }: { zikr: Zikr; globalCount: number; key?: string | number }) => {'
);
fs.writeFileSync('src/screens/Azkar.tsx', code);
