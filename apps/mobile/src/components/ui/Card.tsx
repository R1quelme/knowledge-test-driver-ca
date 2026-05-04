import { View, type ViewProps } from "react-native";

type Props = ViewProps & {
  className?: string;
};

export function Card({ className = "", children, ...rest }: Props) {
  return (
    <View
      className={`bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden ${className}`}
      {...rest}
    >
      {children}
    </View>
  );
}

export function CardContent({ className = "", children, ...rest }: Props) {
  return (
    <View className={`p-5 ${className}`} {...rest}>
      {children}
    </View>
  );
}
