import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CheckCircle, AlertCircle, Clock, PhoneCall, Mail } from 'lucide-react';
import { appointmentSchema } from '../../utils/formSchema';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';

const serviceOptions = [
  'Teeth Cleaning',
  'Teeth Whitening',
  'Dental Implants',
  'Orthodontics',
  'Oral Surgery',
  'Cosmetic Dentistry',
];

const workingHours = [
  { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
  { day: 'Saturday', hours: '9:00 AM – 4:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
];

/* Appointment booking form with Zod validation, error feedback, and success state. */
export function AppointmentSection() {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', service: '', date: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = appointmentSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => { fieldErrors[err.path[0]] = err.message; });
      setErrors(fieldErrors);
      return;
    }
    setIsSubmitting(true);
    /* Simulate API call. */
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  /* Input style helper. */
  const inputCls = (field) =>
    `w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-slate-800/50 border ${
      errors[field]
        ? 'border-red-400 focus:ring-red-400'
        : 'border-slate-200 dark:border-slate-600 focus:border-primary-400 focus:ring-primary-400'
    } text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50`;

  if (submitted) {
    return (
      <section id="appointment" className="section-padding bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-900/50 dark:to-slate-950">
        <div className="container-custom max-w-xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <CheckCircle size={64} className="text-mint-400 mx-auto mb-6" />
            <h2 className="text-3xl font-display font-bold text-slate-800 dark:text-slate-100 mb-3">Appointment Booked!</h2>
            <p className="text-slate-500 dark:text-slate-400">
              Thank you, {form.fullName}. We will contact you at {form.email} to confirm your appointment on {form.date}.
            </p>
            <Button className="mt-8" onClick={() => { setSubmitted(false); setForm({ fullName: '', email: '', phone: '', service: '', date: '', message: '' }); }}>
              Book Another
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="appointment" className="section-padding bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-900/50 dark:to-slate-950">
      <div className="container-custom">
        <SectionHeading
          title="Book an Appointment"
          subtitle="Schedule your visit in seconds. Fill in the form and our team will confirm your booking shortly."
        />
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 glass p-6 sm:p-8 space-y-5" noValidate>
            {/* Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
              <input id="fullName" name="fullName" value={form.fullName} onChange={handleChange} placeholder="John Doe" className={inputCls('fullName')} />
              <AnimatePresence>{errors.fullName && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.fullName}</motion.p>}</AnimatePresence>
            </div>

            {/* Email + Phone */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@email.com" className={inputCls('email')} />
                <AnimatePresence>{errors.email && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.email}</motion.p>}</AnimatePresence>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone</label>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className={inputCls('phone')} />
                <AnimatePresence>{errors.phone && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.phone}</motion.p>}</AnimatePresence>
              </div>
            </div>

            {/* Service + Date */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Service</label>
                <select id="service" name="service" value={form.service} onChange={handleChange} className={inputCls('service')}>
                  <option value="">Select a service</option>
                  {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <AnimatePresence>{errors.service && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.service}</motion.p>}</AnimatePresence>
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Preferred Date</label>
                <input id="date" name="date" type="date" value={form.date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} className={inputCls('date')} />
                <AnimatePresence>{errors.date && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.date}</motion.p>}</AnimatePresence>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Message (optional)</label>
              <textarea id="message" name="message" rows={3} value={form.message} onChange={handleChange} placeholder="Any additional details…" className={inputCls('message')} />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Submitting…
                </span>
              ) : (
                <>
                  <Calendar size={18} />
                  Confirm Appointment
                </>
              )}
            </Button>
          </form>

          {/* Info sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass p-6">
              <h3 className="font-display font-semibold text-lg text-slate-800 dark:text-slate-100 mb-4">Working Hours</h3>
              <div className="space-y-3">
                {workingHours.map((wh) => (
                  <div key={wh.day} className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">{wh.day}</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{wh.hours}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass p-6 space-y-4">
              <h3 className="font-display font-semibold text-lg text-slate-800 dark:text-slate-100">Contact Us Directly</h3>
              <a href="tel:+15550123456" className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 hover:text-primary-500 transition-colors"><PhoneCall size={16} className="text-primary-500" /> +1 (555) 012-3456</a>
              <a href="mailto:hello@dentacare.com" className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 hover:text-primary-500 transition-colors"><Mail size={16} className="text-primary-500" /> hello@dentacare.com</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
