/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import { useAzkarNotifications } from './hooks/useAzkarNotifications';
import { useAutoTheme } from './hooks/useAutoTheme';
import { useTranslation } from 'react-i18next';
import Layout from './components/Layout';
import Home from './screens/Home';
import QuranLayout from './screens/Quran/QuranLayout';
import HadithLayout from './screens/Hadith/HadithLayout';
import HadithList from './screens/Hadith/HadithList';
import HadithReader from './screens/Hadith/HadithReader';
import SurahList from './screens/Quran/SurahList';
import SurahReader from './screens/Quran/SurahReader';
import Azkar from './screens/Azkar';
import Tasbeeh from './screens/Tasbeeh';
import Prayer from './screens/Prayer';
import Qibla from './screens/Qibla';
import Khatma from './screens/Khatma';
import Settings from './screens/Settings';
import Reciters from './screens/Reciters';

export default function App() {
  const theme = useStore((state) => state.theme);
  
  // Initialize notifications
  useAzkarNotifications();
  const autoThemeState = useAutoTheme();
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
    const currentLang = i18n.resolvedLanguage || i18n.language;
    document.documentElement.lang = currentLang;
    
    // Remove old font classes
    document.documentElement.classList.remove('font-cairo', 'font-inter', 'font-urdu');
    
    // Add new font class based on language
    if (currentLang.startsWith('ar')) {
      document.documentElement.classList.add('font-cairo');
    } else if (currentLang.startsWith('ur')) {
      document.documentElement.classList.add('font-urdu');
    } else {
      document.documentElement.classList.add('font-inter');
    }
  }, [i18n.language, i18n.resolvedLanguage]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else if (theme === 'auto') {
      if (autoThemeState) {
        root.classList.add(autoThemeState);
      } else {
        // Fallback to system before auto is calculated
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      }
    } else {
      root.classList.add(theme);
    }
  }, [theme, autoThemeState]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="quran" element={<QuranLayout />}>
            <Route index element={<SurahList />} />
            <Route path=":id" element={<SurahReader />} />
          </Route>
          <Route path="azkar" element={<Azkar />} />
          <Route path="hadith" element={<HadithLayout />}>
            <Route index element={<HadithList />} />
            <Route path=":id" element={<HadithReader />} />
          </Route>
          <Route path="tasbeeh" element={<Tasbeeh />} />
          <Route path="prayer" element={<Prayer />} />
          <Route path="qibla" element={<Qibla />} />
          <Route path="khatma" element={<Khatma />} />
          <Route path="settings" element={<Settings />} />
          <Route path="reciters" element={<Reciters />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
