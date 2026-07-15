import { useStore } from '../store/useStore';
import { BookOpen, Calendar, CheckCircle2, ChevronRight, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Khatma() {
  const { khatmaProgress, setKhatmaProgress } = useStore();
  
  // Dummy data for now. In a real app, this would be calculated based on user setup.
  const totalDays = 30;
  const currentDay = 12;
  const targetSurah = "سورة الكهف";
  const targetAyah = "1-45";
  const progressPercent = Math.round((currentDay / totalDays) * 100);

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500 pb-24">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">ختمة القرآن</h1>
        <p className="text-slate-500">اللهم اجعل القرآن ربيع قلوبنا</p>
      </header>

      {/* Progress Card */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 rounded-full border-4 border-white/20 flex items-center justify-center relative">
            <span className="text-3xl font-bold font-mono">{progressPercent}%</span>
            {/* SVG Circle for progress could go here */}
          </div>
          <div>
            <h2 className="text-xl font-bold">خطة 30 يوم</h2>
            <p className="opacity-90">أنت في اليوم {currentDay} من أصل {totalDays}</p>
          </div>
        </div>
        
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-black/10 rounded-full blur-2xl"></div>
      </div>

      {/* Today's Target */}
      <div className="glass rounded-3xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-500 text-white ring-1 ring-gold-500/50 dark:bg-primary-900/50 dark:text-primary-400 flex items-center justify-center">
              <Calendar size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white">وِرد اليوم</h3>
              <p className="text-sm text-slate-500">اليوم الثاني عشر</p>
            </div>
          </div>
          <div className="text-left">
            <h4 className="font-bold font-amiri text-lg text-primary-600 dark:text-primary-400">{targetSurah}</h4>
            <p className="text-sm text-slate-500">الآيات {targetAyah}</p>
          </div>
        </div>
        
        <div className="flex gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <Link 
            to="/quran/18"
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-colors"
          >
            <PlayCircle size={20} />
            ابدأ القراءة
          </Link>
          <button 
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-colors"
          >
            <CheckCircle2 size={20} />
            تحديد كمقروء
          </button>
        </div>
      </div>

      {/* Setup New Khatma (Placeholder) */}
      <button className="w-full glass p-5 rounded-2xl flex items-center justify-between group hover:scale-[1.02] transition-transform">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
            <BookOpen size={24} />
          </div>
          <div className="text-right">
            <h3 className="font-bold text-slate-800 dark:text-white">إعداد ختمة جديدة</h3>
            <p className="text-sm text-slate-500">اختر المدة وحدد وردك اليومي</p>
          </div>
        </div>
        <ChevronRight className="text-slate-400 rotate-180 group-hover:-translate-x-1 transition-transform" />
      </button>

    </div>
  );
}
