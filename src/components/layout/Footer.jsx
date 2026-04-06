import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Heart } from 'lucide-react';

const currentYear = new Date().getFullYear();

const quickLinks = [
  { label: 'About Us', href: '#hero' },
  { label: 'Our Services', href: '#services' },
  { label: 'Meet the Team', href: '#doctors' },
  { label: 'Book Appointment', href: '#appointment' },
];

const serviceLinks = [
  { label: 'Teeth Cleaning', href: '#services' },
  { label: 'Whitening', href: '#services' },
  { label: 'Implants', href: '#services' },
  { label: 'Orthodontics', href: '#services' },
];

/* Site footer with four columns: about, quick links, services, contact. */
export function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 section-padding">
      <div className="container-custom grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
        {/* About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-primary-400">
              <path d="M12 2C9.5 2 7.5 3.5 7 6C6.5 8.5 5 10 5 12C5 15.5 6 19 8 21C9 22 10.5 22 12 20C13.5 22 15 22 16 21C18 19 19 15.5 19 12C19 10 17.5 8.5 17 6C16.5 3.5 14.5 2 12 2Z" fill="currentColor" />
            </svg>
            <span className="text-lg font-display font-bold text-white">DentaCare</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Premium dental care with a gentle touch. We combine the latest technology with compassionate service for the best patient experience.
          </p>
          <div className="flex gap-3 mt-5">
            {[
              { icon: Facebook, href: '#', label: 'Facebook' },
              { icon: Instagram, href: '#', label: 'Instagram' },
              { icon: Twitter, href: '#', label: 'Twitter' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-primary-500 flex items-center justify-center transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm hover:text-primary-400 transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold mb-4">Services</h4>
          <ul className="space-y-2">
            {serviceLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm hover:text-primary-400 transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm">
              <MapPin size={18} className="text-primary-400 shrink-0 mt-0.5" />
              <span>123 Smile Avenue, Suite 200<br />New York, NY 10001</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <Phone size={18} className="text-primary-400 shrink-0" />
              <a href="tel:+15550123" className="hover:text-primary-400 transition-colors">+1 (555) 012-3456</a>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <Mail size={18} className="text-primary-400 shrink-0" />
              <a href="mailto:hello@dentacare.com" className="hover:text-primary-400 transition-colors">hello@dentacare.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container-custom mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
        <p>© {currentYear} DentaCare. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Made with <Heart size={14} className="text-red-400" /> for healthy smiles
        </p>
      </div>
    </footer>
  );
}
