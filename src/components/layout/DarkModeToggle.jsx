import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '../../hooks/useDarkMode';

/* Sun/Moon toggle that switches the dark mode class on <html>. */
export function DarkModeToggle() {
  const [isDark, toggle] = useDarkMode();

  return (
    <button
      onClick={toggle}
      className="relative w-12 h-7 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"
      aria-label="Toggle dark mode"
    >
      <motion.div
        animate={{ x: isDark ? 20 : 2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="absolute top-0.5 left-0 w-6 h-6 rounded-full bg-white dark:bg-slate-900 shadow flex items-center justify-center"
      >
        {isDark ? (
          <Moon size={14} className="text-cyan-400" />
        ) : (
          <Sun size={14} className="text-amber-500" />
        )}
      </motion.div>
    </button>
  );
}
