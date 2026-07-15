const fs = require('fs');
let code = fs.readFileSync('src/screens/Reciters.tsx', 'utf8');

const newHeader = `
      {/* Hero 3D Card */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#063023] to-[#021812] border border-[#d4af37]/30 p-8 text-white shadow-[0_20px_40px_rgba(0,0,0,0.3),inset_0_2px_10px_rgba(212,175,55,0.2)] mb-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 flex items-center justify-center mb-4 border border-[#d4af37]/40 shadow-inner">
            <Headphones size={32} className="text-[#fde047]" />
          </div>
          <h1 className="text-3xl font-bold font-amiri text-[#fde047] mb-2 drop-shadow-md">
            {t('reciters.title')}
          </h1>
          <p className="text-sm text-[#a0c4b3]">
            {t('reciters.desc')}
          </p>
        </div>
      </div>
`;

code = code.replace(
  /<header className="pt-2">[\s\S]*?<\/header>/,
  newHeader
);

// We need to change the glass panel class slightly to match the aesthetic.
code = code.replace(
  /className={`relative overflow-hidden glass-panel rounded-2xl p-4 transition-all \${/g,
  "className={`relative overflow-hidden rounded-2xl p-4 transition-all ${"
);

code = code.replace(
  "isActive ? 'border-2 border-[#d4af37] bg-[#d4af37]/10' : 'hover:bg-white/40 dark:hover:bg-[#063023]/40'",
  "isActive ? 'border border-[#d4af37] bg-gradient-to-r from-[#0a402e] to-[#04241a] shadow-[0_10px_20px_rgba(0,0,0,0.3)] scale-[1.02]' : 'glass-panel hover:bg-white/60 dark:hover:bg-[#063023]/60'"
);

// Active state text styling
code = code.replace(
  '<h3 className="font-bold text-slate-800 dark:text-white">{qari.name}</h3>',
  '<h3 className={`font-bold font-amiri text-lg ${isActive ? \'text-white\' : \'text-slate-800 dark:text-white\'}`}>{qari.name}</h3>'
);

code = code.replace(
  '<p className="text-xs text-slate-500 dark:text-[#a0c4b3]">{qari.englishName}</p>',
  '<p className={`text-xs ${isActive ? \'text-[#a0c4b3]\' : \'text-slate-500 dark:text-slate-400\'}`}>{qari.englishName}</p>'
);

fs.writeFileSync('src/screens/Reciters.tsx', code);
