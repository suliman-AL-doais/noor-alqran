import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ar from './locales/ar.json';
import en from './locales/en.json';
import tr from './locales/tr.json';
import fr from './locales/fr.json';
import id from './locales/id.json';
import ur from './locales/ur.json';
import es from './locales/es.json';

const resources = {
  ar: { translation: ar },
  en: { translation: en },
  tr: { translation: tr },
  fr: { translation: fr },
  id: { translation: id },
  ur: { translation: ur },
  es: { translation: es }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });

export default i18n;
