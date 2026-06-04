import { Document, Types } from 'mongoose';
import { TServiceStatus } from '../../constants';

export const SERVICE_CALL_CONTACT_METHODS = ['Call', 'Text', 'Email'] as const;
export type TServiceCallPreferredContactMethod =
  (typeof SERVICE_CALL_CONTACT_METHODS)[number];

export const SERVICE_CALL_PROPERTY_TYPES = [
  'House',
  'Condo',
  'Apartment',
  'Commercial',
] as const;
export type TServiceCallPropertyType =
  (typeof SERVICE_CALL_PROPERTY_TYPES)[number];

export const SERVICE_CALL_OWNERSHIP_STATUSES = [
  'Owner',
  'Tenant',
  'Property Manager',
  'Other',
] as const;
export type TServiceCallOwnershipStatus =
  (typeof SERVICE_CALL_OWNERSHIP_STATUSES)[number];

export const SERVICE_CALL_TIMELINE_URGENCIES = [
  'As soon as possible',
  'This week',
  'This month',
  'Flexible',
] as const;
export type TServiceCallTimelineUrgency =
  (typeof SERVICE_CALL_TIMELINE_URGENCIES)[number];

export const SERVICE_CALL_PREFERRED_TIMES = [
  'AM (8-11)',
  'PM (12-2)',
  'Anytime',
] as const;
export type TServiceCallPreferredTime =
  (typeof SERVICE_CALL_PREFERRED_TIMES)[number];

export interface IServiceCall extends Document {
  _id: Types.ObjectId;

  serviceType: string;
  createdBy: Types.ObjectId;

  fullName: string;
  phoneNumber: string;
  emailAddress?: string;
  preferredContactMethod: TServiceCallPreferredContactMethod;

  streetAddress: string;
  apartmentUnit?: string;
  city: string;
  state: string;
  zipCode: string;

  propertyType: TServiceCallPropertyType;
  ownershipStatus: TServiceCallOwnershipStatus;
  timelineUrgency: TServiceCallTimelineUrgency;

  issueDescription: string;
  preferredTime?: TServiceCallPreferredTime;
  schedulingPreference?: string[];

  installationLocation?: string;
  chargerOwnership?: string;
  chargerLevel?: string;
  panelLocation?: string;
  distance?: string;
  environment?: string;
  accessibility?: string;

  quickTags: string[];
  photos: string[];
  notes?: string;

  status: TServiceStatus;

  createdAt: Date;
  updatedAt: Date;
}
