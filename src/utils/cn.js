import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/* Safely merge Tailwind classes so later values win without conflicts. */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
