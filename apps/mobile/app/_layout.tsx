import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { I18nextProvider } from "react-i18next";
import type { i18n as I18nType } from "i18next";
import { initI18n } from "../src/i18n";
import { initPurchases } from "../src/lib/premium";
import "../global.css";

export default function RootLayout() {
  const [i18n, setI18n] = useState<I18nType | null>(null);

  useEffect(() => {
    initI18n().then(setI18n);
    initPurchases().catch(() => {});
  }, []);

  if (!i18n) return null;

  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#f9fafb" },
          }}
        />
      </SafeAreaProvider>
    </I18nextProvider>
  );
}
