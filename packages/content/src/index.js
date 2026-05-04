export { LANGUAGES, SUPPORTED_LANGUAGE_CODES } from "./languages.js";
export {
  default as QUESTIONS_META,
  TOTAL_QUESTIONS_COUNT,
  getRandomQuestions,
} from "./questions.js";

import enUi from "./locales/en/ui.json";
import enQuestions from "./locales/en/questions.json";
import ptUi from "./locales/pt/ui.json";
import ptQuestions from "./locales/pt/questions.json";
import esUi from "./locales/es/ui.json";
import esQuestions from "./locales/es/questions.json";
import zhUi from "./locales/zh/ui.json";
import zhQuestions from "./locales/zh/questions.json";

export const LOCALES = {
  en: { ui: enUi, questions: enQuestions },
  pt: { ui: ptUi, questions: ptQuestions },
  es: { ui: esUi, questions: esQuestions },
  zh: { ui: zhUi, questions: zhQuestions },
};
