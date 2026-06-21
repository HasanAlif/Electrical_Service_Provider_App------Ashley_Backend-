import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { asyncHandler, sendResponse } from '../../utils';
import { AdminService } from './Admin.service';

const getAllQuotes = asyncHandler(async (req: Request, res: Response) => {
  const { status, serviceType, page, limit } = req.query;

  const result = await AdminService.getAllQuotes({
    status: status as string | undefined,
    serviceType: serviceType as string | undefined,
    page: page ? Number(page) : undefined,
    limit: limit ? Number(limit) : undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'All quotes retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleQuote = asyncHandler(async (req: Request, res: Response) => {
  const data = await AdminService.getSingleQuote(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Quote retrieved successfully!',
    data,
  });
});

const updateQuoteStatus = asyncHandler(async (req: Request, res: Response) => {
  const { status, internalNote } = req.body;

  const data = await AdminService.updateQuoteStatus(req.params.id as string, {
    status,
    internalNote,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Quote updated successfully!',
    data,
  });
});

const getQouteForUpdate = asyncHandler(async (req: Request, res: Response) => {
  const data = await AdminService.getQouteForUpdate(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Quote retrieved successfully!',
    data,
  });
});

export const AdminController = {
  getAllQuotes,
  getSingleQuote,
  updateQuoteStatus,
  getQouteForUpdate,
};
