const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  "import QuranLayout from './screens/Quran/QuranLayout';",
  "import QuranLayout from './screens/Quran/QuranLayout';\nimport HadithLayout from './screens/Hadith/HadithLayout';\nimport HadithList from './screens/Hadith/HadithList';\nimport HadithReader from './screens/Hadith/HadithReader';"
);

code = code.replace(
  `          <Route path="azkar" element={<Azkar />} />`,
  `          <Route path="azkar" element={<Azkar />} />
          <Route path="hadith" element={<HadithLayout />}>
            <Route index element={<HadithList />} />
            <Route path=":id" element={<HadithReader />} />
          </Route>`
);

fs.writeFileSync('src/App.tsx', code);
