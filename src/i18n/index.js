import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { SUPPORTED_LANGUAGE_CODES } from './languages';

const uiModules = import.meta.glob('./locales/*/ui.json', { eager: true, import: 'default' });
const questionModules = import.meta.glob('./locales/*/questions.json', { eager: true, import: 'default' });

const resources = SUPPORTED_LANGUAGE_CODES.reduce((acc, code) => {
  acc[code] = {
    ui: uiModules[`./locales/${code}/ui.json`],
    questions: questionModules[`./locales/${code}/questions.json`] || questionModules['./locales/pt/questions.json'],
  };

  return acc;
}, {});

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGUAGE_CODES,
    ns: ['ui', 'questions'],
    defaultNS: 'ui',
    resources,
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'language',
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
