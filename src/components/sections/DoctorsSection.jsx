import { Star, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { doctors } from '../../data/doctors';
import { SectionHeading } from '../common/SectionHeading';

/* Star rating helper. */
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-600'}
        />
      ))}
      <span className="text-sm font-medium text-slate-600 dark:text-slate-400 ml-1">{rating}</span>
    </div>
  );
}

/* Doctor cards with image, specialty badge, rating, and hover scale. */
export function DoctorsSection() {
  return (
    <section id="doctors" className="section-padding">
      <div className="container-custom">
        <SectionHeading
          title="Meet Our Experts"
          subtitle="Our team of highly skilled dental professionals is dedicated to providing you with the best possible care."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {doctors.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="glass overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-xs font-semibold px-3 py-1.5 rounded-full text-primary-600 dark:text-primary-400">
                  <Calendar size={12} />
                  {doc.experience}
                </span>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-lg font-display font-semibold text-slate-800 dark:text-slate-100">
                  {doc.name}
                </h3>
                <p className="text-sm text-primary-500 dark:text-primary-400 font-medium mt-1">
                  {doc.specialty}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {doc.bio}
                </p>
                <div className="mt-3">
                  <StarRating rating={doc.rating} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
