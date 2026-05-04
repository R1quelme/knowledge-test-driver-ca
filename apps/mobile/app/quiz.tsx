import { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { getRandomQuestions } from "@driver-quiz/content";
import { useQuiz, TOTAL_QUESTIONS } from "../src/lib/useQuiz";
import { QuizHeader } from "../src/components/quiz/QuizHeader";
import { QuestionCard } from "../src/components/quiz/QuestionCard";
import { ResultsScreen } from "../src/components/quiz/ResultsScreen";

export default function QuizScreen() {
  const insets = useSafeAreaInsets();
  const initialQuestions = useMemo(
    () => getRandomQuestions(TOTAL_QUESTIONS),
    [],
  );

  const quiz = useQuiz({
    questions: initialQuestions,
    isStudyMode: false,
    studyBatchIds: [],
  });

  const goHome = () => router.replace("/");

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
              onRestart={goHome}
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
            onRestart={goHome}
          />
        )}
      </ScrollView>
    </View>
  );
}
