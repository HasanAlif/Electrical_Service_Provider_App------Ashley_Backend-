import httpStatus from 'http-status';
import { Request } from 'express';
import {
  AppError,
  uploadServiceImages,
  collectImageUrls,
  deleteServiceImages,
  sanitizeServiceCreatePayload,
} from '../../utils';
import { TImageFieldConfig } from '../../utils/serviceImages';
import { INewConstruction } from './NewConstruction.interface';
import NewConstructionModel from './NewConstruction.model';
import { DEFAULT_REQUEST_STATUS } from '../../constants';
import { IUser } from '../User/user.interface';

const IMAGE_FIELDS: TImageFieldConfig[] = [
  { name: 'photosOfBuildingPlans', multiple: true },
];
const IMAGE_FIELD_NAMES = IMAGE_FIELDS.map(field => field.name);

const createNewConstructionIntoDB = async (
  user: IUser,
  payload: Partial<INewConstruction>,
  files: Request['files'],
) => {
  const safePayload = sanitizeServiceCreatePayload(payload);
  const uploaded = await uploadServiceImages(files, IMAGE_FIELDS);

  const newDoc = await NewConstructionModel.create({
    ...safePayload,
    ...uploaded,
    createdBy: user._id.toString(),
    serviceType: 'New Construction',
    status: safePayload.status ?? DEFAULT_REQUEST_STATUS,
  });

  const { createdAt, updatedAt, ...sanitizedData } = newDoc.toObject();
  return sanitizedData;
};

const getAllNewConstructionsFromDB = async () => {
  return await NewConstructionModel.find()
    .sort({ createdAt: -1 })
    .select('-createdAt -updatedAt');
};

const getMyAllNewConstructionsFromDB = async (userId: string) => {
  return await NewConstructionModel.find({ createdBy: userId })
    .sort({ createdAt: -1 })
    .select('-createdAt -updatedAt');
};

const getSingleNewConstructionFromDB = async (userId: string, id: string) => {
  const data = await NewConstructionModel.findOne({
    _id: id,
    createdBy: userId,
  }).select('-createdAt -updatedAt');

  if (!data) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'New construction request not found!',
    );
  }

  return data;
};

const updateSingleNewConstructionIntoDB = async (
  userId: string,
  id: string,
  payload: Partial<INewConstruction>,
  files: Request['files'],
) => {
  const existing = await NewConstructionModel.findOne({
    _id: id,
    createdBy: userId,
  });

  if (!existing) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'New construction request not found!',
    );
  }

  const uploaded = await uploadServiceImages(files, IMAGE_FIELDS);

  if (Object.keys(payload).length === 0 && Object.keys(uploaded).length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Nothing to update!');
  }

  const oldUrls = collectImageUrls(existing.toObject(), Object.keys(uploaded));

  Object.assign(existing, payload, uploaded);
  const updated = await existing.save();

  if (oldUrls.length) await deleteServiceImages(oldUrls);

  const { createdAt, updatedAt, ...sanitizedData } = updated.toObject();
  return sanitizedData;
};

const deleteSingleNewConstructionFromDB = async (
  userId: string,
  id: string,
) => {
  const doc = await NewConstructionModel.findOne({
    _id: id,
    createdBy: userId,
  });

  if (!doc) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'New construction request not found!',
    );
  }

  const urls = collectImageUrls(doc.toObject(), IMAGE_FIELD_NAMES);
  await doc.deleteOne();
  if (urls.length) await deleteServiceImages(urls);

  const { createdAt, updatedAt, ...sanitizedData } = doc.toObject();
  return sanitizedData;
};

export const NewConstructionService = {
  createNewConstructionIntoDB,
  getAllNewConstructionsFromDB,
  getMyAllNewConstructionsFromDB,
  getSingleNewConstructionFromDB,
  updateSingleNewConstructionIntoDB,
  deleteSingleNewConstructionFromDB,
};
