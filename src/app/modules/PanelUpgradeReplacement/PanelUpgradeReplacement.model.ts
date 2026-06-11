import { model, Schema } from 'mongoose';
import {
  PANEL_CONTACT_METHODS,
  IPanelUpgradeReplacement,
  PANEL_AMPERAGES,
  PANEL_LOCATIONS,
  PANEL_OWNERSHIP_STATUSES,
  PANEL_POWER_FEEDS,
  PANEL_PROPERTY_TYPES,
  PANEL_SERVICE_TYPES,
  PANEL_TIMELINE_URGENCIES,
} from './PanelUpgradeReplacement.interface';
import { DEFAULT_REQUEST_STATUS, Service_STATUSES } from '../../constants';

const panelUpgradeReplacementSchema = new Schema<IPanelUpgradeReplacement>(
  {
    serviceType: {
      type: String,
      trim: true,
      default: 'Panel Upgrade / Replacement',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    fullName: {
      type: String,
      trim: true,
      required: [true, 'Full name is required!'],
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: [true, 'Phone number is required!'],
    },
    emailAddress: {
      type: String,
      trim: true,
      lowercase: true,
    },
    preferredContactMethod: {
      type: String,
      enum: PANEL_CONTACT_METHODS,
      default: 'Call',
    },
    streetAddress: {
      type: String,
      trim: true,
      required: [true, 'Street address is required!'],
    },
    apartmentUnit: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
      required: [true, 'City is required!'],
    },
    state: {
      type: String,
      trim: true,
      required: [true, 'State is required!'],
    },
    zipCode: {
      type: String,
      trim: true,
      required: [true, 'ZIP code is required!'],
    },
    propertyType: {
      type: String,
      enum: PANEL_PROPERTY_TYPES,
      required: [true, 'Property type is required!'],
    },
    ownershipStatus: {
      type: String,
      enum: PANEL_OWNERSHIP_STATUSES,
      required: [true, 'Ownership status is required!'],
    },
    timelineUrgency: {
      type: String,
      enum: PANEL_TIMELINE_URGENCIES,
      required: [true, 'Timeline/urgency is required!'],
    },
    panelServiceType: {
      type: String,
      enum: PANEL_SERVICE_TYPES,
      required: [true, 'Service type is required!'],
    },
    desiredPanelAmperage: {
      type: String,
      enum: PANEL_AMPERAGES,
    },
    currentPanelAmperage: {
      type: String,
      enum: PANEL_AMPERAGES,
      required: [true, 'Current panel amperage is required!'],
    },
    panelLocation: {
      type: String,
      enum: PANEL_LOCATIONS,
      required: [true, 'Panel location is required!'],
    },
    powerFeedType: {
      type: String,
      enum: PANEL_POWER_FEEDS,
      required: [true, 'Power feed type is required!'],
    },
    meterPhotos: {
      type: [String],
      default: [],
    },
    panelPhotos: {
      type: [String],
      default: [],
    },
    additionalInformation: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: Service_STATUSES,
      default: DEFAULT_REQUEST_STATUS,
    },
    completionPercentage: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const PanelUpgradeReplacementModel = model<IPanelUpgradeReplacement>(
  'PanelUpgradeReplacement',
  panelUpgradeReplacementSchema,
);

export default PanelUpgradeReplacementModel;
