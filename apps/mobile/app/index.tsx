import { useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  Pressable,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import Animated, { FadeInLeft, FadeInUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  CheckCircle,
  Clock,
  SkipForward,
  Target,
  BookOpen,
  RotateCcw,
  Lock,
  Crown,
} from "lucide-react-native";
import { TOTAL_QUESTIONS_COUNT } from "@driver-quiz/content";
import { fs, s } from "../src/lib/scale";
import { Card, CardContent } from "../src/components/ui/Card";
import { Button } from "../src/components/ui/Button";
import { LanguageSwitcher } from "../src/components/LanguageSwitcher";
import { Paywall } from "../src/components/Paywall";
import {
  getStudyProgress,
  resetStudyProgress,
} from "../src/lib/studyProgress";
import { usePremium } from "../src/lib/premium";
import { getRemainingToday, DAILY_LIMIT } from "../src/lib/dailyAttempts";

export default function WelcomeScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [seenIds, setSeenIds] = useState<number[]>([]);
  const [remaining, setRemaining] = useState<number>(DAILY_LIMIT);
  const [paywall, setPaywall] = useState<null | "study" | "daily_limit">(null);
  const { isPremium, restore } = usePremium();
  const params = useLocalSearchParams<{ paywall?: string }>();
  const [restoring, setRestoring] = useState(false);

  // The quiz screen redirects here with ?paywall=daily_limit when it turns
  // someone away, so the bounce arrives with an explanation.
  useEffect(() => {
    if (params.paywall === "daily_limit") {
      setPaywall("daily_limit");
      router.setParams({ paywall: undefined });
    }
  }, [params.paywall]);

  const refreshRemaining = useCallback(() => {
    getRemainingToday().then(setRemaining);
  }, []);

  useEffect(() => {
    getStudyProgress().then((p) => setSeenIds(p.seenIds));
    refreshRemaining();
  }, [refreshRemaining]);

  useFocusEffect(
    useCallback(() => {
      getStudyProgress().then((p) => setSeenIds(p.seenIds));
      refreshRemaining();
    }, [refreshRemaining]),
  );

  const seenCount = seenIds.length;
  const studyRemaining = TOTAL_QUESTIONS_COUNT - seenCount;
  const isCompleted = seenCount >= TOTAL_QUESTIONS_COUNT;
  const progressPct = Math.min((seenCount / TOTAL_QUESTIONS_COUNT) * 100, 100);

  const handleReset = async () => {
    await resetStudyProgress();
    setSeenIds([]);
  };

  // Shows the paywall without navigating; the quiz screen enforces the limit
  // for real and is what actually spends the attempt.
  const handleStartQuiz = () => {
    if (!isPremium && remaining <= 0) {
      setPaywall("daily_limit");
      return;
    }
    router.push("/quiz");
  };

  const handleStartStudy = () => {
    if (!isPremium) {
      setPaywall("study");
      return;
    }
    router.push("/study");
  };

  const handleRestore = async () => {
    setRestoring(true);
    const ok = await restore();
    setRestoring(false);
    if (ok) {
      Alert.alert(t("paywall.restore_ok_title"), t("paywall.restore_ok_desc"));
    } else {
      Alert.alert(
        t("paywall.restore_none_title"),
        t("paywall.restore_none_desc"),
      );
    }
  };

  const rules = [
    { icon: Target, text: t("welcome.rule_questions") },
    { icon: CheckCircle, text: t("welcome.rule_passing") },
    { icon: SkipForward, text: t("welcome.rule_skip") },
    { icon: Clock, text: t("welcome.rule_no_time") },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 16,
          paddingHorizontal: 16,
          gap: 16,
        }}
      >
        <LanguageSwitcher />

        <Animated.View entering={FadeInUp.duration(450)}>
          <Card>
            <View className="h-2 bg-brand-700" />
            {isPremium && (
              <View
                className="absolute flex-row items-center bg-amber-100 border border-amber-300 rounded-full px-2 py-1"
                style={{ top: s(12), right: s(12), gap: 4, zIndex: 1 }}
              >
                <Crown size={s(11)} color="#d97706" />
                <Text className="text-amber-700 font-bold" style={{ fontSize: fs(10) }}>
                  {t("welcome.premium_active")}
                </Text>
              </View>
            )}
            <CardContent className="p-8">
              <View className="items-center mb-6">
                <View className="rounded-2xl overflow-hidden mb-4" style={{ width: s(100), height: s(100) }}>
                  <Image
                    source={require("../assets/logo.png")}
                    style={{ width: s(100), height: s(100) }}
                    resizeMode="cover"
                  />
                </View>
                <Text className="font-bold text-gray-900 text-center" style={{ fontSize: fs(28) }}>
                  {t("welcome.title")}
                </Text>
                <Text className="text-gray-500 mt-2 text-center" style={{ fontSize: fs(15) }}>
                  {t("welcome.subtitle")}
                </Text>
              </View>

              <View className="gap-3 mb-6">
                {rules.map(({ icon: Icon, text }, i) => (
                  <Animated.View
                    key={i}
                    entering={FadeInLeft.delay(100 + i * 100).duration(350)}
                    className="flex-row items-center gap-3 p-4 rounded-xl bg-gray-100"
                  >
                    <View className="rounded-lg bg-brand-50 items-center justify-center" style={{ width: s(40), height: s(40) }}>
                      <Icon size={s(20)} color="#1a2e5a" />
                    </View>
                    <Text className="flex-1 font-medium text-gray-800" style={{ fontSize: fs(15) }}>
                      {text}
                    </Text>
                  </Animated.View>
                ))}
              </View>

              {!isPremium && (
                <View className="bg-gray-100 rounded-xl px-3 py-2 mb-3 flex-row items-center justify-center" style={{ gap: 6 }}>
                  <Text className="text-gray-600" style={{ fontSize: fs(13) }}>
                    {remaining > 0
                      ? t("welcome.attempts_remaining", { n: remaining, total: DAILY_LIMIT })
                      : t("welcome.attempts_none")}
                  </Text>
                </View>
              )}

              <Button
                label={
                  !isPremium && remaining <= 0
                    ? t("welcome.daily_limit_cta")
                    : t("welcome.start")
                }
                variant="primary"
                size="lg"
                onPress={handleStartQuiz}
              />

              <Text className="text-center text-gray-500 mt-4" style={{ fontSize: fs(13) }}>
                {t("welcome.footer")}
              </Text>
            </CardContent>
          </Card>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(150).duration(450)}>
          <Card>
            <View className="h-2 bg-amber-400" />
            <CardContent className="p-5">
              <View className="flex-row gap-4">
                <View className="rounded-xl bg-amber-100 items-center justify-center" style={{ width: s(48), height: s(48) }}>
                  <BookOpen size={s(24)} color="#d97706" />
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center" style={{ gap: 6 }}>
                    <Text className="font-bold text-gray-900" style={{ fontSize: fs(17) }}>
                      {t("welcome.study_title")}
                    </Text>
                    {!isPremium && (
                      <View className="bg-amber-100 rounded-full px-2 py-0.5 flex-row items-center" style={{ gap: 3 }}>
                        <Crown size={s(11)} color="#d97706" />
                        <Text className="text-amber-700 font-bold" style={{ fontSize: fs(10) }}>
                          {t("welcome.premium_badge")}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text className="text-gray-500 mt-1" style={{ fontSize: fs(13), lineHeight: fs(20) }}>
                    {t("welcome.study_desc", { total: TOTAL_QUESTIONS_COUNT })}
                  </Text>

                  <View className="mt-3">
                    <View className="flex-row justify-between mb-1">
                      <Text className="text-gray-500 flex-1" style={{ fontSize: fs(13) }}>
                        {isCompleted
                          ? t("welcome.study_completed")
                          : t("welcome.study_progress", {
                              seen: seenCount,
                              total: TOTAL_QUESTIONS_COUNT,
                            })}
                      </Text>
                      <Text className="font-semibold text-amber-600" style={{ fontSize: fs(13) }}>
                        {Math.round(progressPct)}%
                      </Text>
                    </View>
                    <View className="h-2 bg-amber-100 rounded-full overflow-hidden">
                      <View
                        className="h-full bg-amber-400"
                        style={{ width: `${progressPct}%` }}
                      />
                    </View>
                    {!isCompleted && seenCount > 0 && (
                      <Text className="text-gray-500 mt-1" style={{ fontSize: fs(13) }}>
                        {t("welcome.study_next", {
                          n: Math.min(studyRemaining, 30),
                        })}
                      </Text>
                    )}
                  </View>

                  <View className="flex-row gap-2 mt-4">
                    <View className="flex-1">
                      <Pressable
                        onPress={handleStartStudy}
                        className="bg-amber-500 active:bg-amber-600 rounded-xl px-4 py-3.5 flex-row items-center justify-center"
                        style={{ gap: 6 }}
                      >
                        {!isPremium && <Lock size={s(15)} color="#fff" />}
                        <Text className="text-white font-semibold" style={{ fontSize: fs(15) }}>
                          {!isPremium
                            ? t("welcome.study_unlock")
                            : isCompleted
                              ? t("welcome.study_restart")
                              : seenCount === 0
                                ? t("welcome.study_start")
                                : t("welcome.study_continue")}
                        </Text>
                      </Pressable>
                    </View>
                    {seenCount > 0 && isPremium && (
                      <Pressable
                        onPress={handleReset}
                        className="border border-gray-300 active:bg-gray-100 rounded-xl px-4 py-3.5 flex-row items-center gap-1.5"
                      >
                        <RotateCcw size={s(16)} color="#6b7280" />
                        <Text className="text-gray-700 font-semibold" style={{ fontSize: fs(15) }}>
                          {t("welcome.reset")}
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </View>
            </CardContent>
          </Card>
        </Animated.View>

        {/* Stores require restoring a purchase to be reachable without first
            hitting a paywall — a returning subscriber must not have to spend
            attempts to get their access back. */}
        {!isPremium && (
          <Pressable
            onPress={handleRestore}
            disabled={restoring}
            className="items-center"
            style={{ paddingVertical: 8 }}
          >
            {restoring ? (
              <ActivityIndicator color="#6b7280" />
            ) : (
              <Text className="text-gray-500" style={{ fontSize: fs(13) }}>
                {t("paywall.restore")}
              </Text>
            )}
          </Pressable>
        )}
      </ScrollView>

      <Paywall
        visible={paywall !== null}
        onClose={() => setPaywall(null)}
        reason={paywall ?? undefined}
      />
    </View>
  );
}
