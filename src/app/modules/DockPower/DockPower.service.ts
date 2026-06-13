import httpStatus from 'http-status';
import { AppError } from '../../utils';
import { IDockPower } from './DockPower.interface';
import DockPowerModel from './DockPower.model';
import { DEFAULT_REQUEST_STATUS, Service_STATUSES } from '../../constants';
import { IUser } from '../User/user.interface';

const createDockPowerIntoDB = async (
  user: IUser,
  payload: Partial<IDockPower>,
) => {
  // const drafts = await DockPowerModel.find({
  //   createdBy: user._id.toString(),
  //   status: Service_STATUSES.DRAFT,
  // });

  // if (drafts.length > 0) {
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     'You can only have 1 draft Dock power request. Please submit or delete existing draft before creating new one.',
  //   );
  // }

  const newDoc = await DockPowerModel.create({
    ...payload,
    createdBy: user._id.toString(),
    serviceType: 'Dock Power',
    panelPhotos: payload.panelPhotos ?? [],
    existingSpacePhotos: payload.existingSpacePhotos ?? [],
    plansDrawingsPhotos: payload.plansDrawingsPhotos ?? [],
    status: payload.status ?? DEFAULT_REQUEST_STATUS,
  });

  const { createdAt, updatedAt, ...sanitizedData } = newDoc.toObject();
  return sanitizedData;
};

const getAllDockPowersFromDB = async () => {
  return await DockPowerModel.find()
    .sort({
      createdAt: -1,
    })
    .select('-createdAt -updatedAt');
};

const getMyAllDockPowersFromDB = async (userId: string) => {
  return await DockPowerModel.find({ createdBy: userId })
    .sort({
      createdAt: -1,
    })
    .select('-createdAt -updatedAt');
};

const getSingleDockPowerFromDB = async (userId: string, id: string) => {
  const data = await DockPowerModel.findOne({
    _id: id,
    createdBy: userId,
  }).select('-createdAt -updatedAt');

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Dock power request not found!');
  }

  return data;
};

const updateSingleDockPowerIntoDB = async (
  userId: string,
  id: string,
  payload: Partial<IDockPower>,
) => {
  const updatedData = await DockPowerModel.findOneAndUpdate(
    { _id: id, createdBy: userId },
    payload,
    { new: true, runValidators: true },
  ).select('-createdAt -updatedAt');

  if (!updatedData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Dock power request not found!');
  }

  return updatedData;
};

const deleteSingleDockPowerFromDB = async (userId: string, id: string) => {
  const deletedData = await DockPowerModel.findOneAndDelete({
    _id: id,
    createdBy: userId,
  }).select('-createdAt -updatedAt');

  if (!deletedData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Dock power request not found!');
  }

  return deletedData;
};

export const DockPowerService = {
  createDockPowerIntoDB,
  getAllDockPowersFromDB,
  getMyAllDockPowersFromDB,
  getSingleDockPowerFromDB,
  updateSingleDockPowerIntoDB,
  deleteSingleDockPowerFromDB,
};
