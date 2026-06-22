import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { asyncHandler, sendResponse } from '../../utils';
import { FAQService } from './FAQ.service';

const createFAQ = asyncHandler(async (req: Request, res: Response) => {
  const data = await FAQService.createFAQ(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'FAQ created successfully!',
    data,
  });
});

const getAllFAQs = asyncHandler(async (req: Request, res: Response) => {
  const data = await FAQService.getAllFAQs();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'FAQs retrieved successfully!',
    data,
  });
});

const getSingleFAQ = asyncHandler(async (req: Request, res: Response) => {
  const data = await FAQService.getSingleFAQ(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'FAQ retrieved successfully!',
    data,
  });
});

const updateFAQ = asyncHandler(async (req: Request, res: Response) => {
  const data = await FAQService.updateFAQ(req.params.id as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'FAQ updated successfully!',
    data,
  });
});

const deleteFAQ = asyncHandler(async (req: Request, res: Response) => {
  const data = await FAQService.deleteFAQ(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'FAQ deleted successfully!',
    data,
  });
});

export const FAQController = {
  createFAQ,
  getAllFAQs,
  getSingleFAQ,
  updateFAQ,
  deleteFAQ,
};
