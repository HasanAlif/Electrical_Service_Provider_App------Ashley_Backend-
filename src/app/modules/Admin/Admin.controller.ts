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

const searchByNameQidOrEmail = asyncHandler(
  async (req: Request, res: Response) => {
    const { searchQuery, page, limit } = req.query;

    const result = await AdminService.searchByNameQidOrEmail({
      searchQuery: searchQuery as string,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Quotes search results retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  },
);

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

const getQoutesCount = asyncHandler(async (req: Request, res: Response) => {
  const data = await AdminService.getQoutesCount();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Quotes count retrieved successfully!',
    data,
  });
});

const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const data = await AdminService.createCategory(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Category created successfully!',
    data,
  });
});

const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
  const data = await AdminService.getAllCategories();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Categories retrieved successfully!',
    data,
  });
});

const getSingleCategory = asyncHandler(async (req: Request, res: Response) => {
  const data = await AdminService.getSingleCategory(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Category retrieved successfully!',
    data,
  });
});

const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const data = await AdminService.updateCategory(
    req.params.id as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Category updated successfully!',
    data,
  });
});

const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const data = await AdminService.deleteCategory(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Category deleted successfully!',
    data,
  });
});

export const AdminController = {
  getAllQuotes,
  searchByNameQidOrEmail,
  getSingleQuote,
  updateQuoteStatus,
  getQouteForUpdate,
  getQoutesCount,
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
