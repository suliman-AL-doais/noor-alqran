const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

const navItemsArray = `
  const navItems = [
    { to: '/', icon: Home, label: t('nav.home') },
    { to: '/quran', icon: BookOpenText, label: t('nav.quran') },
    { to: '/hadith', icon: ScrollText, label: t('nav.hadith') },
    { to: '/azkar', icon: HandHeart, label: t('nav.azkar') },
    { to: '/tasbeeh', icon: Disc3, label: t('nav.tasbeeh') },
    { to: '/settings', icon: Settings, label: t('nav.settings') },
  ];
`;

code = code.replace(/const navItems = \[[\s\S]*?\];/, navItemsArray.trim());

// Enhance active animation
const activeDisc = `
                  {/* Active 3D Glowing Disc Background */}
                  <div className={cn(
                    "absolute top-0 w-[55px] md:w-[65px] h-[55px] md:h-[65px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1.2)]",
                    isActive 
                      ? "opacity-100 scale-100 -translate-y-6 shadow-[0_10px_30px_rgba(201,162,39,0.5)] bg-gradient-to-br from-[#fde047] via-[#ca8a04] to-[#854d0e]" 
                      : "opacity-0 scale-50 translate-y-0 bg-transparent"
                  )}>
                    {/* Glassmorphism Inner Highlight */}
                    <div className="absolute inset-0 rounded-full border-[2px] border-white/50 mix-blend-overlay" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 h-1/3 rounded-b-full bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
`;

code = code.replace(/{\/\* Active 3D Glowing Disc Background \*\/}[\s\S]*?<\/div>\s*<\/div>/, activeDisc.trim());

const iconClass = `
                  {/* Icon */}
                  <div className={cn(
                    "relative z-10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1.2)] flex items-center justify-center",
                    isActive 
                      ? "-translate-y-6 text-white scale-[1.2] drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" 
                      : "text-slate-500 dark:text-[#a0c4b3] group-hover:scale-110 group-active:scale-95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                  )}>
                    <item.icon size={26} strokeWidth={isActive ? 2 : 1.5} fill={isActive ? 'currentColor' : 'none'} className={!isActive ? 'fill-slate-200/20 dark:fill-[#0a402e]/30' : ''} />
                  </div>
`;

code = code.replace(/{\/\* Icon \*\/}[\s\S]*?<\/div>/, iconClass.trim());

const labelClass = `
                  {/* Label */}
                  <span className={cn(
                    "absolute bottom-2 text-[10px] sm:text-[11px] font-bold transition-all duration-300 ease-out text-center w-full",
                    isActive 
                      ? "opacity-100 translate-y-0 text-[#a16207] dark:text-[#d4af37]" 
                      : "opacity-100 translate-y-0 text-slate-500 dark:text-[#a0c4b3]"
                  )}>
                    {item.label}
                  </span>
`;

code = code.replace(/{\/\* Label \*\/}[\s\S]*?<\/span>/, labelClass.trim());

fs.writeFileSync('src/components/Layout.tsx', code);
