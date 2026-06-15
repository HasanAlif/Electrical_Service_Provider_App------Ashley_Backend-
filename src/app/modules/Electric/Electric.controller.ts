import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { asyncHandler, sendResponse } from '../../utils';
import { IElectric } from './Electric.interface';
import { ElectricService } from './Electric.service';

export const ElectricController = {
  createElectric: asyncHandler(async (req: Request, res: Response) => {
    const data = await ElectricService.createElectricIntoDB(
      req.user,
      req.body,
      req.files,
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: 'Electric request created successfully!',
      data,
    });
  }),

  getAllElectrics: asyncHandler(async (req: Request, res: Response) => {
    const data = await ElectricService.getAllElectricsFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Electric requests retrieved successfully!',
      data,
    });
  }),

  getMyAllElectrics: asyncHandler(async (req: Request, res: Response) => {
    const data = await ElectricService.getMyAllElectricsFromDB(
      req.user._id.toString(),
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Your electric requests retrieved successfully!',
      data,
    });
  }),

  getSingleElectric: asyncHandler(async (req: Request, res: Response) => {
    const data = await ElectricService.getSingleElectricFromDB(
      req.user._id.toString(),
      req.params.id as string,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Electric request retrieved successfully!',
      data,
    });
  }),

  updateSingleElectric: asyncHandler(async (req: Request, res: Response) => {
    const data = await ElectricService.updateSingleElectricIntoDB(
      req.user._id.toString(),
      req.params.id as string,
      req.body as Partial<IElectric>,
      req.files,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Electric request updated successfully!',
      data,
    });
  }),

  deleteSingleElectric: asyncHandler(async (req: Request, res: Response) => {
    const data = await ElectricService.deleteSingleElectricFromDB(
      req.user._id.toString(),
      req.params.id as string,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Electric request deleted successfully!',
      data,
    });
  }),
};
