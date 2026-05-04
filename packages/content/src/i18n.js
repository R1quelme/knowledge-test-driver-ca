import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { SUPPORTED_LANGUAGE_CODES, LOCALES } from "./index.js";

const resources = SUPPORTED_LANGUAGE_CODES.reduce((acc, code) => {
  acc[code] = {
    ui: LOCALES[code].ui,
    questions: LOCALES[code].questions || LOCALES.pt.questions,
  };
  return acc;
}, {});

export function createI18n({ detector, language, detection } = {}) {
  const instance = i18n.createInstance();
  if (detector) instance.use(detector);
  instance.use(initReactI18next).init({
    lng: language,
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGUAGE_CODES,
    ns: ["ui", "questions"],
    defaultNS: "ui",
    resources,
    detection,
    interpolation: { escapeValue: false },
  });
  return instance;
}
