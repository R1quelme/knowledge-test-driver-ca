import { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useQuiz, getStudyBatch, type Question } from "../src/lib/useQuiz";
import { getStudyProgress } from "../src/lib/studyProgress";
import { QuizHeader } from "../src/components/quiz/QuizHeader";
import { QuestionCard } from "../src/components/quiz/QuestionCard";
import { ResultsScreen } from "../src/components/quiz/ResultsScreen";
import { usePremium } from "../src/lib/premium";

export default function StudyScreen() {
  const [batch, setBatch] = useState<Question[] | null>(null);
  const { ready, isPremium } = usePremium();

  useEffect(() => {
    if (ready && !isPremium) {
      router.replace("/");
      return;
    }
    getStudyProgress().then((p) => setBatch(getStudyBatch(p.seenIds)));
  }, [ready, isPremium]);

  if (!batch) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-gray-500">…</Text>
      </View>
    );
  }

  return <StudyQuiz batch={batch} onRestart={() => router.replace("/")} />;
}

function StudyQuiz({
  batch,
  onRestart,
}: {
  batch: Question[];
  onRestart: () => void;
}) {
  const insets = useSafeAreaInsets();
  const quiz = useQuiz({
    questions: batch,
    isStudyMode: true,
    studyBatchIds: batch.map((q) => q.id),
  });

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
        keyboardShouldPersistTaps="handled"
      >
        {quiz.phase === "quiz" && quiz.currentQuestion && (
          <View className="gap-4">
            <QuizHeader
              current={quiz.questionNumber}
              total={quiz.total}
              correct={quiz.correctCount}
              wrong={quiz.wrongCount}
              skipped={quiz.skippedInQueue}
              onRestart={onRestart}
            />
            <QuestionCard
              question={quiz.currentQuestion}
              canSkip={quiz.canSkip}
              onAnswer={quiz.handleAnswer}
              onSkip={quiz.handleSkip}
            />
          </View>
        )}

        {quiz.phase === "results" && (
          <ResultsScreen
            correct={quiz.correctCount}
            wrong={quiz.wrongCount}
            wrongAnswers={quiz.wrongAnswers}
            onRestart={onRestart}
          />
        )}
      </ScrollView>
    </View>
  );
}
