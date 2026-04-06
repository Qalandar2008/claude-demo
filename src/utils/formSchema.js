import { z } from 'zod';

/* Zod schema for the appointment booking form. */
export const appointmentSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s()-]{7,}$/, 'Invalid phone number'),
  service: z.string().min(1, 'Please select a service'),
  date: z.string().min(1, 'Please select a date'),
  message: z.string().optional(),
});
