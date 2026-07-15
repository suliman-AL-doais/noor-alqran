import { useStore } from '../store/useStore';
import { Moon, Sun, Monitor, Type, Vibrate, VibrateOff, PlayCircle, Bell, BellOff, Clock, Sunset, Globe, ArrowLeft, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface Qari {
  identifier: string;
  name: string;
  englishName: string;
  language: string;
}

export default function Settings() {
  const { t, i18n } = useTranslation();

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];
  const { 
    theme, setTheme, 
    quranFontSize, setQuranFontSize, 
    quranFontFamily, setQuranFontFamily, 
    hapticFeedback, setHapticFeedback, 
    qariId, setQariId,
    notificationsEnabled, setNotificationsEnabled,
    morningAzkarTime, setMorningAzkarTime,
    eveningAzkarTime, setEveningAzkarTime
  } = useStore();
  
  const [qaris, setQaris] = useState<Qari[]>([]);
  const [loadingQaris, setLoadingQaris] = useState(true);
  const [showLanguages, setShowLanguages] = useState(false);

  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/edition/format/audio')
      .then(res => res.json())
      .then(data => {
        // Filter out only Arabic reciters, or keep all
        const arabicQaris = data.data.filter((q: Qari) => q.language === 'ar');
        setQaris(arabicQaris);
        setLoadingQaris(false);
      })
      .catch(err => {
        console.error(err);
        setLoadingQaris(false);
      });
  }, []);

  
  if (showLanguages) {
    const isRtl = i18n.dir() === 'rtl';
    return (
      <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-300 pb-10">
        <header className="flex items-center gap-4">
          <button 
            onClick={() => setShowLanguages(false)}
            className="p-2 glass rounded-full hover:bg-white/40 dark:hover:bg-slate-800/40 transition-colors"
          >
            {isRtl ? <ArrowRight size={24} /> : <ArrowLeft size={24} />}
          </button>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{t('settings.language')}</h1>
        </header>

        <div className="glass rounded-3xl p-2 overflow-hidden">
          {languages.map((lang, idx) => {
            const isActive = (i18n.resolvedLanguage || i18n.language).startsWith(lang.code);
            return (
              <button
                key={lang.code}
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                }}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${isActive ? 'bg-primary-500/10 dark:bg-primary-500/20 text-primary-700 dark:text-primary-400' : 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'}`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl leading-none">{lang.flag}</span>
                  <span className="font-bold text-lg">{lang.name}</span>
                </div>
                {isActive && (
                  <div className="w-3 h-3 rounded-full bg-primary-500" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      <header>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{t("settings.title")}</h1>
      </header>

      
      {/* Settings Sections */}
      <div className="space-y-4">
        {/* Language Item */}
        <button
          onClick={() => setShowLanguages(true)}
          className="w-full flex items-center justify-between p-4 glass rounded-2xl hover:bg-white/40 dark:hover:bg-slate-800/40 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl">
              <Globe size={24} />
            </div>
            <div className="text-right">
              <h2 className="font-bold text-slate-800 dark:text-white">{t('settings.language')}</h2>
              <p className="text-sm text-slate-500">{languages.find(l => (i18n.resolvedLanguage || i18n.language).startsWith(l.code))?.name || 'العربية'}</p>
            </div>
          </div>
          <div className="text-slate-400 rotate-180">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </button>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-primary-600 dark:text-primary-400">القراء</h2>
        <div className="glass rounded-2xl p-4 space-y-4">
          <p className="font-medium">اختر القارئ المفضل لديك</p>
          {loadingQaris ? (
            <div className="flex justify-center p-4">
              <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="max-h-64 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {qaris.map(qari => (
                <button
                  key={qari.identifier}
                  onClick={() => setQariId(qari.identifier)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                    qariId === qari.identifier 
                      ? 'bg-primary-50 dark:bg-primary-900/40 border-2 border-primary-500 text-primary-700 dark:text-primary-300' 
                      : 'bg-slate-50 dark:bg-slate-800 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                  }`}
                >
                  <span className="font-amiri font-bold text-lg">{qari.name}</span>
                  {qariId === qari.identifier && <PlayCircle size={20} className="text-primary-500" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-primary-600 dark:text-primary-400">{t("settings.general")}</h2>
        
        <div className="glass rounded-2xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {hapticFeedback ? <Vibrate size={24} className="text-primary-500" /> : <VibrateOff size={24} className="text-slate-400" />}
              <div>
                <p className="font-medium text-slate-800 dark:text-white">{t("settings.haptic")}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t("settings.haptic_desc")}</p>
              </div>
            </div>
            
            <button
              onClick={() => setHapticFeedback(!hapticFeedback)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                hapticFeedback ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-slate-50 transition-transform ${
                  hapticFeedback ? '-translate-x-6' : '-translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-primary-600 dark:text-primary-400">{t('settings.notifications.title')}</h2>
        
        <div className="glass rounded-2xl p-4 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              {notificationsEnabled ? <Bell size={24} className="text-primary-500" /> : <BellOff size={24} className="text-slate-400" />}
              <div>
                <p className="font-medium text-slate-800 dark:text-white">{t('settings.notifications.enable')}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('settings.notifications.desc')}</p>
              </div>
            </div>
            
            <button
              onClick={async () => {
                if (!notificationsEnabled && 'Notification' in window) {
                  const permission = await Notification.requestPermission();
                  if (permission === 'granted') {
                    setNotificationsEnabled(true);
                  } else {
                    alert('يرجى السماح بالإشعارات من إعدادات المتصفح');
                  }
                } else {
                  setNotificationsEnabled(!notificationsEnabled);
                }
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationsEnabled ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-slate-50 transition-transform ${
                  notificationsEnabled ? '-translate-x-6' : '-translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className={`space-y-4 transition-all duration-300 ${notificationsEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-amber-500" />
                <p className="font-medium text-slate-800 dark:text-slate-200">{t('settings.notifications.morning')}</p>
              </div>
              <input 
                type="time" 
                value={morningAzkarTime}
                onChange={(e) => setMorningAzkarTime(e.target.value)}
                className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-slate-800 dark:text-white outline-none focus:border-primary-500 font-mono"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-indigo-500" />
                <p className="font-medium text-slate-800 dark:text-slate-200">{t('settings.notifications.evening')}</p>
              </div>
              <input 
                type="time" 
                value={eveningAzkarTime}
                onChange={(e) => setEveningAzkarTime(e.target.value)}
                className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-slate-800 dark:text-white outline-none focus:border-primary-500 font-mono"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-primary-600 dark:text-primary-400">{t("settings.appearance")}</h2>
        
        <div className="glass rounded-2xl p-4 space-y-4">
          <div className="flex flex-col gap-3">
            <p className="font-medium">{t('settings.appearance_desc')}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'light', icon: Sun, label: t('settings.theme.light') },
                { id: 'dark', icon: Moon, label: t('settings.theme.dark') },
                { id: 'system', icon: Monitor, label: t('settings.theme.system') },
                { id: 'auto', icon: Sunset, label: t('settings.theme.auto') },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as any)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                    theme === t.id
                      ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                      : 'border-transparent bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <t.icon size={24} className="mb-2" />
                  <span className="text-sm font-medium">{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-primary-600 dark:text-primary-400">{t('settings.quran.title')}</h2>
        
        <div className="glass rounded-2xl p-4 space-y-6">
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Type size={20} className="text-slate-500" />
                <p className="font-medium">{t('settings.quran.fontFamily')}</p>
              </div>
            </div>
            <select
              value={quranFontFamily}
              onChange={(e) => setQuranFontFamily(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary-500/50 appearance-none font-medium"
            >
              <option value="Amiri Quran">عثمان طه (Amiri Quran)</option>
              <option value="Scheherazade New">شهرزاد (Scheherazade)</option>
              <option value="Amiri">الأميري (Amiri)</option>
              <option value="sans-serif">النظام (System Default)</option>
            </select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Type size={20} className="text-slate-500" />
                <p className="font-medium">{t('settings.quran.fontSize')}</p>
              </div>
              <span className="text-primary-600 font-bold">{quranFontSize}px</span>
            </div>
            <input
              type="range"
              min="16"
              max="64"
              step="2"
              value={quranFontSize}
              onChange={(e) => setQuranFontSize(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-primary-500"
            />
            <div className="p-4 border rounded-xl mt-4 bg-slate-50 dark:bg-slate-900 overflow-x-auto text-center">
              <p 
                style={{ 
                  fontSize: quranFontSize, 
                  fontFamily: quranFontFamily === 'Amiri Quran' ? '"Amiri Quran", serif' : quranFontFamily === 'Scheherazade New' ? '"Scheherazade New", serif' : quranFontFamily === 'Amiri' ? 'Amiri, serif' : 'sans-serif' 
                }}
                className="text-slate-800 dark:text-slate-200 leading-relaxed"
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
