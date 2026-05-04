import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "alberta_study_progress";

export type StudyProgress = { seenIds: number[] };

export async function getStudyProgress(): Promise<StudyProgress> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return { seenIds: [] };
    return JSON.parse(raw) as StudyProgress;
  } catch {
    return { seenIds: [] };
  }
}

export async function saveSeenIds(ids: number[]): Promise<void> {
  try {
    const current = await getStudyProgress();
    const merged = Array.from(new Set([...current.seenIds, ...ids]));
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ seenIds: merged }));
  } catch {}
}

export async function resetStudyProgress(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
