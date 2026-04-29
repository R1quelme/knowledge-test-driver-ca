import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, RotateCcw, Trophy, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const LETTERS = ["A", "B", "C", "D"];

export default function ResultsScreen({ correct, wrong, wrongAnswers, onRestart }) {
  const total = correct + wrong;
  const passed = correct >= 25;
  const percentage = Math.round((correct / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Result Card */}
      <Card className={cn(
        "border-0 shadow-xl overflow-hidden",
        passed ? "shadow-green-500/10" : "shadow-red-500/10"
      )}>
        <div className={cn(
          "h-2",
          passed
            ? "bg-gradient-to-r from-green-400 via-green-500 to-emerald-500"
            : "bg-gradient-to-r from-red-400 via-red-500 to-rose-500"
        )} />
        <CardContent className="p-8 sm:p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6",
              passed ? "bg-green-100" : "bg-red-100"
            )}
          >
            {passed ? (
              <Trophy className="w-10 h-10 text-green-600" />
            ) : (
              <AlertTriangle className="w-10 h-10 text-red-600" />
            )}
          </motion.div>

          <Badge className={cn(
            "text-sm px-4 py-1.5 mb-4",
            passed
              ? "bg-green-100 text-green-700 border-green-200"
              : "bg-red-100 text-red-700 border-red-200"
          )}>
            {passed ? "APROVADO" : "REPROVADO"}
          </Badge>

          <h1 className="text-4xl sm:text-5xl font-bold mt-4 mb-2">
            {correct}/{total}
          </h1>
          <p className="text-muted-foreground text-lg">
            {percentage}% de acerto — Mínimo necessário: 25/30
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8 max-w-xs mx-auto">
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span className="text-2xl font-bold">{correct}</span>
              </div>
              <p className="text-xs text-green-600 mt-1">Corretas</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 text-red-700">
                <XCircle className="w-5 h-5" />
                <span className="text-2xl font-bold">{wrong}</span>
              </div>
              <p className="text-xs text-red-600 mt-1">Erradas</p>
            </div>
          </div>

          <Button
            onClick={onRestart}
            size="lg"
            className="mt-8 gap-2 px-8"
          >
            <RotateCcw className="w-4 h-4" />
            Voltar ao Início
          </Button>
        </CardContent>
      </Card>

      {/* Wrong Answers Review */}
      {wrongAnswers.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-500" />
            Questões que você errou
          </h2>

          {wrongAnswers.map((item, idx) => (
            <motion.div
              key={item.question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="border shadow-sm">
                <CardContent className="p-5 sm:p-6">
                  <p className="font-medium text-sm sm:text-base leading-relaxed mb-4">
                    {item.question.question}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-200">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-red-500 font-medium mb-0.5">Sua resposta</p>
                        <p className="text-sm text-red-700">
                          {LETTERS[item.userAnswer]}. {item.question.options[item.userAnswer]}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-green-500 font-medium mb-0.5">Resposta correta</p>
                        <p className="text-sm text-green-700">
                          {LETTERS[item.question.correct]}. {item.question.options[item.question.correct]}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}