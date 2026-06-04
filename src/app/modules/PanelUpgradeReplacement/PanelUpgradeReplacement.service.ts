import httpStatus from 'http-status';
import { AppError } from '../../utils';
import { IPanelUpgradeReplacement } from './PanelUpgradeReplacement.interface';
import PanelUpgradeReplacementModel from './PanelUpgradeReplacement.model';

const createPanelUpgradeReplacementIntoDB = async (
  userId: string,
  payload: Partial<IPanelUpgradeReplacement>,
) => {
  return await PanelUpgradeReplacementModel.create({
    ...payload,
    createdBy: userId,
    serviceType: 'Panel Upgrade / Replacement',
    meterPhotos: payload.meterPhotos ?? [],
    panelPhotos: payload.panelPhotos ?? [],
    status: payload.status ?? 'submitted',
  });
};

const getMyAllPanelUpgradeReplacementsFromDB = async (userId: string) => {
  return await PanelUpgradeReplacementModel.find({ createdBy: userId }).sort({
    createdAt: -1,
  });
};

const getSinglePanelUpgradeReplacementFromDB = async (userId: string, id: string) => {
  const data = await PanelUpgradeReplacementModel.findOne({ _id: id, createdBy: userId });

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Panel request not found!');
  }

  return data;
};

const updateSinglePanelUpgradeReplacementIntoDB = async (
  userId: string,
  id: string,
  payload: Partial<IPanelUpgradeReplacement>,
) => {
  const data = await PanelUpgradeReplacementModel.findOne({ _id: id, createdBy: userId });

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Panel request not found!');
  }

  Object.assign(data, payload);

  const updated = await data.save();
  return updated;
};

export const PanelUpgradeReplacementService = {
  createPanelUpgradeReplacementIntoDB,
  getMyAllPanelUpgradeReplacementsFromDB,
  getSinglePanelUpgradeReplacementFromDB,
  updateSinglePanelUpgradeReplacementIntoDB,
};
