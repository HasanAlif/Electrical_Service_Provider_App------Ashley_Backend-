import { z } from 'zod';
import { Service_STATUSES } from '../../constants';

export const AdminValidation = {
  idParamsSchema: z.object({
    params: z.object({
      id: z.string({ error: 'Quote ID is required!' }).min(1),
    }),
  }),

  updateQuoteStatusSchema: z.object({
    params: z.object({
      id: z.string({ error: 'Quote ID is required!' }).min(1),
    }),
    body: z
      .object({
        status: z
          .enum(Service_STATUSES)
          .refine(value => value !== Service_STATUSES.DRAFT, {
            message: 'Status cannot be set to draft!',
          })
          .optional(),
        internalNote: z.string().trim().optional(),
      })
      .refine(
        data => data.status !== undefined || data.internalNote !== undefined,
        { message: 'Provide a status or internalNote to update!' },
      ),
  }),
};
