import { z } from 'zod';

const serviceCallStatusValues = [
  'draft',
  'submitted',
  'in_review',
  'quoted',
  'scheduled',
  'completed',
  'cancelled',
] as const;

export const ServiceCallValidation = {
  createServiceCallSchema: z.object({
    body: z.object({
      serviceType: z.string().optional(),

      fullName: z.string({ error: 'Full name is required!' }).min(1),
      phoneNumber: z.string({ error: 'Phone number is required!' }).min(1),
      emailAddress: z.string().email('Invalid email format!').optional(),
      preferredContactMethod: z.enum(['Call', 'Text', 'Email']).optional(),

      streetAddress: z.string({ error: 'Street address is required!' }).min(1),
      apartmentUnit: z.string().optional(),
      city: z.string({ error: 'City is required!' }).min(1),
      state: z.string({ error: 'State is required!' }).min(1),
      zipCode: z.string({ error: 'ZIP code is required!' }).min(1),

      propertyType: z.enum(['House', 'Condo', 'Apartment', 'Commercial']),
      ownershipStatus: z.enum(['Owner', 'Tenant', 'Property Manager', 'Other']),
      timelineUrgency: z.enum([
        'As soon as possible',
        'This week',
        'This month',
        'Flexible',
      ]),

      issueDescription: z
        .string({ error: 'Issue description is required!' })
        .min(1),
      preferredTime: z.enum(['AM (8-11)', 'PM (12-2)', 'Anytime']).optional(),
      schedulingPreference: z.array(z.string()).optional(),

      installationLocation: z.string().optional(),
      chargerOwnership: z.string().optional(),
      chargerLevel: z.string().optional(),
      panelLocation: z.string().optional(),
      distance: z.string().optional(),
      environment: z.string().optional(),
      accessibility: z.string().optional(),

      quickTags: z.array(z.string()).optional(),
      photos: z.array(z.string()).optional(),
      notes: z.string().optional(),
    }),
  }),

  serviceCallIdParamsSchema: z.object({
    params: z.object({
      id: z.string({ error: 'Service call ID is required!' }).min(1),
    }),
  }),

  updateServiceCallStatusSchema: z.object({
    params: z.object({
      id: z.string({ error: 'Service call ID is required!' }).min(1),
    }),
    body: z.object({
      status: z.enum(serviceCallStatusValues),
    }),
  }),
};
