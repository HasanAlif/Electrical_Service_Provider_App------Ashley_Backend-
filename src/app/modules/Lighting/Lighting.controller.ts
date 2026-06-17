import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { asyncHandler, sendResponse } from '../../utils';
import { ILighting } from './Lighting.interface';
import { LightingService } from './Lighting.service';

export const LightingController = {
  createLighting: asyncHandler(async (req: Request, res: Response) => {
    const data = await LightingService.createLightingIntoDB(
      req.user,
      req.body,
      req.files,
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: 'Lighting request created successfully!',
      data,
    });
  }),

  getAllLightings: asyncHandler(async (req: Request, res: Response) => {
    const data = await LightingService.getAllLightingsFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Lighting requests retrieved successfully!',
      data,
    });
  }),

  getMyAllLightings: asyncHandler(async (req: Request, res: Response) => {
    const data = await LightingService.getMyAllLightingsFromDB(
      req.user._id.toString(),
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Your lighting requests retrieved successfully!',
      data,
    });
  }),

  getSingleLighting: asyncHandler(async (req: Request, res: Response) => {
    const data = await LightingService.getSingleLightingFromDB(
      req.user._id.toString(),
      req.params.id as string,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Lighting request retrieved successfully!',
      data,
    });
  }),

  updateSingleLighting: asyncHandler(async (req: Request, res: Response) => {
    const data = await LightingService.updateSingleLightingIntoDB(
      req.user._id.toString(),
      req.params.id as string,
      req.body as Partial<ILighting>,
      req.files,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Lighting request updated successfully!',
      data,
    });
  }),

  deleteSingleLighting: asyncHandler(async (req: Request, res: Response) => {
    const data = await LightingService.deleteSingleLightingFromDB(
      req.user._id.toString(),
      req.params.id as string,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Lighting request deleted successfully!',
      data,
    });
  }),
};
