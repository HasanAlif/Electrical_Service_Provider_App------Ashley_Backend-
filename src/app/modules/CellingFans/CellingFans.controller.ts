import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { asyncHandler, sendResponse } from '../../utils';
import { ICellingFans } from './CellingFans.interface';
import { CellingFansService } from './CellingFans.service';

export const CellingFansController = {
  createCellingFans: asyncHandler(async (req: Request, res: Response) => {
    const data = await CellingFansService.createCellingFansIntoDB(
      req.user,
      req.body,
      req.files,
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: 'Ceiling fan request created successfully!',
      data,
    });
  }),

  getAllCellingFans: asyncHandler(async (req: Request, res: Response) => {
    const data = await CellingFansService.getAllCellingFansFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Ceiling fan requests retrieved successfully!',
      data,
    });
  }),

  getMyAllCellingFans: asyncHandler(async (req: Request, res: Response) => {
    const data = await CellingFansService.getMyAllCellingFansFromDB(
      req.user._id.toString(),
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Your ceiling fan requests retrieved successfully!',
      data,
    });
  }),

  getSingleCellingFans: asyncHandler(async (req: Request, res: Response) => {
    const data = await CellingFansService.getSingleCellingFansFromDB(
      req.user._id.toString(),
      req.params.id as string,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Ceiling fan request retrieved successfully!',
      data,
    });
  }),

  updateSingleCellingFans: asyncHandler(async (req: Request, res: Response) => {
    const data = await CellingFansService.updateSingleCellingFansIntoDB(
      req.user._id.toString(),
      req.params.id as string,
      req.body as Partial<ICellingFans>,
      req.files,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Ceiling fan request updated successfully!',
      data,
    });
  }),

  deleteSingleCellingFans: asyncHandler(async (req: Request, res: Response) => {
    const data = await CellingFansService.deleteSingleCellingFansFromDB(
      req.user._id.toString(),
      req.params.id as string,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Ceiling fan request deleted successfully!',
      data,
    });
  }),
};
