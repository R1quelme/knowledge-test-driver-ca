import { View, Text, type ViewProps } from "react-native";

type Tone = "neutral" | "success" | "danger" | "warning";

type Props = ViewProps & {
  label: string | number;
  tone?: Tone;
  className?: string;
};

const containerByTone: Record<Tone, string> = {
  neutral: "bg-gray-100 border-gray-200",
  success: "bg-green-50 border-green-200",
  danger: "bg-red-50 border-red-200",
  warning: "bg-amber-50 border-amber-200",
};

const textByTone: Record<Tone, string> = {
  neutral: "text-gray-700",
  success: "text-green-700",
  danger: "text-red-700",
  warning: "text-amber-700",
};

export function Badge({
  label,
  tone = "neutral",
  className = "",
  ...rest
}: Props) {
  return (
    <View
      className={`px-3 py-1 rounded-full border ${containerByTone[tone]} ${className}`}
      {...rest}
    >
      <Text className={`text-xs font-semibold ${textByTone[tone]}`}>
        {label}
      </Text>
    </View>
  );
}
