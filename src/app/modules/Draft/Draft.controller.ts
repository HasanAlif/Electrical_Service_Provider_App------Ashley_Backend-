import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { asyncHandler, sendResponse } from '../../utils';
import { DraftService } from './Draft.service';

const getAllMyDrafts = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id?.toString();
  const data = await DraftService.getAllMyDraftsFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'All drafts retrieved successfully!',
    data,
  });
});

export const DraftController = {
  getAllMyDrafts,
};
