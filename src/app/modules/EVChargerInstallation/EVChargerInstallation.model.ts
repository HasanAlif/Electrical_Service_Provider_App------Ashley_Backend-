import { model, Schema } from 'mongoose';
import { DEFAULT_REQUEST_STATUS, Service_STATUSES } from '../../constants';
import { IEVChargerInstallation } from './EVChargerInstallation.interface';
import {
  EV_CHARGER_CONTACT_METHODS,
  EV_CHARGER_CONNECTION_TYPES,
  EV_CHARGER_DISTANCES,
  EV_CHARGER_INSTALLATION_LOCATIONS,
  EV_CHARGER_OWNERSHIP_STATUSES,
  EV_CHARGER_PANEL_LOCATIONS,
  EV_CHARGER_PROPERTY_TYPES,
  EV_CHARGER_STATUSES,
  EV_CHARGER_TIMELINE_URGENCIES,
} from './EVChargerInstallation.interface';

const evChargerInstallationSchema = new Schema<IEVChargerInstallation>(
  {
    serviceType: {
      type: String,
      trim: true,
      default: 'EV Charger Installation',
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
      enum: EV_CHARGER_CONTACT_METHODS,
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
      enum: EV_CHARGER_PROPERTY_TYPES,
      required: [
        function (this: any) {
          return this.status !== 'draft';
        },
        'Property type is required!',
      ],
    },
    ownershipStatus: {
      type: String,
      enum: EV_CHARGER_OWNERSHIP_STATUSES,
      required: [
        function (this: any) {
          return this.status !== 'draft';
        },
        'Ownership status is required!',
      ],
    },
    timelineUrgency: {
      type: String,
      enum: EV_CHARGER_TIMELINE_URGENCIES,
      required: [
        function (this: any) {
          return this.status !== 'draft';
        },
        'Timeline/urgency is required!',
      ],
    },
    chargerConnectionType: {
      type: String,
      enum: EV_CHARGER_CONNECTION_TYPES,
      required: [
        function (this: any) {
          return this.status !== 'draft';
        },
        'Charger connection type is required!',
      ],
    },
    nemaConfiguration: {
      type: String,
      trim: true,
    },
    chargerProvidedByUser: {
      type: Boolean,
    },
    chargerStatus: {
      type: String,
      enum: EV_CHARGER_STATUSES,
    },
    installationLocation: {
      type: String,
      enum: EV_CHARGER_INSTALLATION_LOCATIONS,
      required: [
        function (this: any) {
          return this.status !== 'draft';
        },
        'Installation location is required!',
      ],
    },
    panelLocation: {
      type: String,
      enum: EV_CHARGER_PANEL_LOCATIONS,
      required: [
        function (this: any) {
          return this.status !== 'draft';
        },
        'Panel location is required!',
      ],
    },
    panelDistance: {
      type: String,
      enum: EV_CHARGER_DISTANCES,
      required: [
        function (this: any) {
          return this.status !== 'draft';
        },
        'Distance is required!',
      ],
    },
    environment: {
      type: String,
      trim: true,
    },
    budget: {
      type: String,
      trim: true,
    },
    accessibility: {
      type: String,
      trim: true,
    },
    schedule: {
      type: String,
      trim: true,
    },
    additionalInformation: {
      type: String,
      trim: true,
    },
    areaPhoto: {
      type: String,
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

const EVChargerInstallationModel = model<IEVChargerInstallation>(
  'EVChargerInstallation',
  evChargerInstallationSchema,
);

export default EVChargerInstallationModel;
