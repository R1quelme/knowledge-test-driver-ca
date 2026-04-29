import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SkipForward, CheckCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const LETTERS = ["A", "B", "C", "D"];

export default function QuestionCard({ question, canSkip, onAnswer, onSkip }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (index) => {
    if (revealed) return;
    setSelected(index);
    setRevealed(true);

    setTimeout(() => {
      onAnswer(index);
      setSelected(null);
      setRevealed(false);
    }, 1200);
  };

  const isCorrect = selected === question.correct;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Card className="border-0 shadow-lg shadow-primary/5 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-primary via-primary/70 to-primary/40" />
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-semibold leading-relaxed text-foreground mb-4">
              {question.question}
            </h2>

            {question.image && (
              <div className="mb-8 flex justify-center">
                <img
                  src={question.image}
                  alt="Sinal de trânsito"
                  className="max-h-48 object-contain"
                />
              </div>
            )}

            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isThis = selected === index;
                const isCorrectAnswer = index === question.correct;

                let stateClass = "border-border hover:border-primary/40 hover:bg-accent/50 cursor-pointer";
                if (revealed) {
                  if (isCorrectAnswer) {
                    stateClass = "border-green-400 bg-green-50 ring-1 ring-green-200";
                  } else if (isThis && !isCorrect) {
                    stateClass = "border-red-400 bg-red-50 ring-1 ring-red-200";
                  } else {
                    stateClass = "border-border opacity-50 cursor-default";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleSelect(index)}
                    disabled={revealed}
                    className={cn(
                      "w-full flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left",
                      stateClass
                    )}
                  >
                    <span className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-200",
                      revealed && isCorrectAnswer
                        ? "bg-green-500 text-white"
                        : revealed && isThis && !isCorrect
                          ? "bg-red-500 text-white"
                          : "bg-secondary text-muted-foreground"
                    )}>
                      {revealed && isCorrectAnswer ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : revealed && isThis && !isCorrect ? (
                        <XCircle className="w-4 h-4" />
                      ) : (
                        LETTERS[index]
                      )}
                    </span>
                    <span className="text-sm sm:text-base leading-relaxed pt-0.5">
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>

            {canSkip && !revealed && (
              <div className="mt-6 flex justify-end">
                <Button
                  variant="ghost"
                  onClick={onSkip}
                  className="text-muted-foreground hover:text-foreground gap-2"
                >
                  <SkipForward className="w-4 h-4" />
                  Pular
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}