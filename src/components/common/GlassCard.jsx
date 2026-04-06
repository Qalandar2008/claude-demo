import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

/* Glassmorphism card wrapper with hover lift animation. */
export function GlassCard({ children, className, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(6, 182, 212, 0.15)' }}
      className={cn('glass p-6 lg:p-8 transition-shadow duration-300', className)}
      transition={{ delay, duration: 0.5 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
