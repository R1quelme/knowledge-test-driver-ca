import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, CheckCircle, Clock, SkipForward, Target, BookOpen, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getStudyProgress, resetStudyProgress } from "@/lib/studyProgress";
import { TOTAL_QUESTIONS_COUNT } from "@/lib/questionsData";
import LanguageSwitcher from "@/components/quiz/LanguageSwitcher";
import { useState } from "react";

export default function WelcomeScreen({ onStart, onStartStudy }) {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(() => getStudyProgress());
  const seenCount = progress.seenIds.length;
  const remaining = TOTAL_QUESTIONS_COUNT - seenCount;
  const isCompleted = seenCount >= TOTAL_QUESTIONS_COUNT;

  const handleReset = () => {
    resetStudyProgress();
    setProgress({ seenIds: [] });
  };

  const rules = [
    { icon: Target, text: t("welcome.rule_questions") },
    { icon: CheckCircle, text: t("welcome.rule_passing") },
    { icon: SkipForward, text: t("welcome.rule_skip") },
    { icon: Clock, text: t("welcome.rule_no_time") },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto space-y-4"
    >
      <LanguageSwitcher className="w-full" />

      <Card className="border-0 shadow-xl shadow-primary/10 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-primary via-primary/80 to-primary/50" />
        <CardContent className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <Car className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {t("welcome.title")}
            </h1>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">
              {t("welcome.subtitle")}
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
            {t("welcome.start")}
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-4">
            {t("welcome.footer")}
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg shadow-amber-500/10 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400" />
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-base">{t("welcome.study_title")}</h2>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {t("welcome.study_desc", { total: TOTAL_QUESTIONS_COUNT })}
              </p>

              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">
                    {isCompleted
                      ? t("welcome.study_completed")
                      : t("welcome.study_progress", { seen: seenCount, total: TOTAL_QUESTIONS_COUNT })}
                  </span>
                  <span className="font-semibold text-amber-600">
                    {Math.round((seenCount / TOTAL_QUESTIONS_COUNT) * 100)}%
                  </span>
                </div>
                <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((seenCount / TOTAL_QUESTIONS_COUNT) * 100, 100)}%` }}
                  />
                </div>
                {!isCompleted && seenCount > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("welcome.study_next", { n: Math.min(remaining, 30) })}
                  </p>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  onClick={() => onStartStudy(progress.seenIds)}
                  size="sm"
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold"
                >
                  {isCompleted
                    ? t("welcome.study_restart")
                    : seenCount === 0
                      ? t("welcome.study_start")
                      : t("welcome.study_continue")}
                </Button>
                {seenCount > 0 && (
                  <Button
                    onClick={handleReset}
                    size="sm"
                    variant="outline"
                    className="gap-1.5 text-muted-foreground"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    {t("welcome.reset")}
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
