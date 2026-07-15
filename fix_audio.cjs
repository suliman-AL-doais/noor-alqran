const fs = require('fs');
let code = fs.readFileSync('src/screens/Quran/SurahReader.tsx', 'utf8');
code = code.replace(
`      audioRef.current.play().catch(e => {
        if (e.name !== 'AbortError') { console.log('Playback prevented:', e); setIsPlaying(false); }
        setIsPlaying(false);
      });`,
`      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          if (e.name !== 'AbortError') {
            console.log('Playback prevented:', e);
            setIsPlaying(false);
          }
        });
      }`
);
fs.writeFileSync('src/screens/Quran/SurahReader.tsx', code);
