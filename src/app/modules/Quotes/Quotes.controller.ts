import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { asyncHandler, sendResponse } from '../../utils';
import { QuotesService } from './Quotes.service';

const getAllMyQuotes = asyncHandler(async (req: Request, res: Response) => {
  const { status, searchQuery } = req.query;

  const data = await QuotesService.getAllMyQuotes(req.user._id.toString(), {
    status: status as string | undefined,
    searchQuery: searchQuery as string | undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Your quotes retrieved successfully!',
    data,
  });
});

export const QuotesController = {
  getAllMyQuotes,
};
