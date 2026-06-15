import httpStatus from 'http-status';
import { Request } from 'express';
import {
  AppError,
  uploadServiceImages,
  collectImageUrls,
  deleteServiceImages,
} from '../../utils';
import { TImageFieldConfig } from '../../utils/serviceImages';
import { IGenarator } from './Genarator.interface';
import GenaratorModel from './Genarator.model';
import { DEFAULT_REQUEST_STATUS } from '../../constants';
import { IUser } from '../User/user.interface';

const IMAGE_FIELDS: TImageFieldConfig[] = [
  { name: 'photosOfWhereGeneratorWillBeInlet', multiple: true },
  { name: 'photosOfReceptacleOnGenerator', multiple: true },
  { name: 'electricPanelPhotos', multiple: true },
  { name: 'generatorInstallationLocationPhotos', multiple: true },
  { name: 'photosOfElectricalMeter', multiple: true },
];
const IMAGE_FIELD_NAMES = IMAGE_FIELDS.map(field => field.name);

const createGenaratorIntoDB = async (
  user: IUser,
  payload: Partial<IGenarator>,
  files: Request['files'],
) => {
  const uploaded = await uploadServiceImages(files, IMAGE_FIELDS);

  const newDoc = await GenaratorModel.create({
    ...payload,
    ...uploaded,
    createdBy: user._id.toString(),
    serviceType: 'Generator Installation',
    status: payload.status ?? DEFAULT_REQUEST_STATUS,
  });

  const { createdAt, updatedAt, ...sanitizedData } = newDoc.toObject();
  return sanitizedData;
};

const getAllGenaratorsFromDB = async () => {
  return await GenaratorModel.find()
    .sort({ createdAt: -1 })
    .select('-createdAt -updatedAt');
};

const getMyAllGenaratorsFromDB = async (userId: string) => {
  return await GenaratorModel.find({ createdBy: userId })
    .sort({ createdAt: -1 })
    .select('-createdAt -updatedAt');
};

const getSingleGenaratorFromDB = async (userId: string, id: string) => {
  const data = await GenaratorModel.findOne({
    _id: id,
    createdBy: userId,
  }).select('-createdAt -updatedAt');

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Generator request not found!');
  }

  return data;
};

const updateSingleGenaratorIntoDB = async (
  userId: string,
  id: string,
  payload: Partial<IGenarator>,
  files: Request['files'],
) => {
  const existing = await GenaratorModel.findOne({ _id: id, createdBy: userId });

  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, 'Generator request not found!');
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

const deleteSingleGenaratorFromDB = async (userId: string, id: string) => {
  const doc = await GenaratorModel.findOne({ _id: id, createdBy: userId });

  if (!doc) {
    throw new AppError(httpStatus.NOT_FOUND, 'Generator request not found!');
  }

  const urls = collectImageUrls(doc.toObject(), IMAGE_FIELD_NAMES);
  await doc.deleteOne();
  if (urls.length) await deleteServiceImages(urls);

  const { createdAt, updatedAt, ...sanitizedData } = doc.toObject();
  return sanitizedData;
};

export const GenaratorService = {
  createGenaratorIntoDB,
  getAllGenaratorsFromDB,
  getMyAllGenaratorsFromDB,
  getSingleGenaratorFromDB,
  updateSingleGenaratorIntoDB,
  deleteSingleGenaratorFromDB,
};
