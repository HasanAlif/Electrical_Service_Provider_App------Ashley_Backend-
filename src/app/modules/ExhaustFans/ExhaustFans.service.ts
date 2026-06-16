import httpStatus from 'http-status';
import { Request } from 'express';
import {
  AppError,
  uploadServiceImages,
  collectImageUrls,
  deleteServiceImages,
} from '../../utils';
import { TImageFieldConfig } from '../../utils/serviceImages';
import { IExhaustFans } from './ExhaustFans.interface';
import ExhaustFansModel from './ExhaustFans.model';
import { DEFAULT_REQUEST_STATUS } from '../../constants';
import { IUser } from '../User/user.interface';

const IMAGE_FIELDS: TImageFieldConfig[] = [
  { name: 'photoOfNewFan', multiple: true },
  { name: 'photosOfInstallationArea', multiple: true },
  { name: 'photosOfPanelCloseUp', multiple: true },
  { name: 'photosOfPanelWideShot', multiple: true },
  { name: 'photosOfCurrentKitchenExhaustFan', multiple: true },
  { name: 'photosOfCurrentBathroomExhaustFan', multiple: true },
];
const IMAGE_FIELD_NAMES = IMAGE_FIELDS.map(field => field.name);

const createExhaustFansIntoDB = async (
  user: IUser,
  payload: Partial<IExhaustFans>,
  files: Request['files'],
) => {
  const uploaded = await uploadServiceImages(files, IMAGE_FIELDS);

  const newDoc = await ExhaustFansModel.create({
    ...payload,
    ...uploaded,
    createdBy: user._id.toString(),
    serviceType: 'Exhaust Fan Installation',
    status: payload.status ?? DEFAULT_REQUEST_STATUS,
  });

  const { createdAt, updatedAt, ...sanitizedData } = newDoc.toObject();
  return sanitizedData;
};

const getAllExhaustFansFromDB = async () => {
  return await ExhaustFansModel.find()
    .sort({ createdAt: -1 })
    .select('-createdAt -updatedAt');
};

const getMyAllExhaustFansFromDB = async (userId: string) => {
  return await ExhaustFansModel.find({ createdBy: userId })
    .sort({ createdAt: -1 })
    .select('-createdAt -updatedAt');
};

const getSingleExhaustFansFromDB = async (userId: string, id: string) => {
  const data = await ExhaustFansModel.findOne({
    _id: id,
    createdBy: userId,
  }).select('-createdAt -updatedAt');

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Exhaust fan request not found!');
  }

  return data;
};

const updateSingleExhaustFansIntoDB = async (
  userId: string,
  id: string,
  payload: Partial<IExhaustFans>,
  files: Request['files'],
) => {
  const existing = await ExhaustFansModel.findOne({
    _id: id,
    createdBy: userId,
  });

  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, 'Exhaust fan request not found!');
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

const deleteSingleExhaustFansFromDB = async (userId: string, id: string) => {
  const doc = await ExhaustFansModel.findOne({ _id: id, createdBy: userId });

  if (!doc) {
    throw new AppError(httpStatus.NOT_FOUND, 'Exhaust fan request not found!');
  }

  const urls = collectImageUrls(doc.toObject(), IMAGE_FIELD_NAMES);
  await doc.deleteOne();
  if (urls.length) await deleteServiceImages(urls);

  const { createdAt, updatedAt, ...sanitizedData } = doc.toObject();
  return sanitizedData;
};

export const ExhaustFansService = {
  createExhaustFansIntoDB,
  getAllExhaustFansFromDB,
  getMyAllExhaustFansFromDB,
  getSingleExhaustFansFromDB,
  updateSingleExhaustFansIntoDB,
  deleteSingleExhaustFansFromDB,
};
