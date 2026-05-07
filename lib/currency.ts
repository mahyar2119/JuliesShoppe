"use client";

export function formatTRY(amount: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function withMarkup(price: number, pct = 0.15): number {
  return Math.ceil(price * (1 + pct));
}
