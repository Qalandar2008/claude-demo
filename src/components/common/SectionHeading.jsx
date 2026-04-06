import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

/* Animated section heading with optional subtitle. Triggers on scroll-into-view. */
export function SectionHeading({ title, subtitle }) {
  const [ref, isInView] = useInView();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center max-w-2xl mx-auto mb-16"
    >
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gradient mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="mt-4 mx-auto w-16 h-1 bg-gradient-to-r from-primary-400 to-cyan-400 rounded-full" />
    </motion.div>
  );
}
