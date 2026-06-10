import { z } from 'zod';

export const AddressValidation = {
  addressIdParamsSchema: z.object({
    params: z.object({
      id: z.string({ error: 'Address ID is required!' }).min(1),
    }),
  }),

  updateAddressSchema: z.object({
    params: z.object({
      id: z.string({ error: 'Address ID is required!' }).min(1),
    }),
    body: z
      .object({
        addressName: z.string().optional(),
        streetAddress: z.string().optional(),
        apartmentUnit: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        zipCode: z.string().optional(),
        isDefault: z.boolean().optional(),
      })
      .refine(
        data =>
          Object.values(data).some(
            value => value !== undefined && value !== null,
          ),
        {
          message: 'At least one field is required to update!',
        },
      ),
  }),
};
