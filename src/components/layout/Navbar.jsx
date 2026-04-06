import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { DarkModeToggle } from './DarkModeToggle';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'Appointment', href: '#appointment' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

/* Sticky navigation bar with glass background on scroll, mobile hamburger menu. */
export function Navbar() {
  const scrollY = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isScrolled = scrollY > 40;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-primary-500 transition-transform group-hover:scale-110">
            <path d="M12 2C9.5 2 7.5 3.5 7 6C6.5 8.5 5 10 5 12C5 15.5 6 19 8 21C9 22 10.5 22 12 20C13.5 22 15 22 16 21C18 19 19 15.5 19 12C19 10 17.5 8.5 17 6C16.5 3.5 14.5 2 12 2Z" fill="currentColor" />
          </svg>
          <span className="text-xl font-display font-bold text-gradient">DentaCare</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <DarkModeToggle />
          <a
            href="#appointment"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-cyan-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-shadow"
          >
            Book Now
          </a>
        </div>

        {/* Mobile buttons */}
        <div className="flex md:hidden items-center gap-3">
          <DarkModeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-slate-600 dark:text-slate-300"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-700"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-base font-medium text-slate-700 dark:text-slate-200 hover:text-primary-500 transition-colors border-b border-slate-100 dark:border-slate-800"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#appointment"
                onClick={() => setMobileOpen(false)}
                className="mt-3 text-center bg-gradient-to-r from-primary-500 to-cyan-500 text-white font-semibold px-5 py-3 rounded-xl"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
