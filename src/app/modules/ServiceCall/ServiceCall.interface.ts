import { Document, Types } from 'mongoose';

export type TServiceCallPreferredContactMethod = 'Call' | 'Text' | 'Email';
export type TServiceCallPropertyType =
  | 'House'
  | 'Condo'
  | 'Apartment'
  | 'Commercial';
export type TServiceCallOwnershipStatus =
  | 'Owner'
  | 'Tenant'
  | 'Property Manager'
  | 'Other';
export type TServiceCallTimelineUrgency =
  | 'As soon as possible'
  | 'This week'
  | 'This month'
  | 'Flexible';
export type TServiceCallPreferredTime = 'AM (8-11)' | 'PM (12-2)' | 'Anytime';
export type TServiceCallStatus =
  | 'draft'
  | 'submitted'
  | 'in_review'
  | 'quoted'
  | 'scheduled'
  | 'completed'
  | 'cancelled';

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

  status: TServiceCallStatus;

  createdAt: Date;
  updatedAt: Date;
}
