const fs = require('fs');
let code = fs.readFileSync('src/screens/Azkar.tsx', 'utf8');
code = code.replace('function ZikrCard({ zikr, globalCount }: { zikr: Zikr; globalCount: number }) {', 'const ZikrCard = ({ zikr, globalCount }: { zikr: Zikr; globalCount: number }) => {');
fs.writeFileSync('src/screens/Azkar.tsx', code);
