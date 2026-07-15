import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings2, BarChart2, ChevronDown, RotateCcw, 
  Volume2, VolumeX, Vibrate, VibrateOff, Plus, Check, X
} from 'lucide-react';

const azkarList = [
  'سُبْحَانَ اللَّهِ',
  'الْحَمْدُ لِلَّهِ',
  'اللَّهُ أَكْبَرُ',
  'لَا إِلَهَ إِلَّا اللَّهُ',
  'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
  'سُبْحَانَ اللَّهِ الْعَظِيمِ',
  'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
  'أَسْتَغْفِرُ اللَّهَ',
  'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ',
  'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
  'رَبِّ اغْفِرْ لِي',
  'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً',
];

const goalsList = [33, 100, 200, 500, 1000, 5000, 10000];

const materials: Record<string, { name: string, bg: string, shadow: string, border: string }> = {
  wood: { name: 'خشب', bg: 'radial-gradient(circle at 35% 35%, #a67c52, #5c3a21)', shadow: '0 20px 40px rgba(92,58,33,0.6), inset -10px -10px 20px rgba(0,0,0,0.5), inset 10px 10px 20px rgba(255,255,255,0.2)', border: 'border-[#4a2e12]' },
  amber: { name: 'كهرمان', bg: 'radial-gradient(circle at 35% 35%, #ffd166, #d97706)', shadow: '0 20px 40px rgba(217,119,6,0.5), inset -10px -10px 20px rgba(180,83,9,0.7), inset 10px 10px 20px rgba(255,255,255,0.6)', border: 'border-[#b45309]' },
  agate: { name: 'عقيق', bg: 'radial-gradient(circle at 35% 35%, #ef4444, #991b1b)', shadow: '0 20px 40px rgba(153,27,27,0.5), inset -10px -10px 20px rgba(127,29,29,0.8), inset 10px 10px 20px rgba(255,255,255,0.4)', border: 'border-[#7f1d1d]' },
  emerald: { name: 'زمرد', bg: 'radial-gradient(circle at 35% 35%, #34d399, #065f46)', shadow: '0 20px 40px rgba(6,95,70,0.5), inset -10px -10px 20px rgba(2,44,34,0.8), inset 10px 10px 20px rgba(255,255,255,0.4)', border: 'border-[#022c22]' },
  pearl: { name: 'لؤلؤ', bg: 'radial-gradient(circle at 35% 35%, #ffffff, #e2e8f0)', shadow: '0 20px 40px rgba(148,163,184,0.4), inset -10px -10px 20px rgba(203,213,225,0.8), inset 10px 10px 20px rgba(255,255,255,0.8)', border: 'border-[#cbd5e1]' },
  gold: { name: 'ذهبي', bg: 'radial-gradient(circle at 35% 35%, #fef08a, #ca8a04)', shadow: '0 20px 40px rgba(202,138,4,0.4), inset -10px -10px 20px rgba(161,98,7,0.8), inset 10px 10px 20px rgba(255,255,255,0.6)', border: 'border-[#a16207]' },
};

// ... will append more

