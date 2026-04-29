const STORAGE_KEY = "alberta_study_progress";

export function getStudyProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { seenIds: [] };
    return JSON.parse(raw);
  } catch {
    return { seenIds: [] };
  }
}

export function saveSeenIds(ids) {
  try {
    const current = getStudyProgress();
    const merged = [...new Set([...current.seenIds, ...ids])];
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ seenIds: merged }));
  } catch {}
}

export function resetStudyProgress() {
  localStorage.removeItem(STORAGE_KEY);
}