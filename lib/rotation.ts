// 3-DAY PRODUCT ROTATION — deterministic (same day = same products)
const MS_3_DAYS = 3 * 24 * 60 * 60 * 1000;

export function getRotationEpoch(): number {
  return Math.floor(Date.now() / MS_3_DAYS);
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getRotatedIds(allIds: string[], count: number): string[] {
  const shuffled = seededShuffle(allIds, getRotationEpoch());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function rotationCountdown(): string {
  const ms = MS_3_DAYS - (Date.now() % MS_3_DAYS);
  const days  = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  if (days > 0) return `${days}d ${hours}h`;
  const mins = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${mins}m`;
}
