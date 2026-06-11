import httpStatus from 'http-status';
import { AppError } from '../../utils';
import { IDockPower } from './DockPower.interface';
import DockPowerModel from './DockPower.model';

const createDockPowerIntoDB = async (
  userId: string,
  payload: Partial<IDockPower>,
) => {
  return await DockPowerModel.create({
    ...payload,
    createdBy: userId,
    serviceType: 'Dock Power',
    panelPhotos: payload.panelPhotos ?? [],
    existingSpacePhotos: payload.existingSpacePhotos ?? [],
    plansDrawingsPhotos: payload.plansDrawingsPhotos ?? [],
    status: payload.status ?? 'submitted',
  });
};

const getMyAllDockPowersFromDB = async (userId: string) => {
  return await DockPowerModel.find({ createdBy: userId }).sort({
    createdAt: -1,
  });
};

const getSingleDockPowerFromDB = async (userId: string, id: string) => {
  const data = await DockPowerModel.findOne({
    _id: id,
    createdBy: userId,
  });

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
  const data = await DockPowerModel.findOne({
    _id: id,
    createdBy: userId,
  });

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Dock power request not found!');
  }

  Object.assign(data, payload);

  const updated = await data.save();
  return updated;
};

export const DockPowerService = {
  createDockPowerIntoDB,
  getMyAllDockPowersFromDB,
  getSingleDockPowerFromDB,
  updateSingleDockPowerIntoDB,
};
