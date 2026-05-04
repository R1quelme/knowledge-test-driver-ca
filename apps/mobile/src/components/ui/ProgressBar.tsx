import { View } from "react-native";

type Props = {
  value: number;
  className?: string;
};

export function ProgressBar({ value, className = "" }: Props) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <View className={`h-2 bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <View
        className="h-full bg-brand-700"
        style={{ width: `${clamped}%` }}
      />
    </View>
  );
}
