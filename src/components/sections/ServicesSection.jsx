import { services } from '../../data/services';
import { SectionHeading } from '../common/SectionHeading';
import { GlassCard } from '../common/GlassCard';

/* Services grid: 6 cards with icons, hover lift, staggered reveal. */
export function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-slate-50/50 dark:bg-slate-900/50">
      <div className="container-custom">
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive dental care tailored to your unique needs, from routine check-ups to advanced cosmetic procedures."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <GlassCard key={service.id} delay={i * 0.1}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-cyan-100 dark:from-primary-900/40 dark:to-cyan-900/40 flex items-center justify-center mb-5">
                  <Icon size={26} className="text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-display font-semibold text-slate-800 dark:text-slate-100 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                  {service.description}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
