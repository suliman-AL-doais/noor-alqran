const fs = require('fs');
let code = fs.readFileSync('src/screens/Azkar.tsx', 'utf8');
code = code.replace('{/* @ts-ignore */}\\n', '');
code = code.replace('{/* @ts-ignore */}\n            ', '');
fs.writeFileSync('src/screens/Azkar.tsx', code);
