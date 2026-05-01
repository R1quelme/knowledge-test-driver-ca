import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ptUi from './locales/pt/ui.json';
import ptQuestions from './locales/pt/questions.json';
import zhUi from './locales/zh/ui.json';
import zhQuestions from './locales/zh/questions.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt',
    supportedLngs: ['pt', 'zh'],
    ns: ['ui', 'questions'],
    defaultNS: 'ui',
    resources: {
      pt: { ui: ptUi, questions: ptQuestions },
      zh: { ui: zhUi, questions: zhQuestions },
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'language',
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
