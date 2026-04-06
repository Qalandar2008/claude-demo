import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import { SectionHeading } from '../common/SectionHeading';

/* Auto-advancing testimonial carousel with prev/next controls. */
export function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const next = useCallback(() => setActive((p) => (p + 1) % testimonials.length), []);
  const prev = useCallback(() => setActive((p) => (p - 1 + testimonials.length) % testimonials.length), []);

  /* Auto-advance every 5 seconds. */
  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section id="testimonials" className="section-padding bg-slate-50/50 dark:bg-slate-900/50">
      <div className="container-custom">
        <SectionHeading
          title="What Our Patients Say"
          subtitle="Real reviews from real people who trust us with their smiles."
        />

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="glass p-8 sm:p-10 text-center"
            >
              <Quote size={32} className="text-primary-300 dark:text-primary-700 mx-auto mb-4" />
              <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "{testimonials[active].content}"
              </p>
              <div className="flex justify-center gap-0.5 mt-6">
                {[...Array(testimonials[active].rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
                  {testimonials[active].avatar}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{testimonials[active].name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{testimonials[active].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 w-10 h-10 rounded-full glass flex items-center justify-center hover:shadow-glow transition-shadow" aria-label="Previous testimonial">
            <ChevronLeft size={20} className="text-slate-600 dark:text-slate-300" />
          </button>
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 w-10 h-10 rounded-full glass flex items-center justify-center hover:shadow-glow transition-shadow" aria-label="Next testimonial">
            <ChevronRight size={20} className="text-slate-600 dark:text-slate-300" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === active ? 'bg-primary-500 w-7' : 'bg-slate-300 dark:bg-slate-600'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
