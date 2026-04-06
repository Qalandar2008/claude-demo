import { useState, useEffect } from 'react';

/* Dark mode toggle persisted in localStorage with system-preference fallback. */
export function useDarkMode(key = 'darkMode') {
  const [isDark, setIsDark] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) return stored === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    try { localStorage.setItem(key, String(isDark)); } catch {}
  }, [isDark]);

  return [isDark, () => setIsDark((prev) => !prev)];
}
