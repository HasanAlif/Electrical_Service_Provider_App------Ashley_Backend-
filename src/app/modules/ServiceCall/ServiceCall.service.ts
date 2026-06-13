import httpStatus from 'http-status';
import { AppError } from '../../utils';
import { IServiceCall } from './ServiceCall.interface';
import ServiceCallModel from './ServiceCall.model';
import { DEFAULT_REQUEST_STATUS, Service_STATUSES } from '../../constants';
import { IUser } from '../User/user.interface';

// createServiceCallIntoDB
const createServiceCallIntoDB = async (
  user: IUser,
  payload: Partial<IServiceCall>,
) => {
  // const drafts = await ServiceCallModel.find({
  //   createdBy: user._id.toString(),
  //   status: Service_STATUSES.DRAFT,
  // });

  // if (drafts.length > 0) {
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     'You can only have 1 draft Service call request. Please submit or delete existing draft before creating new one.',
  //   );
  // }

  const newDoc = await ServiceCallModel.create({
    ...payload,
    createdBy: user._id.toString(),
    status: payload.status ?? DEFAULT_REQUEST_STATUS,
  });

  const { createdAt, updatedAt, ...sanitizedData } = newDoc.toObject();
  return sanitizedData;
};

// getAllServiceCallsFromDB
const getAllServiceCallsFromDB = async () => {
  return await ServiceCallModel.find()
    .sort({ createdAt: -1 })
    .select('-createdAt -updatedAt');
};

// getMyAllServiceCallsFromDB
const getMyAllServiceCallsFromDB = async (userId: string) => {
  return await ServiceCallModel.find({ createdBy: userId })
    .sort({
      createdAt: -1,
    })
    .select('-createdAt -updatedAt');
};

// getSingleServiceCallFromDB
const getSingleServiceCallFromDB = async (id: string) => {
  const serviceCall = await ServiceCallModel.findById(id).select(
    '-createdAt -updatedAt',
  );

  if (!serviceCall) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service call not found!');
  }

  return serviceCall;
};

// updateServiceCallStatusIntoDB
const updateServiceCallIntoDB = async (
  userId: string,
  id: string,
  payload: Partial<IServiceCall>,
) => {
  const updatedData = await ServiceCallModel.findOneAndUpdate(
    { _id: id, createdBy: userId },
    payload,
    { new: true, runValidators: true },
  ).select('-createdAt -updatedAt');

  if (!updatedData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service call not found!');
  }

  return updatedData;
};

// deleteServiceCallFromDB
const deleteServiceCallFromDB = async (userId: string, id: string) => {
  const deletedData = await ServiceCallModel.findOneAndDelete({
    _id: id,
    createdBy: userId,
  }).select('-createdAt -updatedAt');

  if (!deletedData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service call not found!');
  }

  return deletedData;
};

export const ServiceCallService = {
  createServiceCallIntoDB,
  getAllServiceCallsFromDB,
  getMyAllServiceCallsFromDB,
  getSingleServiceCallFromDB,
  updateServiceCallIntoDB,
  deleteServiceCallFromDB,
};
