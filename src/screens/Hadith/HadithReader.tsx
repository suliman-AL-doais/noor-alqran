import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Bookmark, Share2, Copy, CheckCircle, Info, BookOpen, User } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { hadithsData } from '../../data/hadiths';

export default function HadithReader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quranFontSize, quranFontFamily, bookmarkedHadiths, toggleHadithBookmark, setLastReadHadith, hapticFeedback } = useStore();
  const [copied, setCopied] = useState(false);

  const hadith = hadithsData.find(h => h.id === id);

  useEffect(() => {
    if (hadith) {
      setLastReadHadith(hadith.id);
    }
  }, [hadith, setLastReadHadith]);

  if (!hadith) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-500">الحديث غير موجود</p>
        <button onClick={() => navigate('/hadith')} className="mt-4 text-primary-600">العودة للوراء</button>
      </div>
    );
  }

  const handleCopy = () => {
    if (hapticFeedback && navigator.vibrate) navigator.vibrate(40);
    const textToCopy = `${hadith.title}\n\n${hadith.text}\n\nالراوي: ${hadith.narrator}\nالمصدر: ${hadith.source}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (hapticFeedback && navigator.vibrate) navigator.vibrate(40);
    const textToShare = `${hadith.title}\n\n${hadith.text}\n\nالراوي: ${hadith.narrator}\nالمصدر: ${hadith.source}`;
    if (navigator.share) {
      navigator.share({
        title: hadith.title,
        text: textToShare,
      }).catch(console.error);
    } else {
      handleCopy();
    }
  };

  const isBookmarked = bookmarkedHadiths.includes(hadith.id);

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6 pb-24 animate-in fade-in duration-500">
      {/* Header */}
      <header className="flex items-center justify-between sticky top-4 z-40 glass-panel p-3 rounded-full mb-8">
        <Link 
          to="/hadith"
          className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowRight size={24} />
        </Link>
        <h1 className="font-bold text-lg font-amiri text-slate-800 dark:text-slate-100 truncate px-4">{hadith.title}</h1>
        <div className="flex items-center gap-1">
          <button 
            onClick={handleShare}
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
          >
            <Share2 size={20} />
          </button>
          <button 
            onClick={() => toggleHadithBookmark(hadith.id)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isBookmarked ? 'text-primary-500' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>
      </header>

      {/* Main Hadith Card */}
      <div className="glass p-6 md:p-10 rounded-[2rem] shadow-xl border border-white/20 dark:border-white/5 relative overflow-hidden">
        {/* Decorative corner bg */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <p 
          className="text-center text-slate-800 dark:text-slate-100 leading-[2.5] select-text"
          style={{ 
            fontSize: `${quranFontSize}px`,
            fontFamily: quranFontFamily === 'Amiri' ? "'Amiri', serif" : "'Scheherazade New', serif"
          }}
        >
          {hadith.text}
        </p>

        <div className="flex justify-center mt-8">
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-white/50 dark:hover:bg-slate-800 transition-colors text-sm font-bold text-slate-600 dark:text-slate-300"
          >
            {copied ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} />}
            <span>{copied ? 'تم النسخ' : 'نسخ الحديث'}</span>
          </button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Source Card */}
        <div className="glass-panel p-5 rounded-3xl space-y-4">
          <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 mb-2">
            <BookOpen size={20} />
            <h3 className="font-bold text-lg">المصدر والتخريج</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800/50">
              <span className="text-slate-500">الراوي</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{hadith.narrator}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800/50">
              <span className="text-slate-500">المحدث</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{hadith.muhaddith}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800/50">
              <span className="text-slate-500">المصدر</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{hadith.source}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800/50">
              <span className="text-slate-500">رقم الحديث</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{hadith.number}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">درجة الحديث</span>
              <span className="font-bold text-green-600 dark:text-green-400 px-2 py-1 rounded-md bg-green-50 dark:bg-green-900/20">{hadith.grade}</span>
            </div>
          </div>
        </div>

        {/* Explanation Card */}
        <div className="glass-panel p-5 rounded-3xl space-y-3">
          <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 mb-2">
            <Info size={20} />
            <h3 className="font-bold text-lg">شرح الحديث</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-loose font-amiri">
            {hadith.explanation}
          </p>
        </div>
      </div>

      {/* Benefits Card */}
      <div className="glass-panel p-6 rounded-3xl">
        <h3 className="font-bold text-lg text-primary-600 dark:text-primary-400 mb-4 flex items-center gap-2">
          <CheckCircle size={20} />
          الفوائد المستنبطة
        </h3>
        <ul className="space-y-3">
          {hadith.benefits.map((benefit, idx) => (
            <li key={idx} className="flex gap-3 text-slate-700 dark:text-slate-200 text-sm leading-relaxed">
              <span className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                {idx + 1}
              </span>
              <span className="pt-0.5">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
