import { Outlet, NavLink } from 'react-router-dom';
import { BookOpen, Settings, HandHeart, Home, ScrollText, Disc3 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useStore } from '../store/useStore';
import { useTranslation } from 'react-i18next';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Layout() {
  const { t } = useTranslation();
  
  const navItems = [
    { to: '/', emoji: '🏠', label: t('nav.home') },
    { to: '/quran', emoji: '📖', label: t('nav.quran') },
    { to: '/hadith', emoji: '📚', label: t('nav.hadith') },
    { to: '/azkar', emoji: '🤲', label: t('nav.azkar') },
    { to: '/tasbeeh', emoji: '📿', label: t('nav.tasbeeh') },
    { to: '/settings', emoji: '⚙️', label: t('nav.settings') },
  ];

  const { hapticFeedback } = useStore();

  const handleHaptic = () => {
    if (hapticFeedback && navigator.vibrate) {
      navigator.vibrate(40);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-[120px]">
      {/* 3D Floating Bottom Navigation */}
      <nav className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-auto md:min-w-[450px] z-50">
        <div className="relative flex justify-around items-center h-[90px] px-2 rounded-[40px] 
          bg-white/90 dark:bg-[#031d14]/90 backdrop-blur-3xl
          border-[1.5px] border-[#d4af37]/30
          shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(212,175,55,0.15)]
          transition-all duration-300">
          
          {/* Top Edge Lighting (3D Depth) */}
          <div className="absolute inset-0 rounded-[40px] border-t-2 border-white/60 dark:border-[#d4af37]/20 pointer-events-none" />
          
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={handleHaptic}
              className="relative z-10 flex flex-col items-center justify-center w-[60px] md:w-[75px] h-[75px]"
            >
              {({ isActive }) => (
                <div className="relative flex flex-col items-center justify-center w-full h-full group cursor-pointer">
                  
                  {/* Active 3D Glowing Disc Background */}
                  <div className={cn(
                    "absolute top-0 w-[55px] md:w-[65px] h-[55px] md:h-[65px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1.2)]",
                    isActive 
                      ? "opacity-100 scale-100 -translate-y-6 shadow-[0_10px_30px_rgba(212,175,55,0.5)] bg-gradient-to-br from-[#fde047] via-[#ca8a04] to-[#854d0e]" 
                      : "opacity-0 scale-50 translate-y-0 bg-transparent"
                  )}>
                    {/* Glassmorphism Inner Highlight */}
                    <div className="absolute inset-0 rounded-full border-[2px] border-white/40 mix-blend-overlay" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 h-1/3 rounded-b-full bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  {/* Icon */}
                  <div className={cn(
                    "relative z-10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1.2)] flex items-center justify-center text-2xl",
                    isActive 
                      ? "-translate-y-6 scale-[1.2] drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]" 
                      : "opacity-80 group-hover:scale-110 group-active:scale-95 drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] grayscale-[0.3]"
                  )}>
                    {item.emoji}
                  </div>

                  {/* Label */}
                  <span className={cn(
                    "absolute bottom-2 text-[10px] sm:text-[11px] font-bold transition-all duration-300 ease-out text-center w-full",
                    isActive 
                      ? "opacity-100 translate-y-0 text-[#ca8a04] dark:text-[#d4af37]" 
                      : "opacity-100 translate-y-0 text-slate-500 dark:text-[#a0c4b3]"
                  )}>
                    {item.label}
                  </span>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen relative overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
