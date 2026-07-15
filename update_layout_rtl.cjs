const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

// The new nav items using emojis for the 3D look, or lucide icons if preferred. Let's stick to Lucide but apply a drop-shadow class, or just use the text.
// The user provided the emojis, let's just use them! They look great and are literally 3D.
code = code.replace(
  /const navItems = \[[\s\S]*?\];/,
  `const navItems = [
    { to: '/', emoji: '🏠', label: t('nav.home') },
    { to: '/quran', emoji: '📖', label: t('nav.quran') },
    { to: '/hadith', emoji: '📚', label: t('nav.hadith') },
    { to: '/azkar', emoji: '🤲', label: t('nav.azkar') },
    { to: '/tasbeeh', emoji: '📿', label: t('nav.tasbeeh') },
    { to: '/settings', emoji: '⚙️', label: t('nav.settings') },
  ];`
);

// Now update the Icon rendering part to render emojis
const oldIconRender = `{/* Icon */}
                  <div className={cn(
                    "relative z-10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1.2)] flex items-center justify-center",
                    isActive 
                      ? "-translate-y-6 text-white scale-[1.2] drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" 
                      : "text-slate-500 dark:text-[#a0c4b3] group-hover:scale-110 group-active:scale-95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                  )}>
                    <item.icon size={26} strokeWidth={isActive ? 2 : 1.5} fill={isActive ? 'currentColor' : 'none'} className={!isActive ? 'fill-slate-200/20 dark:fill-[#0a402e]/30' : ''} />
                  </div>`;

const newIconRender = `{/* Icon */}
                  <div className={cn(
                    "relative z-10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1.2)] flex items-center justify-center text-2xl",
                    isActive 
                      ? "-translate-y-6 scale-[1.2] drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]" 
                      : "opacity-80 group-hover:scale-110 group-active:scale-95 drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] grayscale-[0.3]"
                  )}>
                    {item.emoji}
                  </div>`;

code = code.replace(oldIconRender, newIconRender);

fs.writeFileSync('src/components/Layout.tsx', code);
