import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { asyncHandler, sendResponse } from '../../utils';
import { PanelUpgradeReplacementService } from './PanelUpgradeReplacement.service';
import { IPanelUpgradeReplacement } from './PanelUpgradeReplacement.interface';

export const PanelUpgradeReplacementController = {
  create: asyncHandler(async (req: Request, res: Response) => {
    const payload = req.body as Partial<IPanelUpgradeReplacement>;
    const data = await PanelUpgradeReplacementService.createPanelUpgradeReplacementIntoDB(
      req.user._id.toString(),
      payload,
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: 'Panel request created successfully!',
      data,
    });
  }),

  getMyAll: asyncHandler(async (req: Request, res: Response) => {
    const data = await PanelUpgradeReplacementService.getMyAllPanelUpgradeReplacementsFromDB(
      req.user._id.toString(),
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Your panel requests retrieved successfully!',
      data,
    });
  }),

  getSingle: asyncHandler(async (req: Request, res: Response) => {
    const data = await PanelUpgradeReplacementService.getSinglePanelUpgradeReplacementFromDB(
      req.user._id.toString(),
      req.params.id as string,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Panel request retrieved successfully!',
      data,
    });
  }),

  updateSingle: asyncHandler(async (req: Request, res: Response) => {
    const data = await PanelUpgradeReplacementService.updateSinglePanelUpgradeReplacementIntoDB(
      req.user._id.toString(),
      req.params.id as string,
      req.body as Partial<IPanelUpgradeReplacement>,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Panel request updated successfully!',
      data,
    });
  }),
};
