import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { asyncHandler, sendResponse } from '../../utils';
import { ISwitches } from './Switches.interface';
import { SwitchesService } from './Switches.service';

export const SwitchesController = {
  createSwitches: asyncHandler(async (req: Request, res: Response) => {
    const data = await SwitchesService.createSwitchesIntoDB(
      req.user,
      req.body,
      req.files,
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: 'Switches request created successfully!',
      data,
    });
  }),

  getAllSwitches: asyncHandler(async (req: Request, res: Response) => {
    const data = await SwitchesService.getAllSwitchesFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Switches requests retrieved successfully!',
      data,
    });
  }),

  getMyAllSwitches: asyncHandler(async (req: Request, res: Response) => {
    const data = await SwitchesService.getMyAllSwitchesFromDB(
      req.user._id.toString(),
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Your switches requests retrieved successfully!',
      data,
    });
  }),

  getSingleSwitches: asyncHandler(async (req: Request, res: Response) => {
    const data = await SwitchesService.getSingleSwitchesFromDB(
      req.user._id.toString(),
      req.params.id as string,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Switches request retrieved successfully!',
      data,
    });
  }),

  updateSingleSwitches: asyncHandler(async (req: Request, res: Response) => {
    const data = await SwitchesService.updateSingleSwitchesIntoDB(
      req.user._id.toString(),
      req.params.id as string,
      req.body as Partial<ISwitches>,
      req.files,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Switches request updated successfully!',
      data,
    });
  }),

  deleteSingleSwitches: asyncHandler(async (req: Request, res: Response) => {
    const data = await SwitchesService.deleteSingleSwitchesFromDB(
      req.user._id.toString(),
      req.params.id as string,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Switches request deleted successfully!',
      data,
    });
  }),
};
