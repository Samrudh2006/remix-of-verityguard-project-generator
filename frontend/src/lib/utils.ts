import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTrustColor(score: number): string {
  if (score >= 75) return 'text-trust-high';
  if (score >= 50) return 'text-trust-medium';
  return 'text-trust-low';
}

export function getTrustBgColor(score: number): string {
  if (score >= 75) return 'bg-trust-high';
  if (score >= 50) return 'bg-trust-medium';
  return 'bg-trust-low';
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}
