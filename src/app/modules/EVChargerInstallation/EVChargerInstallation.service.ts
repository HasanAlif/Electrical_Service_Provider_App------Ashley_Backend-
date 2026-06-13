import httpStatus from 'http-status';
import { AppError } from '../../utils';
import { IEVChargerInstallation } from './EVChargerInstallation.interface';
import EVChargerInstallationModel from './EVChargerInstallation.model';
import { DEFAULT_REQUEST_STATUS, Service_STATUSES } from '../../constants';
import { IUser } from '../User/user.interface';

const createEVChargerInstallationIntoDB = async (
  user: IUser,
  payload: Partial<IEVChargerInstallation>,
) => {
  // const drafts = await EVChargerInstallationModel.find({
  //   createdBy: user._id.toString(),
  //   status: Service_STATUSES.DRAFT,
  // });

  // if (drafts.length > 0) {
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     'You can only have 1 draft EV charger installation request. Please submit or delete existing draft before creating new one.',
  //   );
  // }

  const newDoc = await EVChargerInstallationModel.create({
    ...payload,
    createdBy: user._id.toString(),
    serviceType: 'EV Charger Installation',
    // chargerProvidedByUser: payload.chargerProvidedByUser ?? false,
    panelPhotos: payload.panelPhotos ?? [],
    status: payload.status ?? DEFAULT_REQUEST_STATUS,
  });

  const { createdAt, updatedAt, ...sanitizedData } = newDoc.toObject();
  return sanitizedData;
};

const getAllEVChargerInstallationsFromDB = async () => {
  return await EVChargerInstallationModel.find()
    .sort({
      createdAt: -1,
    })
    .select('-createdAt -updatedAt');
};

const getMyAllEVChargerInstallationsFromDB = async (userId: string) => {
  return await EVChargerInstallationModel.find({ createdBy: userId })
    .sort({
      createdAt: -1,
    })
    .select('-createdAt -updatedAt');
};

const getSingleEVChargerInstallationFromDB = async (
  userId: string,
  id: string,
) => {
  const data = await EVChargerInstallationModel.findOne({
    _id: id,
    createdBy: userId,
  }).select('-createdAt -updatedAt');

  if (!data) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'EV charger installation not found!',
    );
  }

  return data;
};

const updateSingleEVChargerInstallationIntoDB = async (
  userId: string,
  id: string,
  payload: Partial<IEVChargerInstallation>,
) => {
  const updatedData = await EVChargerInstallationModel.findOneAndUpdate(
    { _id: id, createdBy: userId },
    payload,
    { new: true, runValidators: true },
  ).select('-createdAt -updatedAt');

  if (!updatedData) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'EV charger installation not found!',
    );
  }

  return updatedData;
};

const deleteSingleEVChargerInstallationFromDB = async (
  userId: string,
  id: string,
) => {
  const deletedData = await EVChargerInstallationModel.findOneAndDelete({
    _id: id,
    createdBy: userId,
  }).select('-createdAt -updatedAt');

  if (!deletedData) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'EV charger installation not found!',
    );
  }

  return deletedData;
};

export const EVChargerInstallationService = {
  createEVChargerInstallationIntoDB,
  getAllEVChargerInstallationsFromDB,
  getMyAllEVChargerInstallationsFromDB,
  getSingleEVChargerInstallationFromDB,
  updateSingleEVChargerInstallationIntoDB,
  deleteSingleEVChargerInstallationFromDB,
};
