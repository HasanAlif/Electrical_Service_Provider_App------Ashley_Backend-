import { Document, model, Schema } from 'mongoose';

export interface IPartner extends Document {
  companyName: string;
  category: string;
  phoneNumber: string;
  websiteUrl: string;
  description?: string;
  isVerified: boolean;
  isActive: boolean;
  lastChange?: {
    changeType: 'created' | 'updated';
    fields: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const PartnerSchema = new Schema<IPartner>(
  {
    companyName: {
      type: String,
      trim: true,
      required: [true, 'Partner company name is required!'],
      unique: true,
    },
    category: {
      type: String,
      trim: true,
      required: [true, 'Partner category is required!'],
    },
    description: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    websiteUrl: {
      type: String,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // Tracks the most recent change so the recent-updates feed can describe it.
    lastChange: {
      changeType: { type: String, enum: ['created', 'updated'] },
      fields: { type: [String], default: [] },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const PartnerModel = model<IPartner>('Partner', PartnerSchema);

export default PartnerModel;
