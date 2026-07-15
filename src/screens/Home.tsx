import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookOpen, Heart, Clock, Compass, Grid, Star, PlayCircle, Bell, Search, Moon, Sun, HandHeart, Calendar, ScrollText } from 'lucide-react';



export default function Home() {
  const { t, i18n } = useTranslation();

  const features = [
    { title: t('features.eveningAzkar.title'), icon: Moon, path: '/azkar?category=' + encodeURIComponent('أذكار-المساء'), desc: t('features.eveningAzkar.desc') },
    { title: t('features.morningAzkar.title'), icon: Sun, path: '/azkar?category=' + encodeURIComponent('أذكار-الصباح'), desc: t('features.morningAzkar.desc') },
    { title: t('features.quran.title'), icon: BookOpen, path: '/quran', desc: t('features.quran.desc') },
    { title: t('features.hadith.title'), icon: ScrollText, path: '/hadith', desc: t('features.hadith.desc') },
    { title: t('features.khatma.title'), icon: Star, path: '/khatma', desc: t('features.khatma.desc') },
    { title: t('features.prayer.title'), icon: Clock, path: '/prayer', desc: t('features.prayer.desc') },
    { title: t('features.tasbeeh.title'), icon: Grid, path: '/tasbeeh', desc: t('features.tasbeeh.desc') },
    { title: t('features.dua.title'), icon: HandHeart, path: '/azkar', desc: t('features.dua.desc') },
  ];
  const [hijriDate, setHijriDate] = useState('جاري الحساب...');
  const [gregorianDate, setGregorianDate] = useState('');
  const [locationName, setLocationName] = useState('جاري التحديد...');

  useEffect(() => {
    const currentLang = i18n.resolvedLanguage || i18n.language;
    // Get Hijri Date
    try {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      };
      setHijriDate(new Intl.DateTimeFormat(currentLang.startsWith('ar') ? 'ar-SA-u-ca-islamic' : 'en-US-u-ca-islamic', options).format(date));
      setGregorianDate(new Intl.DateTimeFormat(currentLang.startsWith('ar') ? 'ar-EG' : 'en-US', options).format(date));
    } catch (e) {
      setHijriDate('رمضان 1447');
    }

    // Get Location
    const fetchLocation = (lat?: number, lon?: number) => {
      let url = 'https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=ar';
      if (lat && lon) {
        url += `&latitude=${lat}&longitude=${lon}`;
      }
      
      fetch(url)
        .then(res => res.json())
        .then(data => {
          const city = data.city || data.locality || '';
          const country = data.countryName || '';
          const separator = city && country ? ', ' : '';
          setLocationName(`${city}${separator}${country}` || 'مكة المكرمة, السعودية');
        })
        .catch(() => {
          setLocationName('مكة المكرمة, السعودية');
        });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchLocation(position.coords.latitude, position.coords.longitude);
        },
        () => {
          fetchLocation(); // Fallback to IP
        }
      );
    } else {
      fetchLocation();
    }
  }, [i18n.language, i18n.resolvedLanguage]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top App Bar */}
      <div className="flex items-center justify-between pt-2">
        <button className="p-2 text-[#ca8a04] dark:text-[#d4af37] hover:bg-[#ca8a04]/10 rounded-full transition-colors">
          <Bell size={24} />
        </button>
        <h1 className="text-3xl font-bold font-amiri text-[#ca8a04] dark:text-[#d4af37] drop-shadow-sm dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          نُورُ القُرْآنِ
        </h1>
        <button className="p-2 text-[#ca8a04] dark:text-[#d4af37] hover:bg-[#ca8a04]/10 rounded-full transition-colors">
          <Search size={24} />
        </button>
      </div>

      {/* Header */}
      <header className="flex items-center justify-between pt-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t('home.greeting')}</h2>
          <p className="text-primary-700 dark:text-[#a0c4b3] mt-1 text-sm">{t('home.welcome')}</p>
        </div>
        <div className="text-left flex items-center gap-2">
          <div className="text-[#d4af37]">
            <Calendar size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#ca8a04] dark:text-[#d4af37]">{hijriDate}</p>
            {gregorianDate && <p className="text-xs text-slate-600 dark:text-[#a0c4b3] mb-0.5">{gregorianDate}</p>}
            <p className="text-xs text-primary-700 dark:text-[#a0c4b3]/80">{locationName}</p>
          </div>
        </div>
      </header>

      {/* Hero Card - Last Read */}
      <section className="relative overflow-hidden rounded-[24px] bg-gradient-to-r from-[#031d14] to-[#063023] border border-[#d4af37]/40 p-6 text-white shadow-[0_15px_30px_rgba(0,0,0,0.4)]">
        <div className="absolute inset-0 bg-[#d4af37]/5 backdrop-blur-sm"></div>
        <div className="relative z-10 flex justify-between items-center">
          
          {/* Decorative Pattern / Icon on the Left */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-[#d4af37]/20 flex items-center justify-center bg-gradient-to-br from-[#105c43] to-[#063023] shadow-[0_0_30px_rgba(212,175,55,0.15)] relative">
            <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#d4af37]/40 animate-[spin_20s_linear_infinite]" />
            <BookOpen size={48} className="text-[#d4af37] drop-shadow-[0_2px_10px_rgba(212,175,55,0.5)]" strokeWidth={1.5} />
          </div>

          <div className="text-right">
            <div className="flex items-center justify-end gap-2 mb-4 opacity-90 text-[#d4af37]">
              <span className="font-medium text-sm">{t('home.lastRead')}</span>
              <BookOpen size={18} />
            </div>
            <h3 className="text-4xl font-bold mb-2 font-amiri text-[#fde047]">{t('home.surahAlKahf')}</h3>
            <p className="opacity-80 mb-6 text-sm text-[#a0c4b3]">{t('home.ayah10')}</p>
            <Link 
              to="/quran" 
              className="inline-flex items-center gap-2 bg-[#d4af37]/10 border border-[#d4af37]/30 hover:bg-[#d4af37]/20 text-[#fde047] px-5 py-2 rounded-full transition-colors font-bold text-sm shadow-[0_4px_15px_rgba(212,175,55,0.2)]"
            >
              <PlayCircle size={18} />
              متابعة القراءة
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="pt-2">
        <div className="flex items-center justify-center mb-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#ca8a04] dark:via-[#d4af37]/40 to-transparent flex-1" />
          <h3 className="text-lg font-bold text-[#ca8a04] dark:text-[#fde047] px-4 ">{t('home.services')}</h3>
          <div className="h-px bg-gradient-to-r from-transparent via-[#ca8a04] dark:via-[#d4af37]/40 to-transparent flex-1" />
        </div>

        <div className="grid grid-cols-4 gap-3">
          {features.map((feature, idx) => (
            <Link
              key={idx}
              to={feature.path}
              className="relative group bg-[#FAF4E8]/80 dark:bg-gradient-to-b dark:from-[#063023]/80 dark:to-[#021812]/90 
                backdrop-blur-xl border border-[#ca8a04]/20 dark:border-[#d4af37]/20 
                rounded-[20px] p-3 flex flex-col items-center text-center gap-2 
                transition-all duration-300 active:scale-95 hover:-translate-y-1 
                shadow-[0_10px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)]
                overflow-hidden"
            >
              {/* Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ca8a04]/5 dark:from-[#d4af37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-full flex items-center justify-center 
                bg-primary-50/50 dark:bg-gradient-to-b dark:from-[#0a402e] dark:to-[#04241a] border border-[#ca8a04]/30 dark:border-[#d4af37]/30 
                shadow-[0_4px_10px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.1)]
                group-hover:shadow-[0_0_20px_rgba(202,138,4,0.2)] dark:group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300">
                <feature.icon size={28} strokeWidth={1.5} className="text-[#ca8a04] dark:text-[#fde047] drop-shadow-sm dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="z-10 mt-1">
                <h4 className="font-bold text-slate-800 dark:text-[#e0f6e7] text-[10px] sm:text-xs whitespace-nowrap drop-shadow-sm">{feature.title}</h4>
                <p className="text-[8px] sm:text-[9px] text-primary-700 dark:text-[#5d8b76] mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis opacity-80">{feature.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
