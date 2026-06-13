import httpStatus from 'http-status';
import { AppError } from '../../utils';
import { IPanelUpgradeReplacement } from './PanelUpgradeReplacement.interface';
import PanelUpgradeReplacementModel from './PanelUpgradeReplacement.model';
import { DEFAULT_REQUEST_STATUS, Service_STATUSES } from '../../constants';
import { IUser } from '../User/user.interface';

const createPanelUpgradeReplacementIntoDB = async (
  user: IUser,
  payload: Partial<IPanelUpgradeReplacement>,
) => {
  // const drafts = await PanelUpgradeReplacementModel.find({
  //   createdBy: user._id.toString(),
  //   status: Service_STATUSES.DRAFT,
  // });

  // if (drafts.length > 0) {
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     'You can only have 1 draft Panel upgrade/replacement request. Please submit or delete existing draft before creating new one.',
  //   );
  // }

  const newDoc = await PanelUpgradeReplacementModel.create({
    ...payload,
    createdBy: user._id.toString(),
    serviceType: 'Panel Upgrade / Replacement',
    meterPhotos: payload.meterPhotos ?? [],
    panelPhotos: payload.panelPhotos ?? [],
    status: payload.status ?? DEFAULT_REQUEST_STATUS,
  });

  const { createdAt, updatedAt, ...sanitizedData } = newDoc.toObject();
  return sanitizedData;
};

const getAllPanelUpgradeReplacementsFromDB = async () => {
  return await PanelUpgradeReplacementModel.find()
    .sort({
      createdAt: -1,
    })
    .select('-createdAt -updatedAt');
};

const getMyAllPanelUpgradeReplacementsFromDB = async (userId: string) => {
  return await PanelUpgradeReplacementModel.find({ createdBy: userId })
    .sort({
      createdAt: -1,
    })
    .select('-createdAt -updatedAt');
};

const getSinglePanelUpgradeReplacementFromDB = async (
  userId: string,
  id: string,
) => {
  const data = await PanelUpgradeReplacementModel.findOne({
    _id: id,
    createdBy: userId,
  }).select('-createdAt -updatedAt');

  if (!data) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Panel upgrade/replacement request not found!',
    );
  }

  return data;
};

const updateSinglePanelUpgradeReplacementIntoDB = async (
  userId: string,
  id: string,
  payload: Partial<IPanelUpgradeReplacement>,
) => {
  const updatedData = await PanelUpgradeReplacementModel.findOneAndUpdate(
    { _id: id, createdBy: userId },
    payload,
    { new: true, runValidators: true },
  ).select('-createdAt -updatedAt');

  if (!updatedData) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Panel upgrade/replacement request not found!',
    );
  }

  return updatedData;
};

const deleteSinglePanelUpgradeReplacementFromDB = async (
  userId: string,
  id: string,
) => {
  const deletedData = await PanelUpgradeReplacementModel.findOneAndDelete({
    _id: id,
    createdBy: userId,
  }).select('-createdAt -updatedAt');

  if (!deletedData) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Panel upgrade/replacement request not found!',
    );
  }

  return deletedData;
};

export const PanelUpgradeReplacementService = {
  createPanelUpgradeReplacementIntoDB,
  getAllPanelUpgradeReplacementsFromDB,
  getMyAllPanelUpgradeReplacementsFromDB,
  getSinglePanelUpgradeReplacementFromDB,
  updateSinglePanelUpgradeReplacementIntoDB,
  deleteSinglePanelUpgradeReplacementFromDB,
};
