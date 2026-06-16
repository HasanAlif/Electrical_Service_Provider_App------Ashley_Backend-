import httpStatus from 'http-status';
import { Request } from 'express';
import {
  AppError,
  uploadServiceImages,
  collectImageUrls,
  deleteServiceImages,
} from '../../utils';
import { TImageFieldConfig } from '../../utils/serviceImages';
import { ISwitches } from './Switches.interface';
import SwitchesModel from './Switches.model';
import { DEFAULT_REQUEST_STATUS } from '../../constants';
import { IUser } from '../User/user.interface';

const IMAGE_FIELDS: TImageFieldConfig[] = [
  { name: 'photosOfWhereSwitchesInstallationNeeded', multiple: true },
];
const IMAGE_FIELD_NAMES = IMAGE_FIELDS.map(field => field.name);

const createSwitchesIntoDB = async (
  user: IUser,
  payload: Partial<ISwitches>,
  files: Request['files'],
) => {
  const uploaded = await uploadServiceImages(files, IMAGE_FIELDS);

  const newDoc = await SwitchesModel.create({
    ...payload,
    ...uploaded,
    createdBy: user._id.toString(),
    serviceType: 'Switches Installation',
    status: payload.status ?? DEFAULT_REQUEST_STATUS,
  });

  const { createdAt, updatedAt, ...sanitizedData } = newDoc.toObject();
  return sanitizedData;
};

const getAllSwitchesFromDB = async () => {
  return await SwitchesModel.find()
    .sort({ createdAt: -1 })
    .select('-createdAt -updatedAt');
};

const getMyAllSwitchesFromDB = async (userId: string) => {
  return await SwitchesModel.find({ createdBy: userId })
    .sort({ createdAt: -1 })
    .select('-createdAt -updatedAt');
};

const getSingleSwitchesFromDB = async (userId: string, id: string) => {
  const data = await SwitchesModel.findOne({
    _id: id,
    createdBy: userId,
  }).select('-createdAt -updatedAt');

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Switches request not found!');
  }

  return data;
};

const updateSingleSwitchesIntoDB = async (
  userId: string,
  id: string,
  payload: Partial<ISwitches>,
  files: Request['files'],
) => {
  const existing = await SwitchesModel.findOne({ _id: id, createdBy: userId });

  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, 'Switches request not found!');
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

const deleteSingleSwitchesFromDB = async (userId: string, id: string) => {
  const doc = await SwitchesModel.findOne({ _id: id, createdBy: userId });

  if (!doc) {
    throw new AppError(httpStatus.NOT_FOUND, 'Switches request not found!');
  }

  const urls = collectImageUrls(doc.toObject(), IMAGE_FIELD_NAMES);
  await doc.deleteOne();
  if (urls.length) await deleteServiceImages(urls);

  const { createdAt, updatedAt, ...sanitizedData } = doc.toObject();
  return sanitizedData;
};

export const SwitchesService = {
  createSwitchesIntoDB,
  getAllSwitchesFromDB,
  getMyAllSwitchesFromDB,
  getSingleSwitchesFromDB,
  updateSingleSwitchesIntoDB,
  deleteSingleSwitchesFromDB,
};
