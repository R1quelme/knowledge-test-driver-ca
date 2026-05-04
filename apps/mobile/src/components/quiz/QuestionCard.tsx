import { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import {
  CheckCircle,
  XCircle,
  SkipForward,
  ArrowRight,
} from "lucide-react-native";
import { Card, CardContent } from "../ui/Card";
import type { Question } from "../../lib/useQuiz";
import { getSignImage } from "../../lib/signImages";
import { fs, s } from "../../lib/scale";

const LETTERS = ["A", "B", "C", "D"];

type Props = {
  question: Question;
  canSkip: boolean;
  onAnswer: (selectedIndex: number) => void;
  onSkip: () => void;
};

export function QuestionCard({ question, canSkip, onAnswer, onSkip }: Props) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const text = t(`q${question.id}.question`, { ns: "questions" });
  const options = t(`q${question.id}.options`, {
    ns: "questions",
    returnObjects: true,
  }) as string[];

  const handleSelect = (index: number) => {
    if (revealed) return;
    setSelected(index);
    setRevealed(true);
  };

  const handleContinue = () => {
    if (selected === null) return;
    onAnswer(selected);
    setSelected(null);
    setRevealed(false);
  };

  const isCorrect = selected === question.correct;

  return (
    <Animated.View
      key={question.id}
      entering={FadeInRight.duration(280)}
      exiting={FadeOutLeft.duration(200)}
    >
      <Card>
        <View className="h-1 bg-brand-700" />
        <CardContent className="p-6">
          <Text className="font-semibold text-gray-900 mb-4" style={{ fontSize: fs(17), lineHeight: fs(26) }}>
            {text}
          </Text>

          {(() => {
            const img = getSignImage(question.id);
            return img ? (
              <View className="mb-6 items-center">
                <Image
                  source={img}
                  className="h-40 w-full"
                  resizeMode="contain"
                />
              </View>
            ) : null;
          })()}

          <View className="gap-3">
            {options.map((option, index) => {
              const isThis = selected === index;
              const isCorrectAnswer = index === question.correct;

              let optionClass = "border-gray-200 bg-white";
              let letterClass = "bg-gray-100";
              let letterTextClass = "text-gray-700";

              if (revealed) {
                if (isCorrectAnswer) {
                  optionClass = "border-green-400 bg-green-50";
                  letterClass = "bg-green-500";
                  letterTextClass = "text-white";
                } else if (isThis && !isCorrect) {
                  optionClass = "border-red-400 bg-red-50";
                  letterClass = "bg-red-500";
                  letterTextClass = "text-white";
                } else {
                  optionClass = "border-gray-200 bg-white opacity-50";
                }
              }

              const showCheck = revealed && isCorrectAnswer;
              const showX = revealed && isThis && !isCorrect;

              return (
                <Pressable
                  key={index}
                  disabled={revealed}
                  onPress={() => handleSelect(index)}
                  className={`flex-row items-start gap-3 p-4 rounded-xl border-2 ${optionClass}`}
                >
                  <View
                    className={`rounded-lg items-center justify-center ${letterClass}`}
                    style={{ width: s(32), height: s(32) }}
                  >
                    {showCheck ? (
                      <CheckCircle size={s(16)} color="#ffffff" />
                    ) : showX ? (
                      <XCircle size={s(16)} color="#ffffff" />
                    ) : (
                      <Text className={`font-bold ${letterTextClass}`} style={{ fontSize: fs(13) }}>
                        {LETTERS[index]}
                      </Text>
                    )}
                  </View>
                  <Text className="flex-1 text-gray-900" style={{ fontSize: fs(15), lineHeight: fs(23) }}>
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {canSkip && !revealed && (
            <View className="mt-6 flex-row justify-end">
              <Pressable
                onPress={onSkip}
                className="flex-row items-center gap-2 px-3 py-2 rounded-md active:bg-gray-100"
              >
                <SkipForward size={s(16)} color="#6b7280" />
                <Text className="font-medium text-gray-600" style={{ fontSize: fs(13) }}>
                  {t("question.skip")}
                </Text>
              </Pressable>
            </View>
          )}

          {revealed && (
            <View className="mt-6 flex-row justify-end">
              <Pressable
                onPress={handleContinue}
                className="flex-row items-center gap-2 bg-brand-700 active:bg-brand-800 rounded-xl px-6 py-3"
              >
                <Text className="text-white font-semibold" style={{ fontSize: fs(15) }}>
                  {t("question.continue")}
                </Text>
                <ArrowRight size={s(16)} color="#ffffff" />
              </Pressable>
            </View>
          )}
        </CardContent>
      </Card>
    </Animated.View>
  );
}
