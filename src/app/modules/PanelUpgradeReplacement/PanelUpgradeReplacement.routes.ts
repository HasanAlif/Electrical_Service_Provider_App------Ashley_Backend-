import { Router } from 'express';
import { auth, validateRequest } from '../../middlewares';
import { ROLE } from '../User/user.constant';
import { PanelUpgradeReplacementController } from './PanelUpgradeReplacement.controller';
import { PanelUpgradeReplacementValidation } from './PanelUpgradeReplacement.validation';

const router = Router();

router
  .route('/')
  .post(
    auth(ROLE.USER),
    validateRequest(PanelUpgradeReplacementValidation.createSchema),
    PanelUpgradeReplacementController.create,
  )
  .get(auth(ROLE.USER), PanelUpgradeReplacementController.getMyAll);

router
  .route('/:id')
  .get(
    auth(ROLE.USER),
    validateRequest(PanelUpgradeReplacementValidation.idParamsSchema),
    PanelUpgradeReplacementController.getSingle,
  )
  .patch(
    auth(ROLE.USER),
    validateRequest(PanelUpgradeReplacementValidation.updateSchema),
    PanelUpgradeReplacementController.updateSingle,
  );

export const PanelUpgradeReplacementRoutes = router;
