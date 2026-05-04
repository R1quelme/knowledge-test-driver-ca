import { useCallback, useState } from "react";
import {
  QUESTIONS_META as ALL_QUESTIONS,
  getRandomQuestions,
} from "@driver-quiz/content";
import { saveSeenIds } from "./studyProgress";

export type Question = (typeof ALL_QUESTIONS)[number];
export type WrongAnswer = { question: Question; userAnswer: number };

export const TOTAL_QUESTIONS = 30;

export function getStudyBatch(seenIds: number[]): Question[] {
  const seenSet = new Set(seenIds);
  const unseen = ALL_QUESTIONS.filter((q) => !seenSet.has(q.id));
  const pool = unseen.length === 0 ? ALL_QUESTIONS : unseen;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, TOTAL_QUESTIONS);
}

export type Phase = "quiz" | "results";

export function useQuiz(initial: {
  questions: Question[];
  isStudyMode: boolean;
  studyBatchIds: number[];
}) {
  const [phase, setPhase] = useState<Phase>("quiz");
  const [questions] = useState<Question[]>(initial.questions);
  const [queue, setQueue] = useState<number[]>(initial.questions.map((_, i) => i));
  const [skippedSet, setSkippedSet] = useState<Set<number>>(new Set());
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
  const [questionNumber, setQuestionNumber] = useState(1);

  const currentIndex = queue[0];
  const currentQuestion = currentIndex !== undefined ? questions[currentIndex] : undefined;
  const canSkip = currentQuestion ? !skippedSet.has(currentQuestion.id) : false;

  const handleAnswer = useCallback(
    (selectedIndex: number) => {
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
        if (initial.isStudyMode) {
          saveSeenIds(initial.studyBatchIds);
        }
        setPhase("results");
      } else {
        setQueue(newQueue);
      }
    },
    [questions, queue, initial.isStudyMode, initial.studyBatchIds],
  );

  const handleSkip = useCallback(() => {
    const q = questions[queue[0]];
    setSkippedSet((prev) => new Set(prev).add(q.id));
    setQueue([...queue.slice(1), queue[0]]);
  }, [questions, queue]);

  const skippedInQueue = queue.filter((idx) => skippedSet.has(questions[idx]?.id)).length;

  return {
    phase,
    currentQuestion,
    canSkip,
    correctCount,
    wrongCount,
    wrongAnswers,
    questionNumber,
    skippedInQueue,
    total: TOTAL_QUESTIONS,
    handleAnswer,
    handleSkip,
  };
}
