import httpStatus from 'http-status';
import { AppError } from '../../utils';
import { IRemodeling } from './Remodeling.interface';
import RemodelingModel from './Remodeling.model';
import { DEFAULT_REQUEST_STATUS, Service_STATUSES } from '../../constants';
import { IUser } from '../User/user.interface';

const createRemodelingIntoDB = async (
  user: IUser,
  payload: Partial<IRemodeling>,
) => {
  // const drafts = await RemodelingModel.find({
  //   createdBy: user._id.toString(),
  //   status: Service_STATUSES.DRAFT,
  // });

  // if (drafts.length > 0) {
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     'You can only have 1 draft Remodeling request. Please submit or delete existing draft before creating new one.',
  //   );
  // }

  const newDoc = await RemodelingModel.create({
    ...payload,
    createdBy: user._id.toString(),
    serviceType: 'Remodeling',
    plansDrawings: payload.plansDrawings ?? [],
    existingSpacePhotos: payload.existingSpacePhotos ?? [],
    panelPhotos: payload.panelPhotos ?? [],
    status: payload.status ?? DEFAULT_REQUEST_STATUS,
  });

  const { createdAt, updatedAt, ...sanitizedData } = newDoc.toObject();
  return sanitizedData;
};

const getAllRemodelingsFromDB = async () => {
  return await RemodelingModel.find()
    .sort({
      createdAt: -1,
    })
    .select('-createdAt -updatedAt');
};

const getMyAllRemodelingsFromDB = async (userId: string) => {
  return await RemodelingModel.find({ createdBy: userId })
    .sort({
      createdAt: -1,
    })
    .select('-createdAt -updatedAt');
};

const getSingleRemodelingFromDB = async (userId: string, id: string) => {
  const data = await RemodelingModel.findOne({
    _id: id,
    createdBy: userId,
  }).select('-createdAt -updatedAt');

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Remodeling request not found!');
  }

  return data;
};

const updateSingleRemodelingIntoDB = async (
  userId: string,
  id: string,
  payload: Partial<IRemodeling>,
) => {
  const updatedData = await RemodelingModel.findOneAndUpdate(
    { _id: id, createdBy: userId },
    payload,
    { new: true, runValidators: true },
  ).select('-createdAt -updatedAt');

  if (!updatedData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Remodeling request not found!');
  }

  return updatedData;
};

// deleteSingleRemodelingFromDB
const deleteSingleRemodelingFromDB = async (userId: string, id: string) => {
  const deletedData = await RemodelingModel.findOneAndDelete({
    _id: id,
    createdBy: userId,
  }).select('-createdAt -updatedAt');

  if (!deletedData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Remodeling request not found!');
  }

  return deletedData;
};

export const RemodelingService = {
  createRemodelingIntoDB,
  getAllRemodelingsFromDB,
  getMyAllRemodelingsFromDB,
  getSingleRemodelingFromDB,
  updateSingleRemodelingIntoDB,
  deleteSingleRemodelingFromDB,
};