export default function Tasbeeh() {
  const { 
    tasbeehCount, setTasbeehCount, 
    tasbeehGoal, setTasbeehGoal,
    tasbeehZikr, setTasbeehZikr,
    customAzkar, addCustomZikr,
    tasbeehStats, incrementTasbeehStats,
    tasbeehSettings, updateTasbeehSettings,
    theme
  } = useStore();

  const [showSettings, setShowSettings] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showZikrSelect, setShowZikrSelect] = useState(false);
  const [showGoalSelect, setShowGoalSelect] = useState(false);
  const [newZikr, setNewZikr] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);

  const allAzkar = [...azkarList, ...customAzkar];
  const material = materials[tasbeehSettings.material] || materials.wood;

  const progress = Math.min((tasbeehCount / tasbeehGoal) * 100, 100);

  const playClickSound = () => {
    if (!tasbeehSettings.sound) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      // Wood-like click sound
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);
      
      gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      console.log('Audio error:', e);
    }
  };

  const handleTap = () => {
    if (tasbeehSettings.vibration && navigator.vibrate) {
      navigator.vibrate(40);
    }
    
    playClickSound();
    
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 150);

    const newCount = tasbeehCount + 1;
    setTasbeehCount(newCount);
    incrementTasbeehStats();

    if (newCount === tasbeehGoal) {
      setShowCelebration(true);
      if (tasbeehSettings.vibration && navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 200]);
      }
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  const resetCount = () => {
    if (tasbeehSettings.vibration && navigator.vibrate) {
      navigator.vibrate([50, 100, 50]);
    }
    setTasbeehCount(0);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col p-4 md:p-8 animate-in fade-in duration-700">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l15 15-15 15L15 15zM0 30l15 15-15 15-15-15zM60 30l15 15-15 15-15-15zM30 60l15 15-15 15L15 75z\' fill=\'%23d4af37\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")', backgroundSize: '80px 80px' }} />
      
      {/* Top Bar */}
      <div className="flex justify-between items-center relative z-20 mb-8 max-w-lg mx-auto w-full">
        <button onClick={() => setShowStats(true)} className="w-12 h-12 rounded-full glass flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
          <BarChart2 size={24} />
        </button>
        <h1 className="text-2xl font-bold font-amiri text-slate-800 dark:text-white text-center">السبحة الإلكترونية</h1>
        <button onClick={() => setShowSettings(true)} className="w-12 h-12 rounded-full glass flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
          <Settings2 size={24} />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 max-w-md mx-auto w-full gap-12">
        
        {/* Zikr Selection & Goal */}
        <div className="w-full space-y-4">
          <div 
            onClick={() => setShowZikrSelect(true)}
            className="glass-panel p-4 rounded-3xl text-center cursor-pointer hover:bg-white/40 dark:hover:bg-black/20 transition-all group"
          >
            <p className="text-xl md:text-2xl font-amiri font-bold text-primary-700 dark:text-primary-400 leading-loose">
              {tasbeehZikr}
            </p>
            <div className="flex items-center justify-center gap-2 mt-2 text-slate-500 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs">تغيير الذكر</span>
              <ChevronDown size={14} />
            </div>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={() => setShowGoalSelect(true)}
              className="px-4 py-1.5 rounded-full glass text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-2"
            >
              <span>الهدف: {tasbeehGoal}</span>
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* 3D Bead & Counter */}
        <div className="relative flex items-center justify-center w-full aspect-square max-w-[320px]">
          
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none drop-shadow-lg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-200 dark:text-slate-800 opacity-50" />
            <circle 
              cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="4" 
              strokeDasharray="289.02" strokeDashoffset={289.02 - (289.02 * progress) / 100} 
              strokeLinecap="round"
              className="text-primary-500 dark:text-primary-400 transition-all duration-500 ease-out" 
            />
          </svg>

          {/* The Big Bead Button */}
          <motion.button
            onClick={handleTap}
            animate={{ 
              scale: isAnimating && tasbeehSettings.animations ? 0.92 : 1,
              y: isAnimating && tasbeehSettings.animations ? 10 : 0
            }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className={`w-[70%] h-[70%] rounded-full relative z-20 flex flex-col items-center justify-center border-2 \${material.border}`}
            style={{ 
              background: material.bg,
              boxShadow: material.shadow
            }}
          >
            {/* Inner Bead Reflection */}
            <div className="absolute top-[10%] left-[20%] w-[40%] h-[30%] bg-white/20 rounded-full blur-[8px] pointer-events-none" />
            
            <span className="text-5xl md:text-6xl font-bold text-white drop-shadow-md font-mono tracking-tighter" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
              {tasbeehCount}
            </span>
          </motion.button>
          
          {/* Reset Button */}
          <button
            onClick={resetCount}
            className="absolute -bottom-2 -right-2 w-14 h-14 rounded-full glass text-slate-500 shadow-lg flex items-center justify-center hover:text-rose-500 active:scale-90 transition-all z-30 border border-white/40 dark:border-slate-700"
            title="تصفير العداد"
          >
            <RotateCcw size={22} />
          </button>
        </div>
        
        {/* Celebration Effect */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none flex flex-col items-center"
            >
              <div className="w-32 h-32 bg-gold-500/20 rounded-full blur-3xl absolute" />
              <div className="glass-panel px-6 py-4 rounded-3xl flex items-center gap-3 border-gold-400/30 text-gold-600 dark:text-gold-400">
                <Check size={28} />
                <span className="text-2xl font-bold font-amiri">تقبل الله!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Zikr Select Modal */}
      <AnimatePresence>
        {showZikrSelect && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-0">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowZikrSelect(false)} 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="relative w-full max-w-md max-h-[80vh] flex flex-col bg-[#FAF4E8] dark:bg-[#063023] rounded-[2rem] shadow-2xl overflow-hidden border border-white/20 dark:border-white/5"
            >
              <div className="p-4 text-center border-b border-slate-200 dark:border-slate-800 relative">
                <h2 className="text-xl font-bold font-amiri text-slate-800 dark:text-white">اختر الذكر</h2>
                <button onClick={() => setShowZikrSelect(false)} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                  <X size={20} className="text-slate-500" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {allAzkar.map((zikr, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setTasbeehZikr(zikr); setTasbeehCount(0); setShowZikrSelect(false); }}
                    className={`w-full p-4 rounded-2xl text-right font-amiri text-lg transition-colors \${tasbeehZikr === zikr ? 'bg-primary-500 text-white shadow-md' : 'glass hover:bg-white/60 dark:hover:bg-black/20 text-slate-700 dark:text-slate-200'}`}
                  >
                    {zikr}
                  </button>
                ))}
              </div>
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-black/20">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newZikr} 
                    onChange={(e) => setNewZikr(e.target.value)}
                    placeholder="إضافة ذكر جديد..."
                    className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white"
                  />
                  <button 
                    onClick={() => {
                      if (newZikr.trim()) {
                        addCustomZikr(newZikr.trim());
                        setTasbeehZikr(newZikr.trim());
                        setTasbeehCount(0);
                        setNewZikr('');
                        setShowZikrSelect(false);
                      }
                    }}
                    disabled={!newZikr.trim()}
                    className="w-12 flex items-center justify-center rounded-xl bg-primary-500 text-white disabled:opacity-50"
                  >
                    <Plus size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Goal Select Modal */}
      <AnimatePresence>
        {showGoalSelect && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-0">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowGoalSelect(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "100%", opacity: 0 }} transition={{ type: "spring", bounce: 0, duration: 0.4 }} className="relative w-full max-w-sm bg-[#FAF4E8] dark:bg-[#063023] rounded-[2rem] shadow-2xl overflow-hidden">
              <div className="p-4 text-center border-b border-slate-200 dark:border-slate-800">
                <h2 className="text-xl font-bold font-amiri">الهدف</h2>
              </div>
              <div className="p-6 grid grid-cols-3 gap-3">
                {goalsList.map((g) => (
                  <button
                    key={g}
                    onClick={() => { setTasbeehGoal(g); setShowGoalSelect(false); }}
                    className={`p-3 rounded-2xl font-bold text-lg transition-colors \${tasbeehGoal === g ? 'bg-primary-500 text-white shadow-md' : 'glass hover:bg-white/60 dark:hover:bg-black/20 text-slate-700 dark:text-slate-200'}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Stats Modal */}
      <AnimatePresence>
        {showStats && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowStats(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-sm bg-[#FAF4E8] dark:bg-[#063023] rounded-[2rem] shadow-2xl overflow-hidden border border-white/20 dark:border-white/5 p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold font-amiri text-slate-800 dark:text-white">الإحصائيات</h2>
                <button onClick={() => setShowStats(false)} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                  <X size={20} className="text-slate-500" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-panel p-4 rounded-2xl text-center space-y-1">
                  <p className="text-xs text-slate-500">اليوم</p>
                  <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{tasbeehStats.today}</p>
                </div>
                <div className="glass-panel p-4 rounded-2xl text-center space-y-1">
                  <p className="text-xs text-slate-500">هذا الأسبوع</p>
                  <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{tasbeehStats.week}</p>
                </div>
                <div className="glass-panel p-4 rounded-2xl text-center space-y-1">
                  <p className="text-xs text-slate-500">هذا الشهر</p>
                  <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{tasbeehStats.month}</p>
                </div>
                <div className="glass-panel p-4 rounded-2xl text-center space-y-1">
                  <p className="text-xs text-slate-500">الإجمالي</p>
                  <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{tasbeehStats.total}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSettings(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-sm bg-[#FAF4E8] dark:bg-[#063023] rounded-[2rem] shadow-2xl overflow-hidden border border-white/20 dark:border-white/5 p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold font-amiri text-slate-800 dark:text-white">إعدادات السبحة</h2>
                <button onClick={() => setShowSettings(false)} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                  <X size={20} className="text-slate-500" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between glass p-4 rounded-2xl">
                  <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                    {tasbeehSettings.sound ? <Volume2 size={20} className="text-primary-500" /> : <VolumeX size={20} />}
                    <span className="font-bold">الصوت</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={tasbeehSettings.sound} onChange={(e) => updateTasbeehSettings({ sound: e.target.checked })} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between glass p-4 rounded-2xl">
                  <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                    {tasbeehSettings.vibration ? <Vibrate size={20} className="text-primary-500" /> : <VibrateOff size={20} />}
                    <span className="font-bold">الاهتزاز</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={tasbeehSettings.vibration} onChange={(e) => updateTasbeehSettings({ vibration: e.target.checked })} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between glass p-4 rounded-2xl">
                  <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                    <span className="font-bold">الحركة (Animations)</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={tasbeehSettings.animations} onChange={(e) => updateTasbeehSettings({ animations: e.target.checked })} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                  </label>
                </div>

                <div className="glass p-4 rounded-2xl space-y-3">
                  <span className="font-bold text-slate-700 dark:text-slate-200">شكل السبحة</span>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(materials).map(([key, mat]) => (
                      <button 
                        key={key}
                        onClick={() => updateTasbeehSettings({ material: key })}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all \${tasbeehSettings.material === key ? 'bg-primary-500 text-white ring-2 ring-primary-300 ring-offset-1 dark:ring-offset-slate-900' : 'bg-white/50 dark:bg-black/20 text-slate-600 dark:text-slate-400'}`}
                      >
                        {mat.name}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
