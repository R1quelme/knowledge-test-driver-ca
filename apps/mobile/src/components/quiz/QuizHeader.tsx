import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { CheckCircle, XCircle, SkipForward, RotateCcw } from "lucide-react-native";
import { Badge } from "../ui/Badge";
import { ProgressBar } from "../ui/ProgressBar";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { fs, s } from "../../lib/scale";

type Props = {
  current: number;
  total: number;
  correct: number;
  wrong: number;
  skipped: number;
  onRestart?: () => void;
};

export function QuizHeader({
  current,
  total,
  correct,
  wrong,
  skipped,
  onRestart,
}: Props) {
  const { t } = useTranslation();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const answered = correct + wrong;
  const progress = total > 0 ? (answered / total) * 100 : 0;

  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between flex-wrap gap-2">
        <Text className="font-semibold uppercase tracking-wide text-gray-500" style={{ fontSize: fs(12) }}>
          {t("header.progress", { current, total })}
        </Text>
        <View className="flex-row items-center gap-2">
          <View className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-full border border-green-200 bg-green-50">
            <CheckCircle size={s(14)} color="#15803d" />
            <Text className="font-semibold text-green-700" style={{ fontSize: fs(13) }}>{correct}</Text>
          </View>
          <View className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-full border border-red-200 bg-red-50">
            <XCircle size={s(14)} color="#b91c1c" />
            <Text className="font-semibold text-red-700" style={{ fontSize: fs(13) }}>{wrong}</Text>
          </View>
          {skipped > 0 && (
            <View className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-200 bg-amber-50">
              <SkipForward size={s(14)} color="#b45309" />
              <Text className="font-semibold text-amber-700" style={{ fontSize: fs(13) }}>
                {skipped}
              </Text>
            </View>
          )}
          {onRestart && (
            <Pressable
              onPress={() => setConfirmOpen(true)}
              className="flex-row items-center gap-1.5 px-2 py-1.5 rounded-md active:bg-gray-100"
            >
              <RotateCcw size={s(16)} color="#6b7280" />
              <Text className="font-medium text-gray-600" style={{ fontSize: fs(13) }}>
                {t("header.restart")}
              </Text>
            </Pressable>
          )}
        </View>
      </View>
      <ProgressBar value={progress} />

      {onRestart && (
        <ConfirmDialog
          visible={confirmOpen}
          title={t("dialog.restart_title")}
          description={t("dialog.restart_desc")}
          cancelLabel={t("dialog.cancel")}
          confirmLabel={t("dialog.confirm_restart")}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => {
            setConfirmOpen(false);
            onRestart();
          }}
        />
      )}
    </View>
  );
}
