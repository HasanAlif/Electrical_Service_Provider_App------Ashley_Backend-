import { model, Schema } from 'mongoose';
import {
  IServiceCall,
  SERVICE_CALL_CONTACT_METHODS,
  SERVICE_CALL_OWNERSHIP_STATUSES,
  SERVICE_CALL_PREFERRED_TIMES,
  SERVICE_CALL_PROPERTY_TYPES,
  SERVICE_CALL_TIMELINE_URGENCIES,
} from './ServiceCall.interface';
import { DEFAULT_REQUEST_STATUS, Service_STATUSES } from '../../constants';

const serviceCallSchema = new Schema<IServiceCall>(
  {
    serviceType: {
      type: String,
      trim: true,
      default: 'Service Call',
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
      enum: SERVICE_CALL_CONTACT_METHODS,
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
      enum: SERVICE_CALL_PROPERTY_TYPES,
      required: [true, 'Property type is required!'],
    },
    ownershipStatus: {
      type: String,
      enum: SERVICE_CALL_OWNERSHIP_STATUSES,
      required: [true, 'Ownership status is required!'],
    },
    timelineUrgency: {
      type: String,
      enum: SERVICE_CALL_TIMELINE_URGENCIES,
      required: [true, 'Timeline/urgency is required!'],
    },

    issueDescription: {
      type: String,
      trim: true,
      required: [true, 'Issue description is required!'],
    },
    preferredTime: {
      type: String,
      enum: SERVICE_CALL_PREFERRED_TIMES,
    },
    schedulingPreference: {
      type: [String],
      default: [],
    },

    // installationLocation: {
    //   type: String,
    //   trim: true,
    // },
    // chargerOwnership: {
    //   type: String,
    //   trim: true,
    // },
    // chargerLevel: {
    //   type: String,
    //   trim: true,
    // },
    // panelLocation: {
    //   type: String,
    //   trim: true,
    // },
    // distance: {
    //   type: String,
    //   trim: true,
    // },
    // environment: {
    //   type: String,
    //   trim: true,
    // },
    // accessibility: {
    //   type: String,
    //   trim: true,
    // },

    panelPhotos: {
      type: [String],
      default: [],
    },
    workAreaPhotos: {
      type: [String],
      default: [],
    },
    extraReferencePhotos: {
      type: [String],
      default: [],
    },
    notes: {
      type: String,
      trim: true,
    },
    quickTags: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: Service_STATUSES,
      default: DEFAULT_REQUEST_STATUS,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const ServiceCallModel = model<IServiceCall>('ServiceCall', serviceCallSchema);

export default ServiceCallModel;
