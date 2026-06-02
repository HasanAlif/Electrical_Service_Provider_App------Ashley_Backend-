import { model, Schema } from 'mongoose';
import { IServiceCall } from './ServiceCall.interface';

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
    issueDescription: {
      type: String,
      trim: true,
      required: [true, 'Issue description is required!'],
    },
    preferredTime: {
      type: String,
      enum: ['AM (8-11)', 'PM (12-2)', 'Anytime'],
    },
    schedulingPreference: {
      type: [String],
      default: [],
    },
    installationLocation: {
      type: String,
      trim: true,
    },
    chargerOwnership: {
      type: String,
      trim: true,
    },
    chargerLevel: {
      type: String,
      trim: true,
    },
    panelLocation: {
      type: String,
      trim: true,
    },
    distance: {
      type: String,
      trim: true,
    },
    environment: {
      type: String,
      trim: true,
    },
    accessibility: {
      type: String,
      trim: true,
    },
    quickTags: {
      type: [String],
      default: [],
    },
    photos: {
      type: [String],
      default: [],
    },
    notes: {
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

const ServiceCallModel = model<IServiceCall>('ServiceCall', serviceCallSchema);

export default ServiceCallModel;
