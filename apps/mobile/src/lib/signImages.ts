import type { ImageSourcePropType } from "react-native";

const SIGN_IMAGES: Record<number, ImageSourcePropType> = {
  7: require("@driver-quiz/content/assets/signs/7.png"),
  11: require("@driver-quiz/content/assets/signs/11.png"),
  14: require("@driver-quiz/content/assets/signs/14.png"),
  25: require("@driver-quiz/content/assets/signs/25.png"),
  27: require("@driver-quiz/content/assets/signs/27.png"),
  34: require("@driver-quiz/content/assets/signs/34.png"),
  35: require("@driver-quiz/content/assets/signs/35.png"),
  37: require("@driver-quiz/content/assets/signs/37.png"),
  39: require("@driver-quiz/content/assets/signs/39.png"),
  46: require("@driver-quiz/content/assets/signs/46.png"),
  62: require("@driver-quiz/content/assets/signs/62.png"),
  66: require("@driver-quiz/content/assets/signs/66.png"),
  70: require("@driver-quiz/content/assets/signs/70.png"),
  71: require("@driver-quiz/content/assets/signs/71.png"),
  77: require("@driver-quiz/content/assets/signs/77.png"),
  82: require("@driver-quiz/content/assets/signs/82.png"),
  86: require("@driver-quiz/content/assets/signs/86.png"),
  88: require("@driver-quiz/content/assets/signs/88.png"),
  95: require("@driver-quiz/content/assets/signs/95.png"),
  97: require("@driver-quiz/content/assets/signs/97.png"),
  103: require("@driver-quiz/content/assets/signs/103.png"),
  106: require("@driver-quiz/content/assets/signs/106.png"),
  109: require("@driver-quiz/content/assets/signs/109.png"),
};

export function getSignImage(questionId: number): ImageSourcePropType | null {
  return SIGN_IMAGES[questionId] ?? null;
}
