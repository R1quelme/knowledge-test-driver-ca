import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "daily_quiz_attempts";
export const DAILY_LIMIT = 2;

type Stored = { date: string; count: number };

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

async function read(): Promise<Stored> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return { date: todayKey(), count: 0 };
    const parsed = JSON.parse(raw) as Stored;
    if (parsed.date !== todayKey()) return { date: todayKey(), count: 0 };
    return parsed;
  } catch {
    return { date: todayKey(), count: 0 };
  }
}

export async function getAttemptsToday(): Promise<number> {
  return (await read()).count;
}

export async function getRemainingToday(): Promise<number> {
  return Math.max(0, DAILY_LIMIT - (await getAttemptsToday()));
}

/**
 * Consumes one of today's attempts. Returns false when the limit is already
 * reached, in which case nothing is written. Checking and writing happen here
 * together so a caller can't observe a stale count between the two.
 */
export async function consumeAttempt(): Promise<boolean> {
  const current = await read();
  if (current.count >= DAILY_LIMIT) return false;
  const next: Stored = { date: current.date, count: current.count + 1 };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return true;
}
