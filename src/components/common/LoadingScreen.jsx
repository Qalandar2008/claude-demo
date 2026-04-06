import { motion, AnimatePresence } from 'framer-motion';

/* Full-screen loading overlay with animated tooth icon. Auto-dismisses from App.jsx. */
export function LoadingScreen({ onDone }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        onAnimationComplete={onDone}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-slate-950"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" className="text-primary-500">
            <path d="M12 2C9.5 2 7.5 3.5 7 6C6.5 8.5 5 10 5 12C5 15.5 6 19 8 21C9 22 10.5 22 12 20C13.5 22 15 22 16 21C18 19 19 15.5 19 12C19 10 17.5 8.5 17 6C16.5 3.5 14.5 2 12 2Z" fill="currentColor" />
          </svg>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-lg font-display font-semibold text-slate-500 dark:text-slate-400"
        >
          DentaCare
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
