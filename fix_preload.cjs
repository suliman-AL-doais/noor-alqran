const fs = require('fs');
let code = fs.readFileSync('src/screens/Quran/SurahReader.tsx', 'utf8');
code = code.replace(
  'const currentAudioSrc = surah?.ayahs.find(a => a.numberInSurah === activeAyah)?.audio;',
  `const currentAudioSrc = surah?.ayahs.find(a => a.numberInSurah === activeAyah)?.audio;
  const nextAudioSrc = surah?.ayahs.find(a => a.numberInSurah === activeAyah + 1)?.audio;

  useEffect(() => {
    if (nextAudioSrc) {
      const audio = new Audio(nextAudioSrc);
      audio.preload = 'auto';
    }
  }, [nextAudioSrc]);`
);
fs.writeFileSync('src/screens/Quran/SurahReader.tsx', code);
