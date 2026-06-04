import { z } from 'zod';

const statusValues = [
  'draft',
  'submitted',
  'in_review',
  'quoted',
  'scheduled',
  'completed',
  'cancelled',
] as const;

const amperageValues = [
  '50',
  '60',
  '100',
  '150',
  '200',
  '300',
  '350',
  '400',
  'Unsure',
] as const;

export const PanelUpgradeReplacementValidation = {
  createSchema: z.object({
    body: z
      .object({
        fullName: z.string({ error: 'Full name is required!' }).min(1),
        phoneNumber: z.string({ error: 'Phone number is required!' }).min(1),
        emailAddress: z.string().email('Invalid email format!').optional(),
        preferredContactMethod: z.enum(['Call', 'Text', 'Email']).optional(),

        streetAddress: z
          .string({ error: 'Street address is required!' })
          .min(1),
        apartmentUnit: z.string().optional(),
        city: z.string({ error: 'City is required!' }).min(1),
        state: z.string({ error: 'State is required!' }).min(1),
        zipCode: z.string({ error: 'ZIP code is required!' }).min(1),

        propertyType: z.enum(['House', 'Condo', 'Apartment', 'Commercial']),
        ownershipStatus: z.enum([
          'Owner',
          'Tenant',
          'Property Manager',
          'Other',
        ]),
        timelineUrgency: z.enum([
          'As soon as possible',
          'This week',
          'This month',
          'Flexible',
        ]),

        panelServiceType: z.enum(['Replacement', 'Upgrade']),
        currentPanelAmperage: z.enum(amperageValues),
        desiredPanelAmperage: z.enum(amperageValues).optional(),
        panelLocation: z.enum([
          'Basement (Finished)',
          'Basement (Unfinished)',
          'Garage (Finished)',
          'Garage (Unfinished)',
          'Other (please specify)',
        ]),
        powerFeedType: z.enum(['Overhead', 'Underground', 'Unsure']),

        meterPhotos: z.array(z.string()).optional(),
        panelPhotos: z.array(z.string()).optional(),
        additionalInformation: z.string().optional(),
      })
      .superRefine((data, ctx) => {
        if (data.panelServiceType === 'Upgrade' && !data.desiredPanelAmperage) {
          ctx.addIssue({
            code: 'custom',
            path: ['desiredPanelAmperage'],
            message: 'Desired amperage is required for upgrades!',
          });
        }
      }),
  }),

  idParamsSchema: z.object({
    params: z.object({
      id: z.string({ error: 'Panel request ID is required!' }).min(1),
    }),
  }),

  updateSchema: z.object({
    params: z.object({
      id: z.string({ error: 'Panel request ID is required!' }).min(1),
    }),
    body: z
      .object({
        fullName: z.string().optional(),
        phoneNumber: z.string().optional(),
        emailAddress: z.string().email('Invalid email format!').optional(),
        preferredContactMethod: z.enum(['Call', 'Text', 'Email']).optional(),

        streetAddress: z.string().optional(),
        apartmentUnit: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        zipCode: z.string().optional(),

        propertyType: z
          .enum(['House', 'Condo', 'Apartment', 'Commercial'])
          .optional(),
        ownershipStatus: z
          .enum(['Owner', 'Tenant', 'Property Manager', 'Other'])
          .optional(),
        timelineUrgency: z
          .enum(['As soon as possible', 'This week', 'This month', 'Flexible'])
          .optional(),

        panelServiceType: z.enum(['Replacement', 'Upgrade']).optional(),
        currentPanelAmperage: z.enum(amperageValues).optional(),
        desiredPanelAmperage: z.enum(amperageValues).optional(),
        panelLocation: z
          .enum([
            'Basement (Finished)',
            'Basement (Unfinished)',
            'Garage (Finished)',
            'Garage (Unfinished)',
            'Other (please specify)',
          ])
          .optional(),
        powerFeedType: z.enum(['Overhead', 'Underground', 'Unsure']).optional(),

        meterPhotos: z.array(z.string()).optional(),
        panelPhotos: z.array(z.string()).optional(),
        additionalInformation: z.string().optional(),
        status: z.enum(statusValues).optional(),
      })
      .refine(
        data =>
          Object.values(data).some(
            value => value !== undefined && value !== null,
          ),
        { message: 'At least one field is required to update!' },
      )
      .superRefine((data, ctx) => {
        if (data.panelServiceType === 'Upgrade' && !data.desiredPanelAmperage) {
          ctx.addIssue({
            code: 'custom',
            path: ['desiredPanelAmperage'],
            message: 'Desired amperage is required for upgrades!',
          });
        }
      }),
  }),
};
