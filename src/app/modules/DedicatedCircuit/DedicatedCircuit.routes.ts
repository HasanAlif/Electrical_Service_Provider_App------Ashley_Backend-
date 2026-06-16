import { Router } from 'express';
import {
  auth,
  validateRequest,
  validateRequestFromFormData,
} from '../../middlewares';
import { ROLE } from '../User/user.constant';
import { DedicatedCircuitController } from './DedicatedCircuit.controller';
import { DedicatedCircuitValidation } from './DedicatedCircuit.validation';
import { multerUpload } from '../../lib';

const router = Router();

const uploadDedicatedCircuitImages = multerUpload.fields([
  { name: 'photosOfElectricalMeter', maxCount: 10 },
  { name: 'photosOfInstallationLocation', maxCount: 10 },
]);

router
  .route('/')
  .post(
    auth(ROLE.USER),
    uploadDedicatedCircuitImages,
    validateRequestFromFormData(DedicatedCircuitValidation.createSchema),
    DedicatedCircuitController.createDedicatedCircuit,
  )
  .get(
    auth(ROLE.ADMIN, ROLE.SUPER_ADMIN),
    DedicatedCircuitController.getAllDedicatedCircuits,
  );

router
  .route('/my')
  .get(auth(ROLE.USER), DedicatedCircuitController.getMyAllDedicatedCircuits);

router
  .route('/:id')
  .get(
    auth(ROLE.USER),
    validateRequest(DedicatedCircuitValidation.idParamsSchema),
    DedicatedCircuitController.getSingleDedicatedCircuit,
  )
  .patch(
    auth(ROLE.USER),
    uploadDedicatedCircuitImages,
    validateRequestFromFormData(DedicatedCircuitValidation.updateSchema),
    DedicatedCircuitController.updateSingleDedicatedCircuit,
  )
  .delete(
    auth(ROLE.USER),
    validateRequest(DedicatedCircuitValidation.idParamsSchema),
    DedicatedCircuitController.deleteSingleDedicatedCircuit,
  );

export const DedicatedCircuitRoutes = router;
