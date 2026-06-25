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
import { ILighting } from './Lighting.interface';
import LightingModel from './Lighting.model';
import { DEFAULT_REQUEST_STATUS } from '../../constants';
import { IUser } from '../User/user.interface';

const IMAGE_FIELDS: TImageFieldConfig[] = [
  { name: 'photosOfWhereWantToInstall', multiple: true },
  { name: 'photosOfCurrentLightFixture', multiple: true },
  { name: 'photosOfNewLightFixture', multiple: true },
  { name: 'photosOfInstallationAreaFloodLight', multiple: true },
  { name: 'photosOfCurrentFloodLight', multiple: true },
  { name: 'photosOfNewFloodLight', multiple: true },
];
const IMAGE_FIELD_NAMES = IMAGE_FIELDS.map(field => field.name);

const createLightingIntoDB = async (
  user: IUser,
  payload: Partial<ILighting>,
  files: Request['files'],
) => {
  const safePayload = sanitizeServiceCreatePayload(payload);
  const uploaded = await uploadServiceImages(files, IMAGE_FIELDS);

  const newDoc = await LightingModel.create({
    ...safePayload,
    ...uploaded,
    createdBy: user._id.toString(),
    serviceType: 'Lighting Installation',
    status: safePayload.status ?? DEFAULT_REQUEST_STATUS,
  });

  const { createdAt, updatedAt, ...sanitizedData } = newDoc.toObject();
  return sanitizedData;
};

const getAllLightingsFromDB = async () => {
  return await LightingModel.find()
    .sort({ createdAt: -1 })
    .select('-createdAt -updatedAt');
};

const getMyAllLightingsFromDB = async (userId: string) => {
  return await LightingModel.find({ createdBy: userId })
    .sort({ createdAt: -1 })
    .select('-createdAt -updatedAt');
};

const getSingleLightingFromDB = async (userId: string, id: string) => {
  const data = await LightingModel.findOne({
    _id: id,
    createdBy: userId,
  }).select('-createdAt -updatedAt');

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Lighting request not found!');
  }

  return data;
};

const updateSingleLightingIntoDB = async (
  userId: string,
  id: string,
  payload: Partial<ILighting>,
  files: Request['files'],
) => {
  const existing = await LightingModel.findOne({ _id: id, createdBy: userId });

  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, 'Lighting request not found!');
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

const deleteSingleLightingFromDB = async (userId: string, id: string) => {
  const doc = await LightingModel.findOne({ _id: id, createdBy: userId });

  if (!doc) {
    throw new AppError(httpStatus.NOT_FOUND, 'Lighting request not found!');
  }

  const urls = collectImageUrls(doc.toObject(), IMAGE_FIELD_NAMES);
  await doc.deleteOne();
  if (urls.length) await deleteServiceImages(urls);

  const { createdAt, updatedAt, ...sanitizedData } = doc.toObject();
  return sanitizedData;
};

export const LightingService = {
  createLightingIntoDB,
  getAllLightingsFromDB,
  getMyAllLightingsFromDB,
  getSingleLightingFromDB,
  updateSingleLightingIntoDB,
  deleteSingleLightingFromDB,
};
