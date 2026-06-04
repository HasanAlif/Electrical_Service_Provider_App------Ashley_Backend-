import { model, Schema } from 'mongoose';
import { IPanelUpgradeReplacement } from './PanelUpgradeReplacement.interface';

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
      enum: ['Call', 'Text', 'Email'],
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
      enum: ['House', 'Condo', 'Apartment', 'Commercial'],
      required: [true, 'Property type is required!'],
    },
    ownershipStatus: {
      type: String,
      enum: ['Owner', 'Tenant', 'Property Manager', 'Other'],
      required: [true, 'Ownership status is required!'],
    },
    timelineUrgency: {
      type: String,
      enum: ['As soon as possible', 'This week', 'This month', 'Flexible'],
      required: [true, 'Timeline/urgency is required!'],
    },
    panelServiceType: {
      type: String,
      enum: ['Replacement', 'Upgrade'],
      required: [true, 'Service type is required!'],
    },
    desiredPanelAmperage: {
      type: String,
      enum: ['50', '60', '100', '150', '200', '300', '350', '400', 'Unsure'],
    },
    currentPanelAmperage: {
      type: String,
      enum: ['50', '60', '100', '150', '200', '300', '350', '400', 'Unsure'],
      required: [true, 'Current panel amperage is required!'],
    },
    panelLocation: {
      type: String,
      enum: [
        'Basement (Finished)',
        'Basement (Unfinished)',
        'Garage (Finished)',
        'Garage (Unfinished)',
        'Other (please specify)',
      ],
      required: [true, 'Panel location is required!'],
    },
    powerFeedType: {
      type: String,
      enum: ['Overhead', 'Underground', 'Unsure'],
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
      enum: [
        'draft',
        'submitted',
        'in_review',
        'quoted',
        'scheduled',
        'completed',
        'cancelled',
      ],
      default: 'submitted',
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
