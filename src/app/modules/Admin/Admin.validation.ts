import { z } from 'zod';

export const AdminValidation = {
  idParamsSchema: z.object({
    params: z.object({
      id: z.string({ error: 'Quote ID is required!' }).min(1),
    }),
  }),
};
