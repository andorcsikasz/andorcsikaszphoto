import { z } from 'zod';

export const bookingFormSchema = z.object({
  name: z.string().min(2, 'A név legalább 2 karakter hosszú kell legyen'),
  address: z.string().min(5, 'Kérjük, adja meg a pontos címet'),
  phone: z
    .string()
    .regex(/^\+36[0-9]{9}$/, 'A telefonszám formátuma: +36XXXXXXXXX')
    .or(z.string().regex(/^06[0-9]{9}$/, 'A telefonszám formátuma: 06XXXXXXXXX'))
    .transform((val) => {
      // Normalize to +36 format
      if (val.startsWith('06')) {
        return '+36' + val.slice(2);
      }
      return val;
    }),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;

