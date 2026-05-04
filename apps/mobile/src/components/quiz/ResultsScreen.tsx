import { View, Text, Image, Pressable } from "react-native";
import Animated, {
  FadeInDown,
  FadeIn,
  ZoomIn,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import {
  Trophy,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RotateCcw,
} from "lucide-react-native";
import { fs, s } from "../../lib/scale";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import type { WrongAnswer } from "../../lib/useQuiz";
import { getSignImage } from "../../lib/signImages";

const LETTERS = ["A", "B", "C", "D"];

type WrongItemProps = {
  item: WrongAnswer;
};

function WrongQuestionItem({ item, index }: WrongItemProps & { index: number }) {
  const { t } = useTranslation();
  const text = t(`q${item.question.id}.question`, { ns: "questions" });
  const options = t(`q${item.question.id}.options`, {
    ns: "questions",
    returnObjects: true,
  }) as string[];

  return (
    <Animated.View entering={FadeInDown.delay(index * 60).duration(400)}>
    <Card>
      <CardContent>
        <Text className="font-medium text-gray-900 mb-4" style={{ fontSize: fs(15), lineHeight: fs(23) }}>
          {text}
        </Text>

        {(() => {
          const img = getSignImage(item.question.id);
          return img ? (
            <View className="mb-4 items-center">
              <Image source={img} className="h-32 w-full" resizeMode="contain" />
            </View>
          ) : null;
        })()}

        <View className="gap-2">
          <View className="flex-row items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-200">
            <XCircle size={s(16)} color="#ef4444" />
            <View className="flex-1">
              <Text className="text-red-500 font-medium mb-1" style={{ fontSize: fs(11) }}>
                {t("results.your_answer")}
              </Text>
              <Text className="text-red-700" style={{ fontSize: fs(13) }}>
                {LETTERS[item.userAnswer]}. {options[item.userAnswer]}
              </Text>
            </View>
          </View>

          <View className="flex-row items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
            <CheckCircle size={s(16)} color="#22c55e" />
            <View className="flex-1">
              <Text className="text-green-500 font-medium mb-1" style={{ fontSize: fs(11) }}>
                {t("results.correct_answer")}
              </Text>
              <Text className="text-green-700" style={{ fontSize: fs(13) }}>
                {LETTERS[item.question.correct]}. {options[item.question.correct]}
              </Text>
            </View>
          </View>
        </View>
      </CardContent>
    </Card>
    </Animated.View>
  );
}

type Props = {
  correct: number;
  wrong: number;
  wrongAnswers: WrongAnswer[];
  onRestart: () => void;
};

export function ResultsScreen({ correct, wrong, wrongAnswers, onRestart }: Props) {
  const { t } = useTranslation();
  const total = correct + wrong;
  const passed = correct >= 25;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <Animated.View entering={FadeInDown.duration(500)} className="gap-6">
      <Card>
        <View className={`h-2 ${passed ? "bg-green-500" : "bg-red-500"}`} />
        <CardContent className="p-8 items-center">
          <Animated.View
            entering={ZoomIn.delay(200).duration(450).springify()}
            className={`rounded-full items-center justify-center mb-4 ${
              passed ? "bg-green-100" : "bg-red-100"
            }`}
            style={{ width: s(80), height: s(80) }}
          >
            {passed ? (
              <Trophy size={s(40)} color="#16a34a" />
            ) : (
              <AlertTriangle size={s(40)} color="#dc2626" />
            )}
          </Animated.View>

          <Badge
            tone={passed ? "success" : "danger"}
            label={passed ? t("results.passed") : t("results.failed")}
            className="mb-4"
          />

          <Text className="font-bold text-gray-900 mt-2 mb-2" style={{ fontSize: fs(48) }}>
            {correct}/{total}
          </Text>
          <Text className="text-gray-500 text-center" style={{ fontSize: fs(15) }}>
            {t("results.score", { percentage })}
          </Text>

          <View className="flex-row gap-4 mt-6">
            <View className="bg-green-50 rounded-xl p-4 flex-1 items-center">
              <View className="flex-row items-center gap-1.5">
                <CheckCircle size={s(20)} color="#15803d" />
                <Text className="font-bold text-green-700" style={{ fontSize: fs(22) }}>
                  {correct}
                </Text>
              </View>
              <Text className="text-green-600 mt-1" style={{ fontSize: fs(11) }}>
                {t("results.correct")}
              </Text>
            </View>
            <View className="bg-red-50 rounded-xl p-4 flex-1 items-center">
              <View className="flex-row items-center gap-1.5">
                <XCircle size={s(20)} color="#b91c1c" />
                <Text className="font-bold text-red-700" style={{ fontSize: fs(22) }}>{wrong}</Text>
              </View>
              <Text className="text-red-600 mt-1" style={{ fontSize: fs(11) }}>
                {t("results.wrong")}
              </Text>
            </View>
          </View>

          <View className="w-full mt-8">
            <Pressable
              onPress={onRestart}
              className="flex-row items-center justify-center gap-2 bg-brand-700 active:bg-brand-800 rounded-xl px-6 py-4"
            >
              <RotateCcw size={s(18)} color="#ffffff" />
              <Text className="text-white font-semibold" style={{ fontSize: fs(16) }}>
                {t("results.back_home")}
              </Text>
            </Pressable>
          </View>
        </CardContent>
      </Card>

      {wrongAnswers.length > 0 && (
        <Animated.View entering={FadeIn.delay(300).duration(400)} className="gap-3">
          <Text className="font-bold text-gray-900" style={{ fontSize: fs(19) }}>
            {t("results.wrong_review")}
          </Text>
          {wrongAnswers.map((item, index) => (
            <WrongQuestionItem key={item.question.id} item={item} index={index} />
          ))}
        </Animated.View>
      )}
    </Animated.View>
  );
}
