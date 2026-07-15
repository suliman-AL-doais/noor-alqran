const fs = require('fs');
let code = fs.readFileSync('src/screens/Prayer.tsx', 'utf8');
code = code.replace(
  '<svg className="absolute inset-0 w-full h-full transform -rotate-90">',
  '<svg viewBox="0 0 192 192" className="absolute inset-0 w-full h-full transform -rotate-90">'
);
fs.writeFileSync('src/screens/Prayer.tsx', code);
