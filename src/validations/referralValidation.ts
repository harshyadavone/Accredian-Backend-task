import { z } from 'zod';

export const referralSchema = z.object({
  referrerName: z.string().min(1, 'Referrer name is required'),
  referrerEmail: z.string().email('Invalid email address'),
  refereeName: z.string().min(1, 'Referee name is required'),
  refereeEmail: z.string().email('Invalid email address'),
  course: z.string().min(1, 'Course name is required'),
});

export type ReferralValidation = z.infer<typeof referralSchema>;
