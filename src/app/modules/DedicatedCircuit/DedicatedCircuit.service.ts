import httpStatus from 'http-status';
import { Request } from 'express';
import {
  AppError,
  uploadServiceImages,
  collectImageUrls,
  deleteServiceImages,
} from '../../utils';
import { TImageFieldConfig } from '../../utils/serviceImages';
import { IDedicatedCircuit } from './DedicatedCircuit.interface';
import DedicatedCircuitModel from './DedicatedCircuit.model';
import { DEFAULT_REQUEST_STATUS } from '../../constants';
import { IUser } from '../User/user.interface';

const IMAGE_FIELDS: TImageFieldConfig[] = [
  { name: 'photosOfElectricalMeter', multiple: true },
  { name: 'photosOfInstallationLocation', multiple: true },
];
const IMAGE_FIELD_NAMES = IMAGE_FIELDS.map(field => field.name);

const createDedicatedCircuitIntoDB = async (
  user: IUser,
  payload: Partial<IDedicatedCircuit>,
  files: Request['files'],
) => {
  const uploaded = await uploadServiceImages(files, IMAGE_FIELDS);

  const newDoc = await DedicatedCircuitModel.create({
    ...payload,
    ...uploaded,
    createdBy: user._id.toString(),
    serviceType: 'Dedicated Circuit Installation',
    status: payload.status ?? DEFAULT_REQUEST_STATUS,
  });

  const { createdAt, updatedAt, ...sanitizedData } = newDoc.toObject();
  return sanitizedData;
};

const getAllDedicatedCircuitsFromDB = async () => {
  return await DedicatedCircuitModel.find()
    .sort({ createdAt: -1 })
    .select('-createdAt -updatedAt');
};

const getMyAllDedicatedCircuitsFromDB = async (userId: string) => {
  return await DedicatedCircuitModel.find({ createdBy: userId })
    .sort({ createdAt: -1 })
    .select('-createdAt -updatedAt');
};

const getSingleDedicatedCircuitFromDB = async (userId: string, id: string) => {
  const data = await DedicatedCircuitModel.findOne({
    _id: id,
    createdBy: userId,
  }).select('-createdAt -updatedAt');

  if (!data) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Dedicated circuit request not found!',
    );
  }

  return data;
};

const updateSingleDedicatedCircuitIntoDB = async (
  userId: string,
  id: string,
  payload: Partial<IDedicatedCircuit>,
  files: Request['files'],
) => {
  const existing = await DedicatedCircuitModel.findOne({
    _id: id,
    createdBy: userId,
  });

  if (!existing) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Dedicated circuit request not found!',
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

const deleteSingleDedicatedCircuitFromDB = async (
  userId: string,
  id: string,
) => {
  const doc = await DedicatedCircuitModel.findOne({
    _id: id,
    createdBy: userId,
  });

  if (!doc) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Dedicated circuit request not found!',
    );
  }

  const urls = collectImageUrls(doc.toObject(), IMAGE_FIELD_NAMES);
  await doc.deleteOne();
  if (urls.length) await deleteServiceImages(urls);

  const { createdAt, updatedAt, ...sanitizedData } = doc.toObject();
  return sanitizedData;
};

export const DedicatedCircuitService = {
  createDedicatedCircuitIntoDB,
  getAllDedicatedCircuitsFromDB,
  getMyAllDedicatedCircuitsFromDB,
  getSingleDedicatedCircuitFromDB,
  updateSingleDedicatedCircuitIntoDB,
  deleteSingleDedicatedCircuitFromDB,
};
