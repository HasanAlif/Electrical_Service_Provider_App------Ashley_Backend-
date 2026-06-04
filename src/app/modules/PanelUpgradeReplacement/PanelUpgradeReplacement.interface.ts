import { Document, Types } from 'mongoose';

export type TPanelPropertyType = 'House' | 'Condo' | 'Apartment' | 'Commercial';
export type TPanelOwnershipStatus =
  | 'Owner'
  | 'Tenant'
  | 'Property Manager'
  | 'Other';
export type TPanelTimelineUrgency =
  | 'As soon as possible'
  | 'This week'
  | 'This month'
  | 'Flexible';
export type TPanelServiceType = 'Replacement' | 'Upgrade';
export type TPanelAmperage =
  | '50'
  | '60'
  | '100'
  | '150'
  | '200'
  | '300'
  | '350'
  | '400'
  | 'Unsure';
export type TPanelLocation =
  | 'Basement (Finished)'
  | 'Basement (Unfinished)'
  | 'Garage (Finished)'
  | 'Garage (Unfinished)'
  | 'Other (please specify)';
export type TPowerFeedType = 'Overhead' | 'Underground' | 'Unsure';
export type TPanelStatus =
  | 'draft'
  | 'submitted'
  | 'in_review'
  | 'quoted'
  | 'scheduled'
  | 'completed'
  | 'cancelled';

export interface IPanelUpgradeReplacement extends Document {
  _id: Types.ObjectId;

  serviceType: string;
  createdBy: Types.ObjectId;

  fullName: string;
  phoneNumber: string;
  emailAddress?: string;
  preferredContactMethod: 'Call' | 'Text' | 'Email';

  streetAddress: string;
  apartmentUnit?: string;
  city: string;
  state: string;
  zipCode: string;

  propertyType: TPanelPropertyType;
  ownershipStatus: TPanelOwnershipStatus;
  timelineUrgency: TPanelTimelineUrgency;

  panelServiceType: TPanelServiceType;
  desiredPanelAmperage?: TPanelAmperage;

  currentPanelAmperage: TPanelAmperage;
  powerFeedType: TPowerFeedType;

  panelLocation: TPanelLocation;
  additionalInformation?: string;

  meterPhotos?: string[];
  panelPhotos?: string[];

  status: TPanelStatus;

  createdAt: Date;
  updatedAt: Date;
}
