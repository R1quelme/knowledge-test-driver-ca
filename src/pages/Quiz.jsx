import { useState, useCallback } from "react";
import ALL_QUESTIONS, { getRandomQuestions } from "@/lib/questionsData";
import WelcomeScreen from "@/components/quiz/WelcomeScreen";
import QuestionCard from "@/components/quiz/QuestionCard";
import QuizHeader from "@/components/quiz/QuizHeader";
import ResultsScreen from "@/components/quiz/ResultsScreen";
import { saveSeenIds } from "@/lib/studyProgress";

const TOTAL_QUESTIONS = 30;

function getStudyBatch(seenIds) {
  const seenSet = new Set(seenIds);
  const unseen = ALL_QUESTIONS.filter((q) => !seenSet.has(q.id));

  // If all seen (completed cycle), restart from scratch
  const pool = unseen.length === 0 ? ALL_QUESTIONS : unseen;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, TOTAL_QUESTIONS);
}

export default function Quiz() {
  const [phase, setPhase] = useState("welcome");
  const [questions, setQuestions] = useState([]);
  const [queue, setQueue] = useState([]);
  const [skippedSet, setSkippedSet] = useState(new Set());
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [studyBatchIds, setStudyBatchIds] = useState([]);

  const initQuiz = useCallback((selectedQuestions, studyMode = false, batchIds = []) => {
    setQuestions(selectedQuestions);
    setQueue(selectedQuestions.map((_, i) => i));
    setSkippedSet(new Set());
    setCorrectCount(0);
    setWrongCount(0);
    setWrongAnswers([]);
    setQuestionNumber(1);
    setIsStudyMode(studyMode);
    setStudyBatchIds(batchIds);
    setPhase("quiz");
  }, []);

  const startQuiz = useCallback(() => {
    initQuiz(getRandomQuestions(TOTAL_QUESTIONS), false, []);
  }, [initQuiz]);

  const startStudy = useCallback((seenIds) => {
    const batch = getStudyBatch(seenIds);
    initQuiz(batch, true, batch.map((q) => q.id));
  }, [initQuiz]);

  const currentQueueIndex = queue[0];
  const currentQuestion = questions[currentQueueIndex];
  const canSkip = currentQuestion && !skippedSet.has(currentQuestion.id);

  const handleAnswer = useCallback((selectedIndex) => {
    const q = questions[queue[0]];
    const isCorrect = selectedIndex === q.correct;

    if (isCorrect) {
      setCorrectCount((c) => c + 1);
    } else {
      setWrongCount((c) => c + 1);
      setWrongAnswers((prev) => [...prev, { question: q, userAnswer: selectedIndex }]);
    }

    const newQueue = queue.slice(1);
    setQuestionNumber((n) => n + 1);

    if (newQueue.length === 0) {
      // Save progress if study mode
      if (isStudyMode) {
        saveSeenIds(studyBatchIds);
      }
      setPhase("results");
    } else {
      setQueue(newQueue);
    }
  }, [questions, queue, isStudyMode, studyBatchIds]);

  const handleSkip = useCallback(() => {
    const q = questions[queue[0]];
    setSkippedSet((prev) => new Set(prev).add(q.id));
    const newQueue = [...queue.slice(1), queue[0]];
    setQueue(newQueue);
  }, [questions, queue]);

  const handleRestart = useCallback(() => {
    setPhase("welcome");
  }, []);

  const skippedInQueue = queue.filter((idx) => skippedSet.has(questions[idx]?.id)).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {phase === "welcome" && (
          <WelcomeScreen onStart={startQuiz} onStartStudy={startStudy} />
        )}

        {phase === "quiz" && currentQuestion && (
          <div className="space-y-6">
            <QuizHeader
              current={questionNumber}
              total={TOTAL_QUESTIONS}
              correct={correctCount}
              wrong={wrongCount}
              skipped={skippedInQueue}
              onRestart={handleRestart}
            />
            <QuestionCard
              question={currentQuestion}
              canSkip={canSkip}
              onAnswer={handleAnswer}
              onSkip={handleSkip}
            />
          </div>
        )}

        {phase === "results" && (
          <ResultsScreen
            correct={correctCount}
            wrong={wrongCount}
            wrongAnswers={wrongAnswers}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}
