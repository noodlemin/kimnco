import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import kr from './locales/kr.json';

i18n
  .use(LanguageDetector) // Detect language from browser or user settings
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources: {
      kr: { translation: kr },
      en: { translation: en },
    },
    lng: 'kr',
    fallbackLng: 'en', // use English if detected language is not available
    debug: true, // set to false in production
    interpolation: {
      escapeValue: false, // react handles XSS protection
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
  });
export default i18n;