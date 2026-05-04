import { Dimensions, PixelRatio } from "react-native";

const BASE_WIDTH = 390; // iPhone 14 base (logical points)

const { width } = Dimensions.get("window");

// Scale factor: 1.0 on iPhone 14 (390pt), proportionally less on smaller screens
const scale = width / BASE_WIDTH;

export function s(size: number): number {
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
}

// For font sizes: slightly less aggressive scaling to keep text readable
export function fs(size: number): number {
  const factor = 0.5 + scale * 0.5; // dampened: half linear, half fixed
  return Math.round(PixelRatio.roundToNearestPixel(size * factor));
}
