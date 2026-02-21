const STORAGE_KEY = "snapcut_credits";
const DEFAULT_CREDITS = 5;

export function getCredits(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw == null) return DEFAULT_CREDITS;
    const n = parseInt(raw, 10);
    return Number.isNaN(n) ? DEFAULT_CREDITS : Math.max(0, n);
  } catch {
    return DEFAULT_CREDITS;
  }
}

export function useCredit(): boolean {
  const current = getCredits();
  if (current <= 0) return false;
  localStorage.setItem(STORAGE_KEY, String(current - 1));
  return true;
}

export function setCredits(value: number): void {
  localStorage.setItem(STORAGE_KEY, String(Math.max(0, value)));
}
