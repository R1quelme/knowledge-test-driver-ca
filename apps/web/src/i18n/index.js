import LanguageDetector from "i18next-browser-languagedetector";
import { createI18n } from "@driver-quiz/content/i18n";

const i18n = createI18n({
  detector: LanguageDetector,
  detection: {
    order: ["localStorage", "navigator"],
    caches: ["localStorage"],
    lookupLocalStorage: "language",
  },
});

export default i18n;
