import httpStatus from 'http-status';
import { AppError } from '../../utils';
import { IServiceCall, TServiceCallStatus } from './ServiceCall.interface';
import ServiceCallModel from './ServiceCall.model';

// createServiceCallIntoDB
const createServiceCallIntoDB = async (payload: Partial<IServiceCall>) => {
  return await ServiceCallModel.create({
    ...payload,
    status: payload.status ?? 'submitted',
  });
};

// getAllServiceCallsFromDB
const getAllServiceCallsFromDB = async () => {
  return await ServiceCallModel.find().sort({ createdAt: -1 });
};

// getServiceCallsByUserFromDB
const getServiceCallsByUserFromDB = async (userId: string) => {
  return await ServiceCallModel.find({ createdBy: userId }).sort({
    createdAt: -1,
  });
};

// getSingleServiceCallFromDB
const getSingleServiceCallFromDB = async (id: string) => {
  const serviceCall = await ServiceCallModel.findById(id);

  if (!serviceCall) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service call not found!');
  }

  return serviceCall;
};

// updateServiceCallStatusIntoDB
const updateServiceCallStatusIntoDB = async (
  id: string,
  status: TServiceCallStatus,
) => {
  const serviceCall = await ServiceCallModel.findByIdAndUpdate(
    id,
    { status },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!serviceCall) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service call not found!');
  }

  return serviceCall;
};

export const ServiceCallService = {
  createServiceCallIntoDB,
  getAllServiceCallsFromDB,
  getServiceCallsByUserFromDB,
  getSingleServiceCallFromDB,
  updateServiceCallStatusIntoDB,
};
