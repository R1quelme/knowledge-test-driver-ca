import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CheckCircle, XCircle, SkipForward, RotateCcw } from "lucide-react";

export default function QuizHeader({ current, total, correct, wrong, skipped, onRestart }) {
  const { t } = useTranslation();
  const answered = correct + wrong;
  const progress = total > 0 ? (answered / total) * 100 : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
          {t("header.progress", { current, total })}
        </p>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-1.5 px-3 py-1 border-green-200 bg-green-50 text-green-700">
            <CheckCircle className="w-3.5 h-3.5" />
            {correct}
          </Badge>
          <Badge variant="outline" className="gap-1.5 px-3 py-1 border-red-200 bg-red-50 text-red-700">
            <XCircle className="w-3.5 h-3.5" />
            {wrong}
          </Badge>
          {skipped > 0 && (
            <Badge variant="outline" className="gap-1.5 px-3 py-1 border-amber-200 bg-amber-50 text-amber-700">
              <SkipForward className="w-3.5 h-3.5" />
              {skipped}
            </Badge>
          )}
          {onRestart && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 gap-1.5 text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="w-4 h-4" />
                  {t("header.restart")}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t("dialog.restart_title")}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t("dialog.restart_desc")}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t("dialog.cancel")}</AlertDialogCancel>
                  <AlertDialogAction onClick={onRestart}>{t("dialog.confirm_restart")}</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}
