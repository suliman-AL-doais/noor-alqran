const fs = require('fs');
let readerCode = fs.readFileSync('src/screens/Quran/SurahReader.tsx', 'utf8');

readerCode = readerCode.replace(
  "import { useParams, Link, useNavigate } from 'react-router-dom';",
  "import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';"
);

readerCode = readerCode.replace(
  "  const { id } = useParams();\n  const navigate = useNavigate();",
  "  const { id } = useParams();\n  const navigate = useNavigate();\n  const location = useLocation();"
);

readerCode = readerCode.replace(
  "        const parsedId = parseInt(id || '1');\n        if (useStore.getState().lastRead?.surah === parsedId) {\n          setActiveAyah(useStore.getState().lastRead!.ayah);\n        } else {\n          setActiveAyah(data.data.ayahs[0].numberInSurah);\n        }",
  `        const parsedId = parseInt(id || '1');
        const queryParams = new URLSearchParams(location.search);
        const targetAyah = queryParams.get('ayah');
        if (targetAyah) {
          setActiveAyah(parseInt(targetAyah));
        } else if (useStore.getState().lastRead?.surah === parsedId) {
          setActiveAyah(useStore.getState().lastRead!.ayah);
        } else {
          setActiveAyah(data.data.ayahs[0].numberInSurah);
        }`
);

fs.writeFileSync('src/screens/Quran/SurahReader.tsx', readerCode);

let listCode = fs.readFileSync('src/screens/Quran/SurahList.tsx', 'utf8');
listCode = listCode.replace(
  /to={`\/quran\/\${bookmark\.surah}`}/g,
  "to={`/quran/${bookmark.surah}?ayah=${bookmark.ayah}`}"
);
fs.writeFileSync('src/screens/Quran/SurahList.tsx', listCode);
