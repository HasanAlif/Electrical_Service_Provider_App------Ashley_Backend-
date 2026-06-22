import { Schema, model, Document } from 'mongoose';

export interface IFAQModel extends Document {
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
}

const FAQSchema = new Schema<IFAQModel>(
  {
    question: {
      type: String,
      trim: true,
      required: [true, 'Question is required!'],
    },
    answer: {
      type: String,
      trim: true,
      required: [true, 'Answer is required!'],
    },
  },
  { timestamps: true, versionKey: false },
);

const FAQModel = model<IFAQModel>('FAQ', FAQSchema);

export default FAQModel;
