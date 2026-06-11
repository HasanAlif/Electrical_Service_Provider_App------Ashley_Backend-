import { z } from 'zod';
import {
  PANEL_CONTACT_METHODS,
  PANEL_AMPERAGES,
  PANEL_LOCATIONS,
  PANEL_OWNERSHIP_STATUSES,
  PANEL_POWER_FEEDS,
  PANEL_PROPERTY_TYPES,
  PANEL_SERVICE_TYPES,
  PANEL_TIMELINE_URGENCIES,
} from './PanelUpgradeReplacement.interface';
import { Service_STATUSES } from '../../constants';

export const PanelUpgradeReplacementValidation = {
  createSchema: z.object({
    body: z
      .object({
        fullName: z.string({ error: 'Full name is required!' }).min(1),
        phoneNumber: z.string({ error: 'Phone number is required!' }).min(1),
        emailAddress: z.string().email('Invalid email format!').optional(),
        preferredContactMethod: z.enum(PANEL_CONTACT_METHODS).optional(),

        streetAddress: z
          .string({ error: 'Street address is required!' })
          .min(1),
        apartmentUnit: z.string().optional(),
        city: z.string({ error: 'City is required!' }).min(1),
        state: z.string({ error: 'State is required!' }).min(1),
        zipCode: z.string({ error: 'ZIP code is required!' }).min(1),

        propertyType: z.enum(PANEL_PROPERTY_TYPES),
        ownershipStatus: z.enum(PANEL_OWNERSHIP_STATUSES),
        timelineUrgency: z.enum(PANEL_TIMELINE_URGENCIES),

        panelServiceType: z.enum(PANEL_SERVICE_TYPES),
        currentPanelAmperage: z.enum(PANEL_AMPERAGES),
        desiredPanelAmperage: z.enum(PANEL_AMPERAGES).optional(),
        panelLocation: z.enum(PANEL_LOCATIONS),
        powerFeedType: z.enum(PANEL_POWER_FEEDS),

        meterPhotos: z.array(z.string()).optional(),
        panelPhotos: z.array(z.string()).optional(),
        additionalInformation: z.string().optional(),
        status: z.enum(Service_STATUSES).optional(),
        completionPercentage: z.number().optional(),
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
        preferredContactMethod: z.enum(PANEL_CONTACT_METHODS).optional(),

        streetAddress: z.string().optional(),
        apartmentUnit: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        zipCode: z.string().optional(),

        propertyType: z.enum(PANEL_PROPERTY_TYPES).optional(),
        ownershipStatus: z.enum(PANEL_OWNERSHIP_STATUSES).optional(),
        timelineUrgency: z.enum(PANEL_TIMELINE_URGENCIES).optional(),

        panelServiceType: z.enum(PANEL_SERVICE_TYPES).optional(),
        currentPanelAmperage: z.enum(PANEL_AMPERAGES).optional(),
        desiredPanelAmperage: z.enum(PANEL_AMPERAGES).optional(),
        panelLocation: z.enum(PANEL_LOCATIONS).optional(),
        powerFeedType: z.enum(PANEL_POWER_FEEDS).optional(),

        meterPhotos: z.array(z.string()).optional(),
        panelPhotos: z.array(z.string()).optional(),
        additionalInformation: z.string().optional(),
        status: z.enum(Service_STATUSES).optional(),
        completionPercentage: z.number().optional(),
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
