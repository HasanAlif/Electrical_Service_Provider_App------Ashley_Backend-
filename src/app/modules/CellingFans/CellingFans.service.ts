import httpStatus from 'http-status';
import { Request } from 'express';
import {
  AppError,
  uploadServiceImages,
  collectImageUrls,
  deleteServiceImages,
} from '../../utils';
import { TImageFieldConfig } from '../../utils/serviceImages';
import { ICellingFans } from './CellingFans.interface';
import CellingFansModel from './CellingFans.model';
import { DEFAULT_REQUEST_STATUS } from '../../constants';
import { IUser } from '../User/user.interface';

const IMAGE_FIELDS: TImageFieldConfig[] = [
  { name: 'photosOfCurrentCeilingFan', multiple: true },
  { name: 'photosOfNewCeilingFan', multiple: true },
];
const IMAGE_FIELD_NAMES = IMAGE_FIELDS.map(field => field.name);

const createCellingFansIntoDB = async (
  user: IUser,
  payload: Partial<ICellingFans>,
  files: Request['files'],
) => {
  const uploaded = await uploadServiceImages(files, IMAGE_FIELDS);

  const newDoc = await CellingFansModel.create({
    ...payload,
    ...uploaded,
    createdBy: user._id.toString(),
    serviceType: 'Ceiling Fan Installation',
    status: payload.status ?? DEFAULT_REQUEST_STATUS,
  });

  const { createdAt, updatedAt, ...sanitizedData } = newDoc.toObject();
  return sanitizedData;
};

const getAllCellingFansFromDB = async () => {
  return await CellingFansModel.find()
    .sort({ createdAt: -1 })
    .select('-createdAt -updatedAt');
};

const getMyAllCellingFansFromDB = async (userId: string) => {
  return await CellingFansModel.find({ createdBy: userId })
    .sort({ createdAt: -1 })
    .select('-createdAt -updatedAt');
};

const getSingleCellingFansFromDB = async (userId: string, id: string) => {
  const data = await CellingFansModel.findOne({
    _id: id,
    createdBy: userId,
  }).select('-createdAt -updatedAt');

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Ceiling fan request not found!');
  }

  return data;
};

const updateSingleCellingFansIntoDB = async (
  userId: string,
  id: string,
  payload: Partial<ICellingFans>,
  files: Request['files'],
) => {
  const existing = await CellingFansModel.findOne({
    _id: id,
    createdBy: userId,
  });

  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, 'Ceiling fan request not found!');
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

const deleteSingleCellingFansFromDB = async (userId: string, id: string) => {
  const doc = await CellingFansModel.findOne({ _id: id, createdBy: userId });

  if (!doc) {
    throw new AppError(httpStatus.NOT_FOUND, 'Ceiling fan request not found!');
  }

  const urls = collectImageUrls(doc.toObject(), IMAGE_FIELD_NAMES);
  await doc.deleteOne();
  if (urls.length) await deleteServiceImages(urls);

  const { createdAt, updatedAt, ...sanitizedData } = doc.toObject();
  return sanitizedData;
};

export const CellingFansService = {
  createCellingFansIntoDB,
  getAllCellingFansFromDB,
  getMyAllCellingFansFromDB,
  getSingleCellingFansFromDB,
  updateSingleCellingFansIntoDB,
  deleteSingleCellingFansFromDB,
};
