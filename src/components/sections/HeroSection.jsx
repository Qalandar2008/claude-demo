import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { ToothScene } from '../three/ToothScene';

const stats = [
  { value: '15+', label: 'Years Experience' },
  { value: '10K+', label: 'Happy Patients' },
  { value: '6', label: 'Expert Dentists' },
];

/* Hero: headline + CTA on the left, 3D tooth canvas on the right, stats bar below. */
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-cyan-200/40 to-primary-200/30 dark:from-cyan-900/20 dark:to-primary-900/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-mint-200/30 to-cyan-200/30 dark:from-mint-900/15 dark:to-cyan-900/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6">
              Trusted by 10,000+ patients
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight">
              Your{' '}
              <span className="text-gradient">Perfect</span>
              <br />
              Smile Starts Here
            </h1>
            <p className="mt-6 text-lg text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
              Experience world-class dental care with cutting-edge technology and a team that genuinely cares about your comfort and confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#appointment">
                Book Appointment
                <ArrowRight size={18} />
              </Button>
              <Button variant="outline" href="#services">
                Our Services
              </Button>
            </div>
          </motion.div>

          {/* 3D Tooth */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ToothScene />
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 lg:mt-20 grid grid-cols-3 gap-6 max-w-2xl"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-display font-bold text-gradient">{stat.value}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
