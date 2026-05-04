import { getLocales } from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createI18n } from "@driver-quiz/content/i18n";
import { SUPPORTED_LANGUAGE_CODES } from "@driver-quiz/content";

const STORAGE_KEY = "language";

function pickInitialLanguage(stored: string | null): string {
  if (stored && SUPPORTED_LANGUAGE_CODES.includes(stored)) return stored;
  const deviceCode = getLocales()[0]?.languageCode ?? "en";
  return SUPPORTED_LANGUAGE_CODES.includes(deviceCode) ? deviceCode : "en";
}

export async function initI18n() {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  const language = pickInitialLanguage(stored);
  const instance = createI18n({ language });

  instance.on("languageChanged", (lng) => {
    AsyncStorage.setItem(STORAGE_KEY, lng).catch(() => {});
  });

  return instance;
}
