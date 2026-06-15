import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { asyncHandler, sendResponse } from '../../utils';
import { IHomeSurgeProtection } from './HomeSurgeProtection.interface';
import { HomeSurgeProtectionService } from './HomeSurgeProtection.service';

export const HomeSurgeProtectionController = {
  createHomeSurgeProtection: asyncHandler(
    async (req: Request, res: Response) => {
      const data =
        await HomeSurgeProtectionService.createHomeSurgeProtectionIntoDB(
          req.user,
          req.body,
          req.files,
        );

      sendResponse(res, {
        statusCode: httpStatus.CREATED,
        message: 'Home surge protection request created successfully!',
        data,
      });
    },
  ),

  getAllHomeSurgeProtections: asyncHandler(
    async (req: Request, res: Response) => {
      const data =
        await HomeSurgeProtectionService.getAllHomeSurgeProtectionsFromDB();

      sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Home surge protection requests retrieved successfully!',
        data,
      });
    },
  ),

  getMyAllHomeSurgeProtections: asyncHandler(
    async (req: Request, res: Response) => {
      const data =
        await HomeSurgeProtectionService.getMyAllHomeSurgeProtectionsFromDB(
          req.user._id.toString(),
        );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Your home surge protection requests retrieved successfully!',
        data,
      });
    },
  ),

  getSingleHomeSurgeProtection: asyncHandler(
    async (req: Request, res: Response) => {
      const data =
        await HomeSurgeProtectionService.getSingleHomeSurgeProtectionFromDB(
          req.user._id.toString(),
          req.params.id as string,
        );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Home surge protection request retrieved successfully!',
        data,
      });
    },
  ),

  updateSingleHomeSurgeProtection: asyncHandler(
    async (req: Request, res: Response) => {
      const data =
        await HomeSurgeProtectionService.updateSingleHomeSurgeProtectionIntoDB(
          req.user._id.toString(),
          req.params.id as string,
          req.body as Partial<IHomeSurgeProtection>,
          req.files,
        );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Home surge protection request updated successfully!',
        data,
      });
    },
  ),

  deleteSingleHomeSurgeProtection: asyncHandler(
    async (req: Request, res: Response) => {
      const data =
        await HomeSurgeProtectionService.deleteSingleHomeSurgeProtectionFromDB(
          req.user._id.toString(),
          req.params.id as string,
        );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Home surge protection request deleted successfully!',
        data,
      });
    },
  ),
};
