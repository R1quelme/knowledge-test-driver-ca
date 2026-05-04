import { View, Text, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "@driver-quiz/content";
import { fs } from "../lib/scale";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <View className="flex-row gap-1 rounded-lg border border-gray-200 bg-white p-1">
      {LANGUAGES.map((lang) => {
        const isActive = lang.code === i18n.resolvedLanguage;
        return (
          <Pressable
            key={lang.code}
            onPress={() => i18n.changeLanguage(lang.code)}
            className={`flex-1 rounded-md px-2 py-2.5 ${
              isActive ? "bg-brand-700" : "active:bg-gray-100"
            }`}
          >
            <Text
              className={`text-center font-semibold ${
                isActive ? "text-white" : "text-gray-600"
              }`}
              style={{ fontSize: fs(13) }}
            >
              {lang.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
