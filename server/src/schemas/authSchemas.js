import z from 'zod';

export const loginSchema = z.object({
    email: z.string().email("Not valid email.").optional(),
    phone: z.string().min(10, "Not valid phone number.").optional(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  }).refine((data) => data.email || data.phone, {
    message: 'Either email or phone is required',
    path: ['email'],
  });
  