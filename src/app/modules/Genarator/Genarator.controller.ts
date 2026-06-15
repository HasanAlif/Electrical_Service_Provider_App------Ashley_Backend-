import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { asyncHandler, sendResponse } from '../../utils';
import { IGenarator } from './Genarator.interface';
import { GenaratorService } from './Genarator.service';

export const GenaratorController = {
  createGenarator: asyncHandler(async (req: Request, res: Response) => {
    const data = await GenaratorService.createGenaratorIntoDB(
      req.user,
      req.body,
      req.files,
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: 'Generator request created successfully!',
      data,
    });
  }),

  getAllGenarators: asyncHandler(async (req: Request, res: Response) => {
    const data = await GenaratorService.getAllGenaratorsFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Generator requests retrieved successfully!',
      data,
    });
  }),

  getMyAllGenarators: asyncHandler(async (req: Request, res: Response) => {
    const data = await GenaratorService.getMyAllGenaratorsFromDB(
      req.user._id.toString(),
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Your generator requests retrieved successfully!',
      data,
    });
  }),

  getSingleGenarator: asyncHandler(async (req: Request, res: Response) => {
    const data = await GenaratorService.getSingleGenaratorFromDB(
      req.user._id.toString(),
      req.params.id as string,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Generator request retrieved successfully!',
      data,
    });
  }),

  updateSingleGenarator: asyncHandler(async (req: Request, res: Response) => {
    const data = await GenaratorService.updateSingleGenaratorIntoDB(
      req.user._id.toString(),
      req.params.id as string,
      req.body as Partial<IGenarator>,
      req.files,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Generator request updated successfully!',
      data,
    });
  }),

  deleteSingleGenarator: asyncHandler(async (req: Request, res: Response) => {
    const data = await GenaratorService.deleteSingleGenaratorFromDB(
      req.user._id.toString(),
      req.params.id as string,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Generator request deleted successfully!',
      data,
    });
  }),
};
