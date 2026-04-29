import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, SkipForward } from "lucide-react";

export default function QuizHeader({ current, total, correct, wrong, skipped }) {
  const answered = correct + wrong;
  const progress = total > 0 ? (answered / total) * 100 : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
          Questão {current} de {total}
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
        </div>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}