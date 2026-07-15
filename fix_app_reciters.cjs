const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('import Reciters')) {
  code = code.replace(
    "import Settings from './screens/Settings';",
    "import Settings from './screens/Settings';\nimport Reciters from './screens/Reciters';"
  );
  
  code = code.replace(
    '<Route path="settings" element={<Settings />} />',
    '<Route path="settings" element={<Settings />} />\n          <Route path="reciters" element={<Reciters />} />'
  );
  
  fs.writeFileSync('src/App.tsx', code);
}
