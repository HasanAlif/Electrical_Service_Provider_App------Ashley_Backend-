import { Document, Types } from 'mongoose';
import { TServiceStatus } from '../../constants';

export const PANEL_CONTACT_METHODS = ['Call', 'Text', 'Email'] as const;
export type TPanelPreferredContactMethod =
  (typeof PANEL_CONTACT_METHODS)[number];

export const PANEL_PROPERTY_TYPES = [
  'House',
  'Condo',
  'Apartment',
  'Commercial',
] as const;
export type TPanelPropertyType = (typeof PANEL_PROPERTY_TYPES)[number];

export const PANEL_OWNERSHIP_STATUSES = [
  'Owner',
  'Tenant',
  'Property Manager',
  'Other',
] as const;
export type TPanelOwnershipStatus = (typeof PANEL_OWNERSHIP_STATUSES)[number];

export const PANEL_TIMELINE_URGENCIES = [
  'As soon as possible',
  'This week',
  'This month',
  'Flexible',
] as const;
export type TPanelTimelineUrgency = (typeof PANEL_TIMELINE_URGENCIES)[number];

export const PANEL_SERVICE_TYPES = ['Replacement', 'Upgrade'] as const;
export type TPanelServiceType = (typeof PANEL_SERVICE_TYPES)[number];

export const PANEL_AMPERAGES = [
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
export type TPanelAmperage = (typeof PANEL_AMPERAGES)[number];

export const PANEL_LOCATIONS = [
  'Basement (Finished)',
  'Basement (Unfinished)',
  'Garage (Finished)',
  'Garage (Unfinished)',
  'Other (please specify)',
] as const;
export type TPanelLocation = (typeof PANEL_LOCATIONS)[number];

export const PANEL_POWER_FEEDS = ['Overhead', 'Underground', 'Unsure'] as const;
export type TPowerFeedType = (typeof PANEL_POWER_FEEDS)[number];

export interface IPanelUpgradeReplacement extends Document {
  _id: Types.ObjectId;

  serviceType: string;
  createdBy: Types.ObjectId;

  fullName: string;
  phoneNumber: string;
  emailAddress?: string;
  preferredContactMethod: TPanelPreferredContactMethod;

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

  status: TServiceStatus;

  createdAt: Date;
  updatedAt: Date;
}
