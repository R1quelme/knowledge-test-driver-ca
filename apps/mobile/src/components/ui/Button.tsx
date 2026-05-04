import { Pressable, Text, type PressableProps } from "react-native";
import { fs } from "../../lib/scale";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type Props = Omit<PressableProps, "children"> & {
  label: string;
  variant?: Variant;
  size?: Size;
  className?: string;
};

const baseByVariant: Record<Variant, string> = {
  primary: "bg-brand-700 active:bg-brand-800",
  secondary: "bg-gray-200 active:bg-gray-300",
  outline: "border border-brand-700 active:bg-brand-50 bg-white",
  ghost: "active:bg-gray-100 bg-transparent",
};

const textByVariant: Record<Variant, string> = {
  primary: "text-white",
  secondary: "text-gray-900",
  outline: "text-brand-700",
  ghost: "text-gray-700",
};

const padBySize: Record<Size, string> = {
  sm: "px-3 py-2",
  md: "px-4 py-3",
  lg: "px-6 py-4",
};

const fontBySize: Record<Size, number> = {
  sm: 13,
  md: 15,
  lg: 17,
};

export function Button({
  label,
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  ...rest
}: Props) {
  return (
    <Pressable
      disabled={disabled}
      className={`rounded-xl items-center justify-center ${baseByVariant[variant]} ${padBySize[size]} ${disabled ? "opacity-50" : ""} ${className}`}
      {...rest}
    >
      <Text className={`font-semibold ${textByVariant[variant]}`} style={{ fontSize: fs(fontBySize[size]) }}>
        {label}
      </Text>
    </Pressable>
  );
}
