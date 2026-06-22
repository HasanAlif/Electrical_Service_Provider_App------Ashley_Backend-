import { z } from 'zod';

export const FAQValidation = {
  createSchema: z.object({
    body: z.object({
      question: z.string({ error: 'Question is required!' }).trim().min(1),
      answer: z.string({ error: 'Answer is required!' }).trim().min(1),
    }),
  }),

  updateSchema: z.object({
    params: z.object({
      id: z.string({ error: 'FAQ ID is required!' }).min(1),
    }),
    body: z
      .object({
        question: z.string().trim().min(1).optional(),
        answer: z.string().trim().min(1).optional(),
      })
      .refine(
        data => data.question !== undefined || data.answer !== undefined,
        { message: 'Provide a question or answer to update!' },
      ),
  }),

  idParamsSchema: z.object({
    params: z.object({
      id: z.string({ error: 'FAQ ID is required!' }).min(1),
    }),
  }),
};
