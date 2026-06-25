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
import { IOutlets } from './Outlets.interface';
import OutletsModel from './Outlets.model';
import { DEFAULT_REQUEST_STATUS } from '../../constants';
import { IUser } from '../User/user.interface';

const IMAGE_FIELDS: TImageFieldConfig[] = [
  { name: 'photosOfWhereOutletsInstall', multiple: true },
  { name: 'photosOfCurrentOutlets', multiple: true },
];
const IMAGE_FIELD_NAMES = IMAGE_FIELDS.map(field => field.name);

const createOutletsIntoDB = async (
  user: IUser,
  payload: Partial<IOutlets>,
  files: Request['files'],
) => {
  const safePayload = sanitizeServiceCreatePayload(payload);
  const uploaded = await uploadServiceImages(files, IMAGE_FIELDS);

  const newDoc = await OutletsModel.create({
    ...safePayload,
    ...uploaded,
    createdBy: user._id.toString(),
    serviceType: 'Outlet Installation',
    status: safePayload.status ?? DEFAULT_REQUEST_STATUS,
  });

  const { createdAt, updatedAt, ...sanitizedData } = newDoc.toObject();
  return sanitizedData;
};

const getAllOutletsFromDB = async () => {
  return await OutletsModel.find()
    .sort({ createdAt: -1 })
    .select('-createdAt -updatedAt');
};

const getMyAllOutletsFromDB = async (userId: string) => {
  return await OutletsModel.find({ createdBy: userId })
    .sort({ createdAt: -1 })
    .select('-createdAt -updatedAt');
};

const getSingleOutletsFromDB = async (userId: string, id: string) => {
  const data = await OutletsModel.findOne({
    _id: id,
    createdBy: userId,
  }).select('-createdAt -updatedAt');

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Outlet request not found!');
  }

  return data;
};

const updateSingleOutletsIntoDB = async (
  userId: string,
  id: string,
  payload: Partial<IOutlets>,
  files: Request['files'],
) => {
  const existing = await OutletsModel.findOne({ _id: id, createdBy: userId });

  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, 'Outlet request not found!');
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

const deleteSingleOutletsFromDB = async (userId: string, id: string) => {
  const doc = await OutletsModel.findOne({ _id: id, createdBy: userId });

  if (!doc) {
    throw new AppError(httpStatus.NOT_FOUND, 'Outlet request not found!');
  }

  const urls = collectImageUrls(doc.toObject(), IMAGE_FIELD_NAMES);
  await doc.deleteOne();
  if (urls.length) await deleteServiceImages(urls);

  const { createdAt, updatedAt, ...sanitizedData } = doc.toObject();
  return sanitizedData;
};

export const OutletsService = {
  createOutletsIntoDB,
  getAllOutletsFromDB,
  getMyAllOutletsFromDB,
  getSingleOutletsFromDB,
  updateSingleOutletsIntoDB,
  deleteSingleOutletsFromDB,
};
