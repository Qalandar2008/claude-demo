import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';

const contactInfo = [
  { icon: MapPin, label: 'Address', value: '123 Smile Avenue, Suite 200\nNew York, NY 10001' },
  { icon: Phone, label: 'Phone', value: '+1 (555) 012-3456', href: 'tel:+15550123456' },
  { icon: Mail, label: 'Email', value: 'hello@dentacare.com', href: 'mailto:hello@dentacare.com' },
  { icon: Clock, label: 'Hours', value: 'Mon–Fri: 8AM – 6PM\nSat: 9AM – 4PM' },
];

/* Contact info cards + embedded map placeholder. */
export function ContactSection() {
  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <SectionHeading
          title="Get in Touch"
          subtitle="Have questions or need directions? Find everything you need to reach us below."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="glass p-6 text-center hover:shadow-glow transition-shadow duration-300">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-primary-100 to-cyan-100 dark:from-primary-900/40 dark:to-cyan-900/40 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">{item.label}</h3>
                {item.href ? (
                  <a href={item.href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors whitespace-pre-line">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400 whitespace-pre-line">{item.value}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Map placeholder */}
        <div className="glass overflow-hidden">
          <iframe
            title="DentaCare Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74076794379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2s123%20Smile%20Ave%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
