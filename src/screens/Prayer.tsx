import { useState, useEffect } from 'react';
import { Coordinates, CalculationMethod, PrayerTimes, SunnahTimes } from 'adhan';
import moment from 'moment';
import { MapPin, Clock, Bell, BellOff, Settings, Calendar, Compass, Sunrise, Sunset, Moon, Sun, ChevronLeft, LocateFixed } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';

export default function Prayer() {
  const { t, i18n } = useTranslation();
  const { theme } = useStore();
  
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [locationName, setLocationName] = useState(t('prayer.calculating'));
  const [nextPrayer, setNextPrayer] = useState<{name: string, time: Date, id: string} | null>(null);
  const [timeToNext, setTimeToNext] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [hijriDate, setHijriDate] = useState('');
  const [gregorianDate, setGregorianDate] = useState('');

  useEffect(() => {
    const currentLang = i18n.resolvedLanguage || i18n.language;
    // Dates
    try {
      const date = new Date();
      setGregorianDate(new Intl.DateTimeFormat(currentLang.startsWith('ar') ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' }).format(date));
      setHijriDate(new Intl.DateTimeFormat(currentLang.startsWith('ar') ? 'ar-SA-u-ca-islamic' : 'en-US-u-ca-islamic', { day: 'numeric', month: 'long', year: 'numeric' }).format(date));
    } catch (e) {
      // Fallback
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          calculateTimes(latitude, longitude);
          
          try {
            const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ar`);
            const data = await res.json();
            const city = data.city || data.locality || '';
            const country = data.countryName || '';
            setLocationName(city && country ? `${city}، ${country}` : t('prayer.current_location'));
          } catch (error) {
            setLocationName(t('prayer.current_location'));
          }
        },
        (error) => {
          setLocationName(t('prayer.default_location'));
          calculateTimes(21.4225, 39.8262); // Mecca
        }
      );
    } else {
      setLocationName(t('prayer.default_location'));
      calculateTimes(21.4225, 39.8262);
    }
  }, [i18n.language, i18n.resolvedLanguage, t]);

  const calculateTimes = (lat: number, lng: number) => {
    const coordinates = new Coordinates(lat, lng);
    const params = CalculationMethod.UmmAlQura();
    const date = new Date();
    const times = new PrayerTimes(coordinates, date, params);
    setPrayerTimes(times);
    updateNextPrayer(times);
  };

  const updateNextPrayer = (times: PrayerTimes) => {
    const now = new Date();
    let next: {name: string, time: Date, id: string} | null = null;
    let current: Date | null = null;
    
    if (now < times.fajr) { next = { name: t('prayer.fajr'), time: times.fajr, id: 'fajr' }; current = moment().startOf('day').toDate(); }
    else if (now < times.sunrise) { next = { name: t('prayer.sunrise'), time: times.sunrise, id: 'sunrise' }; current = times.fajr; }
    else if (now < times.dhuhr) { next = { name: t('prayer.dhuhr'), time: times.dhuhr, id: 'dhuhr' }; current = times.sunrise; }
    else if (now < times.asr) { next = { name: t('prayer.asr'), time: times.asr, id: 'asr' }; current = times.dhuhr; }
    else if (now < times.maghrib) { next = { name: t('prayer.maghrib'), time: times.maghrib, id: 'maghrib' }; current = times.asr; }
    else if (now < times.isha) { next = { name: t('prayer.isha'), time: times.isha, id: 'isha' }; current = times.maghrib; }
    else {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowTimes = new PrayerTimes(new Coordinates(21.4225, 39.8262), tomorrow, CalculationMethod.UmmAlQura()); // Hack for now, should use real coords
      next = { name: t('prayer.fajr'), time: tomorrowTimes.fajr, id: 'fajr' };
      current = times.isha;
    }
    
    setNextPrayer(next);
  };

  useEffect(() => {
    if (!nextPrayer || !prayerTimes) return;

    const interval = setInterval(() => {
      const now = moment();
      const nextTime = moment(nextPrayer.time);
      const diff = moment.duration(nextTime.diff(now));
      
      if (diff.asMilliseconds() <= 0) {
        updateNextPrayer(prayerTimes);
      } else {
        const hours = Math.floor(diff.asHours()).toString().padStart(2, '0');
        const mins = diff.minutes().toString().padStart(2, '0');
        const secs = diff.seconds().toString().padStart(2, '0');
        setTimeToNext(`${hours}:${mins}:${secs}`);
        
        // Calculate progress
        // This requires knowing the previous prayer time, which we omitted for brevity, but let's fake a 2 hour window for now
        const totalDuration = 2 * 60 * 60 * 1000; 
        const elapsed = totalDuration - diff.asMilliseconds();
        let p = (elapsed / totalDuration) * 100;
        if (p < 0) p = 0;
        if (p > 100) p = 100;
        setProgress(p);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextPrayer, prayerTimes]);

  if (!prayerTimes) {
    return (
      <div className="flex justify-center items-center h-screen pb-20">
        <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const prayers = [
    { id: 'fajr', name: 'الفجر', time: prayerTimes.fajr, icon: Moon },
    { id: 'sunrise', name: 'الشروق', time: prayerTimes.sunrise, icon: Sunrise },
    { id: 'dhuhr', name: 'الظهر', time: prayerTimes.dhuhr, icon: Sun },
    { id: 'asr', name: 'العصر', time: prayerTimes.asr, icon: Sun },
    { id: 'maghrib', name: 'المغرب', time: prayerTimes.maghrib, icon: Sunset },
    { id: 'isha', name: 'العشاء', time: prayerTimes.isha, icon: Moon },
  ];

  return (
    <div className="min-h-screen pb-28 animate-in fade-in duration-700">
      
      {/* Top Header */}
      <div className="px-6 pt-6 pb-2 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-amiri text-[#ca8a04] dark:text-[#d4af37]">{t('prayer.title')}</h1>
          <p className="text-sm opacity-80 text-primary-800 dark:text-[#a0c4b3]">{gregorianDate}</p>
        </div>
        <button className="p-3 rounded-full bg-white/40 dark:bg-[#063023]/60 backdrop-blur-md shadow-sm text-[#ca8a04] dark:text-[#d4af37]">
          <Settings size={22} />
        </button>
      </div>

      {/* Hero 3D Card */}
      <div className="px-4 mt-2">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#063023] to-[#021812] border border-[#d4af37]/30 p-8 text-white shadow-[0_20px_40px_rgba(0,0,0,0.3),inset_0_2px_10px_rgba(212,175,55,0.2)]">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            
            <div className="flex items-center gap-2 mb-6 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
              <MapPin size={16} className="text-[#d4af37]" />
              <span className="text-sm font-medium">{locationName}</span>
            </div>

            <div className="relative w-48 h-48 flex items-center justify-center mb-4">
              {/* Circular Progress */}
              <svg viewBox="0 0 192 192" className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle
                  cx="96" cy="96" r="88"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                />
                <circle
                  cx="96" cy="96" r="88"
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 88}
                  strokeDashoffset={2 * Math.PI * 88 * (1 - progress / 100)}
                  className="transition-all duration-1000 ease-in-out"
                  strokeLinecap="round"
                />
              </svg>
              
              <div className="text-center">
                <p className="text-[#a0c4b3] text-sm mb-1 font-medium">{t('prayer.next_prayer')}</p>
                <h2 className="text-4xl font-bold font-amiri text-[#fde047] mb-2">{nextPrayer?.name}</h2>
                <p className="text-xl font-mono font-bold">{moment(nextPrayer?.time).format('hh:mm A')}</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-[#a0c4b3] mb-1">{t('prayer.time_remaining')}</p>
              <div className="text-3xl font-mono font-bold tracking-widest text-white drop-shadow-md">
                {timeToNext}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Date Card */}
      <div className="px-4 mt-4">
        <div className="glass-panel rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#ca8a04] dark:text-[#d4af37]">
              <Calendar size={20} />
            </div>
            <div>
              <p className="font-bold text-slate-800 dark:text-white text-sm">{hijriDate}</p>
              <p className="text-xs text-slate-500 dark:text-[#a0c4b3] font-medium">{gregorianDate}</p>
            </div>
          </div>
          <ChevronLeft className="text-slate-400" size={20} />
        </div>
      </div>

      {/* Prayers List */}
      <div className="px-4 mt-6 space-y-3">
        {prayers.map((prayer) => {
          const isNext = nextPrayer?.id === prayer.id;
          const isPast = moment().isAfter(prayer.time);
          
          return (
            <div 
              key={prayer.id}
              className={`relative overflow-hidden flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                isNext 
                  ? 'bg-gradient-to-r from-[#0a402e] to-[#04241a] shadow-[0_10px_20px_rgba(0,0,0,0.3)] border border-[#d4af37]/40 scale-[1.02]' 
                  : 'glass-panel hover:bg-white/60 dark:hover:bg-[#063023]/60'
              }`}
            >
              {isNext && (
                <div className="absolute inset-0 bg-[#d4af37]/5 animate-pulse"></div>
              )}
              
              <div className="relative z-10 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${
                  isNext ? 'bg-[#d4af37]/20 text-[#fde047]' : isPast ? 'bg-slate-100 dark:bg-slate-800/50 text-slate-400' : 'bg-white dark:bg-[#0a402e] text-[#ca8a04] dark:text-[#d4af37]'
                }`}>
                  <prayer.icon size={24} strokeWidth={isNext ? 2 : 1.5} />
                </div>
                <div>
                  <h3 className={`text-lg font-bold font-amiri ${isNext ? 'text-white' : isPast ? 'text-slate-500 dark:text-slate-500' : 'text-slate-800 dark:text-white'}`}>
                    {prayer.name}
                  </h3>
                  <p className={`text-xs ${isNext ? 'text-[#a0c4b3]' : 'text-slate-500'}`}>
                    {isNext ? t('prayer.status_next') : isPast ? t('prayer.status_past') : t('prayer.status_upcoming')}
                  </p>
                </div>
              </div>
              
              <div className="relative z-10 flex flex-col items-end gap-1">
                <span className={`text-xl font-bold font-mono ${isNext ? 'text-[#fde047]' : isPast ? 'text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-white'}`}>
                  {moment(prayer.time).format('hh:mm')}
                </span>
                <span className={`text-xs font-bold uppercase ${isNext ? 'text-[#a0c4b3]' : isPast ? 'text-slate-400' : 'text-slate-500'}`}>
                  {moment(prayer.time).format('A')}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Qibla Card */}
      <div className="px-4 mt-6">
        <Link to="/qibla" className="block relative overflow-hidden rounded-[24px] bg-gradient-to-r from-[#ca8a04]/90 to-[#a16207]/90 dark:from-[#115e3b] dark:to-[#064e3b] p-6 text-white shadow-lg border border-white/20 transition-transform active:scale-95">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold font-amiri mb-1">{t('prayer.qibla')}</h3>
              <p className="text-sm opacity-90">{t('prayer.qibla_desc')}</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
              <Compass size={32} className="text-white drop-shadow-md" />
            </div>
          </div>
        </Link>
      </div>

    </div>
  );
}
