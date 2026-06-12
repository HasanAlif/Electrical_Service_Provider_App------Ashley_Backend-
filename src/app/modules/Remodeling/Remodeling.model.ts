import { model, Schema } from 'mongoose';
import { DEFAULT_REQUEST_STATUS, Service_STATUSES } from '../../constants';
import {
  IRemodeling,
  REMODELING_CONTACT_METHODS,
  REMODELING_OWNERSHIP_STATUSES,
  REMODELING_PANEL_LOCATIONS,
  REMODELING_PROPERTY_TYPES,
  REMODELING_TIMELINE_URGENCIES,
} from './Remodeling.interface';

const remodelingSchema = new Schema<IRemodeling>(
  {
    serviceType: {
      type: String,
      trim: true,
      default: 'Remodeling',
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
      required: [
        function (this: any) {
          return this.status !== 'draft';
        },
        'Full name is required!',
      ],
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: [
        function (this: any) {
          return this.status !== 'draft';
        },
        'Phone number is required!',
      ],
    },
    emailAddress: {
      type: String,
      trim: true,
      lowercase: true,
    },
    preferredContactMethod: {
      type: String,
      enum: REMODELING_CONTACT_METHODS,
      default: 'Call',
    },
    streetAddress: {
      type: String,
      trim: true,
      required: [
        function (this: any) {
          return this.status !== 'draft';
        },
        'Street address is required!',
      ],
    },
    apartmentUnit: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
      required: [
        function (this: any) {
          return this.status !== 'draft';
        },
        'City is required!',
      ],
    },
    state: {
      type: String,
      trim: true,
      required: [
        function (this: any) {
          return this.status !== 'draft';
        },
        'State is required!',
      ],
    },
    zipCode: {
      type: String,
      trim: true,
      required: [
        function (this: any) {
          return this.status !== 'draft';
        },
        'ZIP code is required!',
      ],
    },
    propertyType: {
      type: String,
      enum: REMODELING_PROPERTY_TYPES,
      required: [
        function (this: any) {
          return this.status !== 'draft';
        },
        'Property type is required!',
      ],
    },
    ownershipStatus: {
      type: String,
      enum: REMODELING_OWNERSHIP_STATUSES,
      required: [
        function (this: any) {
          return this.status !== 'draft';
        },
        'Ownership status is required!',
      ],
    },
    timelineUrgency: {
      type: String,
      enum: REMODELING_TIMELINE_URGENCIES,
      required: [
        function (this: any) {
          return this.status !== 'draft';
        },
        'Timeline/urgency is required!',
      ],
    },
    panelLocation: {
      type: String,
      enum: REMODELING_PANEL_LOCATIONS,
      required: [
        function (this: any) {
          return this.status !== 'draft';
        },
        'Panel location is required!',
      ],
    },
    remodelingAreas: {
      type: String,
      trim: true,
      required: [
        function (this: any) {
          return this.status !== 'draft';
        },
        'Remodeling area is required!',
      ],
    },
    hasPlansDrawings: {
      type: Boolean,
      required: [
        function (this: any) {
          return this.status !== 'draft';
        },
        'Please choose whether you have plans/drawings!',
      ],
    },
    plansDrawings: {
      type: [String],
      default: [],
    },
    electricalNeeds: {
      type: String,
      trim: true,
      required: [
        function (this: any) {
          return this.status !== 'draft';
        },
        'Electrical needs are required!',
      ],
    },
    permitApplied: {
      type: Boolean,
      required: [
        function (this: any) {
          return this.status !== 'draft';
        },
        'Please choose whether a permit has been applied for!',
      ],
    },
    permitNumber: {
      type: String,
      trim: true,
    },
    additionalInformation: {
      type: String,
      trim: true,
    },
    existingSpacePhotos: {
      type: [String],
      default: [],
    },
    panelPhotos: {
      type: [String],
      default: [],
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

const RemodelingModel = model<IRemodeling>('Remodeling', remodelingSchema);

export default RemodelingModel;
