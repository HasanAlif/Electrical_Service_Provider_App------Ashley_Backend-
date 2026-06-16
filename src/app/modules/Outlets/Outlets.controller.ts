import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { asyncHandler, sendResponse } from '../../utils';
import { IOutlets } from './Outlets.interface';
import { OutletsService } from './Outlets.service';

export const OutletsController = {
  createOutlets: asyncHandler(async (req: Request, res: Response) => {
    const data = await OutletsService.createOutletsIntoDB(
      req.user,
      req.body,
      req.files,
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: 'Outlet request created successfully!',
      data,
    });
  }),

  getAllOutlets: asyncHandler(async (req: Request, res: Response) => {
    const data = await OutletsService.getAllOutletsFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Outlet requests retrieved successfully!',
      data,
    });
  }),

  getMyAllOutlets: asyncHandler(async (req: Request, res: Response) => {
    const data = await OutletsService.getMyAllOutletsFromDB(
      req.user._id.toString(),
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Your outlet requests retrieved successfully!',
      data,
    });
  }),

  getSingleOutlets: asyncHandler(async (req: Request, res: Response) => {
    const data = await OutletsService.getSingleOutletsFromDB(
      req.user._id.toString(),
      req.params.id as string,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Outlet request retrieved successfully!',
      data,
    });
  }),

  updateSingleOutlets: asyncHandler(async (req: Request, res: Response) => {
    const data = await OutletsService.updateSingleOutletsIntoDB(
      req.user._id.toString(),
      req.params.id as string,
      req.body as Partial<IOutlets>,
      req.files,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Outlet request updated successfully!',
      data,
    });
  }),

  deleteSingleOutlets: asyncHandler(async (req: Request, res: Response) => {
    const data = await OutletsService.deleteSingleOutletsFromDB(
      req.user._id.toString(),
      req.params.id as string,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Outlet request deleted successfully!',
      data,
    });
  }),
};
