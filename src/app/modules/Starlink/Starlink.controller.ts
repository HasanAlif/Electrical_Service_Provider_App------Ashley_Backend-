import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { asyncHandler, sendResponse } from '../../utils';
import { IStarlink } from './Starlink.interface';
import { StarlinkService } from './Starlink.service';

export const StarlinkController = {
  createStarlink: asyncHandler(async (req: Request, res: Response) => {
    const data = await StarlinkService.createStarlinkIntoDB(
      req.user,
      req.body,
      req.files,
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: 'Starlink request created successfully!',
      data,
    });
  }),

  getAllStarlinks: asyncHandler(async (req: Request, res: Response) => {
    const data = await StarlinkService.getAllStarlinksFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Starlink requests retrieved successfully!',
      data,
    });
  }),

  getMyAllStarlinks: asyncHandler(async (req: Request, res: Response) => {
    const data = await StarlinkService.getMyAllStarlinksFromDB(
      req.user._id.toString(),
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Your starlink requests retrieved successfully!',
      data,
    });
  }),

  getSingleStarlink: asyncHandler(async (req: Request, res: Response) => {
    const data = await StarlinkService.getSingleStarlinkFromDB(
      req.user._id.toString(),
      req.params.id as string,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Starlink request retrieved successfully!',
      data,
    });
  }),

  updateSingleStarlink: asyncHandler(async (req: Request, res: Response) => {
    const data = await StarlinkService.updateSingleStarlinkIntoDB(
      req.user._id.toString(),
      req.params.id as string,
      req.body as Partial<IStarlink>,
      req.files,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Starlink request updated successfully!',
      data,
    });
  }),

  deleteSingleStarlink: asyncHandler(async (req: Request, res: Response) => {
    const data = await StarlinkService.deleteSingleStarlinkFromDB(
      req.user._id.toString(),
      req.params.id as string,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Starlink request deleted successfully!',
      data,
    });
  }),
};
