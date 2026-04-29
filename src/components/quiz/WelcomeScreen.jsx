import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, CheckCircle, Clock, SkipForward, Target, BookOpen, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { getStudyProgress, resetStudyProgress } from "@/lib/studyProgress";
import { useState } from "react";

const TOTAL = 111;

export default function WelcomeScreen({ onStart, onStartStudy }) {
  const [progress, setProgress] = useState(() => getStudyProgress());
  const seenCount = progress.seenIds.length;
  const remaining = TOTAL - seenCount;
  const isCompleted = seenCount >= TOTAL;

  const handleReset = () => {
    resetStudyProgress();
    setProgress({ seenIds: [] });
  };

  const rules = [
    { icon: Target, text: "30 questões de múltipla escolha" },
    { icon: CheckCircle, text: "Você precisa de 25 acertos para passar" },
    { icon: SkipForward, text: "Você pode pular cada questão uma vez" },
    { icon: Clock, text: "Sem limite de tempo" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto space-y-4"
    >
      {/* Main quiz card */}
      <Card className="border-0 shadow-xl shadow-primary/10 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-primary via-primary/80 to-primary/50" />
        <CardContent className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <Car className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Prova de Direção
            </h1>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">
              Alberta, Canadá — Simulador de Exame Teórico
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {rules.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{text}</span>
              </motion.div>
            ))}
          </div>

          <Button
            onClick={onStart}
            size="lg"
            className="w-full text-base font-semibold h-12"
          >
            Iniciar Prova
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Questões baseadas no Manual do Motorista de Alberta
          </p>
        </CardContent>
      </Card>

      {/* Study All card */}
      <Card className="border-0 shadow-lg shadow-amber-500/10 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400" />
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-base">Modo Estudo Completo</h2>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Percorra todas as 111 questões sem repetir, 30 por vez. O progresso é salvo automaticamente.
              </p>

              {/* Progress bar */}
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">
                    {isCompleted ? "Todas concluídas!" : `${seenCount} de ${TOTAL} questões estudadas`}
                  </span>
                  <span className="font-semibold text-amber-600">
                    {Math.round((seenCount / TOTAL) * 100)}%
                  </span>
                </div>
                <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((seenCount / TOTAL) * 100, 100)}%` }}
                  />
                </div>
                {!isCompleted && seenCount > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Próxima prova: {Math.min(remaining, 30)} questões restantes
                  </p>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  onClick={() => onStartStudy(progress.seenIds)}
                  size="sm"
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold"
                >
                  {isCompleted ? "Recomeçar Ciclo" : seenCount === 0 ? "Iniciar Estudo" : "Continuar Estudo"}
                </Button>
                {seenCount > 0 && (
                  <Button
                    onClick={handleReset}
                    size="sm"
                    variant="outline"
                    className="gap-1.5 text-muted-foreground"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Resetar
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}