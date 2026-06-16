import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { asyncHandler, sendResponse } from '../../utils';
import { IDedicatedCircuit } from './DedicatedCircuit.interface';
import { DedicatedCircuitService } from './DedicatedCircuit.service';

export const DedicatedCircuitController = {
  createDedicatedCircuit: asyncHandler(async (req: Request, res: Response) => {
    const data = await DedicatedCircuitService.createDedicatedCircuitIntoDB(
      req.user,
      req.body,
      req.files,
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: 'Dedicated circuit request created successfully!',
      data,
    });
  }),

  getAllDedicatedCircuits: asyncHandler(async (req: Request, res: Response) => {
    const data = await DedicatedCircuitService.getAllDedicatedCircuitsFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Dedicated circuit requests retrieved successfully!',
      data,
    });
  }),

  getMyAllDedicatedCircuits: asyncHandler(
    async (req: Request, res: Response) => {
      const data =
        await DedicatedCircuitService.getMyAllDedicatedCircuitsFromDB(
          req.user._id.toString(),
        );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Your dedicated circuit requests retrieved successfully!',
        data,
      });
    },
  ),

  getSingleDedicatedCircuit: asyncHandler(
    async (req: Request, res: Response) => {
      const data =
        await DedicatedCircuitService.getSingleDedicatedCircuitFromDB(
          req.user._id.toString(),
          req.params.id as string,
        );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Dedicated circuit request retrieved successfully!',
        data,
      });
    },
  ),

  updateSingleDedicatedCircuit: asyncHandler(
    async (req: Request, res: Response) => {
      const data =
        await DedicatedCircuitService.updateSingleDedicatedCircuitIntoDB(
          req.user._id.toString(),
          req.params.id as string,
          req.body as Partial<IDedicatedCircuit>,
          req.files,
        );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Dedicated circuit request updated successfully!',
        data,
      });
    },
  ),

  deleteSingleDedicatedCircuit: asyncHandler(
    async (req: Request, res: Response) => {
      const data =
        await DedicatedCircuitService.deleteSingleDedicatedCircuitFromDB(
          req.user._id.toString(),
          req.params.id as string,
        );

      sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Dedicated circuit request deleted successfully!',
        data,
      });
    },
  ),
};
