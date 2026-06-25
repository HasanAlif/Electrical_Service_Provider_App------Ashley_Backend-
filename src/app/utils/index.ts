import AppError from './AppError';
import asyncHandler from './asyncHandler';
import { deleteFile } from './deleteFile';
import globalErrorHandler from './globalErrorHandler';
import notFoundHandler from './notFound';
import sendContactUsEmail from './sendContactUsEmail';
import sendOtpEmail from './sendOtpEmail';
import sendResponse from './sendResponse';
import {
  uploadServiceImages,
  collectImageUrls,
  deleteServiceImages,
} from './serviceImages';
import { sanitizeServiceCreatePayload } from './serviceCreate';
import config from '../config';

// cookie options (read env via the central config, never process.env directly)
const options = {
  httpOnly: true,
  secure: config.NODE_ENV === 'production',
  sameSite: config.NODE_ENV === 'production' ? 'none' : 'strict',
  maxAge: 365 * 24 * 60 * 60 * 1000,
};

export {
  AppError,
  asyncHandler,
  globalErrorHandler,
  notFoundHandler,
  options,
  sendOtpEmail,
  deleteFile,
  sendContactUsEmail,
  sendResponse,
  uploadServiceImages,
  collectImageUrls,
  deleteServiceImages,
  sanitizeServiceCreatePayload,
};
