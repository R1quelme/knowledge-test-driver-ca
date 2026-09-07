import { useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { X, Check, Crown, Sparkles } from "lucide-react-native";
import type { PurchasesPackage } from "react-native-purchases";
import { fs, s } from "../lib/scale";
import { usePremium, isRevenueCatConfigured } from "../lib/premium";

type Props = {
  visible: boolean;
  onClose: () => void;
  reason?: "study" | "daily_limit";
};

export function Paywall({ visible, onClose, reason }: Props) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { offering, purchase, restore } = usePremium();
  const [busy, setBusy] = useState<"none" | "purchase" | "restore">("none");
  const [selected, setSelected] = useState<"annual" | "monthly">("annual");

  const annualPkg = offering?.annual ?? null;
  const monthlyPkg = offering?.monthly ?? null;

  const handlePurchase = async () => {
    const pkg: PurchasesPackage | null =
      selected === "annual" ? annualPkg : monthlyPkg;
    if (!pkg) {
      Alert.alert(t("paywall.unavailable_title"), t("paywall.unavailable_desc"));
      return;
    }
    setBusy("purchase");
    const result = await purchase(pkg);
    setBusy("none");
    if (result.status === "success") {
      Alert.alert(t("paywall.success_title"), t("paywall.success_desc"), [
        { text: t("paywall.success_cta"), onPress: onClose },
      ]);
    } else if (result.status === "error") {
      Alert.alert(t("paywall.error_title"), t("paywall.error_desc"));
    }
  };

  const handleRestore = async () => {
    setBusy("restore");
    const ok = await restore();
    setBusy("none");
    if (ok) {
      Alert.alert(t("paywall.restore_ok_title"), t("paywall.restore_ok_desc"), [
        { text: t("paywall.success_cta"), onPress: onClose },
      ]);
    } else {
      Alert.alert(t("paywall.restore_none_title"), t("paywall.restore_none_desc"));
    }
  };

  const features = [
    t("paywall.feature_study"),
    t("paywall.feature_unlimited"),
    t("paywall.feature_no_ads"),
    t("paywall.feature_support"),
  ];

  const configured = isRevenueCatConfigured();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white">
        <ScrollView
          contentContainerStyle={{
            paddingTop: insets.top + 8,
            paddingBottom: insets.bottom + 24,
            paddingHorizontal: 20,
            gap: 16,
          }}
        >
          <View className="flex-row justify-end">
            <Pressable
              onPress={onClose}
              className="rounded-full bg-gray-100 active:bg-gray-200"
              style={{ width: s(36), height: s(36), alignItems: "center", justifyContent: "center" }}
            >
              <X size={s(20)} color="#374151" />
            </Pressable>
          </View>

          <View className="items-center" style={{ gap: 8 }}>
            <View
              className="rounded-2xl bg-amber-100 items-center justify-center"
              style={{ width: s(72), height: s(72) }}
            >
              <Crown size={s(40)} color="#d97706" />
            </View>
            <Text className="font-bold text-gray-900 text-center" style={{ fontSize: fs(26) }}>
              {t("paywall.title")}
            </Text>
            {reason && (
              <Text className="text-gray-500 text-center" style={{ fontSize: fs(15) }}>
                {reason === "study"
                  ? t("paywall.reason_study")
                  : t("paywall.reason_daily")}
              </Text>
            )}
          </View>

          <View className="bg-gray-50 rounded-2xl p-5" style={{ gap: 12 }}>
            {features.map((f, i) => (
              <View key={i} className="flex-row items-center" style={{ gap: 10 }}>
                <View
                  className="rounded-full bg-green-100 items-center justify-center"
                  style={{ width: s(24), height: s(24) }}
                >
                  <Check size={s(14)} color="#16a34a" />
                </View>
                <Text className="text-gray-800 flex-1" style={{ fontSize: fs(15) }}>
                  {f}
                </Text>
              </View>
            ))}
          </View>

          <View style={{ gap: 10 }}>
            <PlanOption
              selected={selected === "annual"}
              onPress={() => setSelected("annual")}
              title={t("paywall.annual_title")}
              price={
                annualPkg?.product.priceString ?? t("paywall.price_loading")
              }
              priceSuffix={t("paywall.per_year")}
              badge={t("paywall.best_value")}
              note={t("paywall.annual_note")}
              originalPrice="$83.88"
            />
            <PlanOption
              selected={selected === "monthly"}
              onPress={() => setSelected("monthly")}
              title={t("paywall.monthly_title")}
              price={
                monthlyPkg?.product.priceString ?? t("paywall.price_loading")
              }
              priceSuffix={t("paywall.per_month")}
            />
          </View>

          <Pressable
            disabled={busy !== "none" || !configured}
            onPress={handlePurchase}
            className={`rounded-xl items-center justify-center ${
              busy !== "none" || !configured
                ? "bg-amber-300"
                : "bg-amber-500 active:bg-amber-600"
            }`}
            style={{ paddingVertical: 16 }}
          >
            {busy === "purchase" ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <View className="flex-row items-center" style={{ gap: 6 }}>
                <Sparkles size={s(18)} color="#fff" />
                <Text className="text-white font-bold" style={{ fontSize: fs(17) }}>
                  {selected === "annual"
                    ? t("paywall.cta_trial")
                    : t("paywall.cta_subscribe")}
                </Text>
              </View>
            )}
          </Pressable>

          <Pressable
            disabled={busy !== "none" || !configured}
            onPress={handleRestore}
            className="items-center"
            style={{ paddingVertical: 8 }}
          >
            {busy === "restore" ? (
              <ActivityIndicator color="#6b7280" />
            ) : (
              <Text className="text-gray-600 font-medium" style={{ fontSize: fs(14) }}>
                {t("paywall.restore")}
              </Text>
            )}
          </Pressable>

          <Text className="text-gray-400 text-center" style={{ fontSize: fs(11), lineHeight: fs(16) }}>
            {t("paywall.legal")}
          </Text>

          {!configured && (
            <Text className="text-amber-700 text-center" style={{ fontSize: fs(12) }}>
              {t("paywall.dev_warning")}
            </Text>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

function PlanOption({
  selected,
  onPress,
  title,
  price,
  priceSuffix,
  badge,
  note,
  originalPrice,
}: {
  selected: boolean;
  onPress: () => void;
  title: string;
  price: string;
  priceSuffix: string;
  badge?: string;
  note?: string;
  originalPrice?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-2xl border-2 p-4 ${
        selected ? "border-amber-500 bg-amber-50" : "border-gray-200 bg-white"
      }`}
    >
      {badge && (
        <View
          className="absolute bg-amber-500 rounded-full px-2 py-0.5"
          style={{ top: -8, right: 12 }}
        >
          <Text className="text-white font-bold" style={{ fontSize: fs(10) }}>
            {badge}
          </Text>
        </View>
      )}
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="font-bold text-gray-900" style={{ fontSize: fs(16) }}>
            {title}
          </Text>
          {note && (
            <Text className="text-gray-500 mt-1" style={{ fontSize: fs(12) }}>
              {note}
            </Text>
          )}
        </View>
        <View className="items-end">
          {originalPrice && (
            <Text
              className="text-gray-400 line-through"
              style={{ fontSize: fs(12) }}
            >
              {originalPrice}
            </Text>
          )}
          <Text className="font-bold text-gray-900" style={{ fontSize: fs(18) }}>
            {price}
          </Text>
          <Text className="text-gray-500" style={{ fontSize: fs(11) }}>
            {priceSuffix}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
