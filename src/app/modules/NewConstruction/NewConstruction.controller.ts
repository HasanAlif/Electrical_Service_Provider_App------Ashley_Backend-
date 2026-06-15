import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { asyncHandler, sendResponse } from '../../utils';
import { INewConstruction } from './NewConstruction.interface';
import { NewConstructionService } from './NewConstruction.service';

export const NewConstructionController = {
  createNewConstruction: asyncHandler(async (req: Request, res: Response) => {
    const data = await NewConstructionService.createNewConstructionIntoDB(
      req.user,
      req.body,
      req.files,
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: 'New construction request created successfully!',
      data,
    });
  }),

  getAllNewConstructions: asyncHandler(async (req: Request, res: Response) => {
    const data = await NewConstructionService.getAllNewConstructionsFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'New construction requests retrieved successfully!',
      data,
    });
  }),

  getMyAllNewConstructions: asyncHandler(
    async (req: Request, res: Response) => {
      const data = await NewConstructionService.getMyAllNewConstructionsFromDB(
        req.user._id.toString(),
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Your new construction requests retrieved successfully!',
        data,
      });
    },
  ),

  getSingleNewConstruction: asyncHandler(
    async (req: Request, res: Response) => {
      const data = await NewConstructionService.getSingleNewConstructionFromDB(
        req.user._id.toString(),
        req.params.id as string,
      );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'New construction request retrieved successfully!',
        data,
      });
    },
  ),

  updateSingleNewConstruction: asyncHandler(
    async (req: Request, res: Response) => {
      const data =
        await NewConstructionService.updateSingleNewConstructionIntoDB(
          req.user._id.toString(),
          req.params.id as string,
          req.body as Partial<INewConstruction>,
          req.files,
        );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'New construction request updated successfully!',
        data,
      });
    },
  ),

  deleteSingleNewConstruction: asyncHandler(
    async (req: Request, res: Response) => {
      const data =
        await NewConstructionService.deleteSingleNewConstructionFromDB(
          req.user._id.toString(),
          req.params.id as string,
        );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'New construction request deleted successfully!',
        data,
      });
    },
  ),
};
