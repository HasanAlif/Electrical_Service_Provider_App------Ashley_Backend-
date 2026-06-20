import { Schema, model, Document } from 'mongoose';

export interface IAdminModel extends Document {
  name: string;
  // add more fields here
}

const AdminSchema = new Schema<IAdminModel>({
  name: { type: String, required: true },
  // add more fields here
});

const AdminModel = model<IAdminModel>('Admin', AdminSchema);

export default AdminModel;
