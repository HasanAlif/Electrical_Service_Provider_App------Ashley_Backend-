import { Router } from 'express';
import { auth, validateRequest } from '../../middlewares';
import { ROLE } from '../User/user.constant';
import { EVChargerInstallationController } from './EVChargerInstallation.controller';
import { EVChargerInstallationValidation } from './EVChargerInstallation.validation';

const router = Router();

router
  .route('/')
  .post(
    auth(ROLE.USER),
    validateRequest(EVChargerInstallationValidation.createSchema),
    EVChargerInstallationController.create,
  )
  .get(auth(ROLE.USER), EVChargerInstallationController.getMyAll);

router
  .route('/:id')
  .get(
    auth(ROLE.USER),
    validateRequest(EVChargerInstallationValidation.idParamsSchema),
    EVChargerInstallationController.getSingle,
  )
  .patch(
    auth(ROLE.USER),
    validateRequest(EVChargerInstallationValidation.updateSchema),
    EVChargerInstallationController.updateSingle,
  );

export const EVChargerInstallationRoutes = router;
