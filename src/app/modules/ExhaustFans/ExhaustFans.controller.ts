import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { asyncHandler, sendResponse } from '../../utils';
import { IExhaustFans } from './ExhaustFans.interface';
import { ExhaustFansService } from './ExhaustFans.service';

export const ExhaustFansController = {
  createExhaustFans: asyncHandler(async (req: Request, res: Response) => {
    const data = await ExhaustFansService.createExhaustFansIntoDB(
      req.user,
      req.body,
      req.files,
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: 'Exhaust fan request created successfully!',
      data,
    });
  }),

  getAllExhaustFans: asyncHandler(async (req: Request, res: Response) => {
    const data = await ExhaustFansService.getAllExhaustFansFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Exhaust fan requests retrieved successfully!',
      data,
    });
  }),

  getMyAllExhaustFans: asyncHandler(async (req: Request, res: Response) => {
    const data = await ExhaustFansService.getMyAllExhaustFansFromDB(
      req.user._id.toString(),
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Your exhaust fan requests retrieved successfully!',
      data,
    });
  }),

  getSingleExhaustFans: asyncHandler(async (req: Request, res: Response) => {
    const data = await ExhaustFansService.getSingleExhaustFansFromDB(
      req.user._id.toString(),
      req.params.id as string,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Exhaust fan request retrieved successfully!',
      data,
    });
  }),

  updateSingleExhaustFans: asyncHandler(async (req: Request, res: Response) => {
    const data = await ExhaustFansService.updateSingleExhaustFansIntoDB(
      req.user._id.toString(),
      req.params.id as string,
      req.body as Partial<IExhaustFans>,
      req.files,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Exhaust fan request updated successfully!',
      data,
    });
  }),

  deleteSingleExhaustFans: asyncHandler(async (req: Request, res: Response) => {
    const data = await ExhaustFansService.deleteSingleExhaustFansFromDB(
      req.user._id.toString(),
      req.params.id as string,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Exhaust fan request deleted successfully!',
      data,
    });
  }),
};
