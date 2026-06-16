import { Router } from 'express';
import {
  auth,
  validateRequest,
  validateRequestFromFormData,
} from '../../middlewares';
import { ROLE } from '../User/user.constant';
import { SwitchesController } from './Switches.controller';
import { SwitchesValidation } from './Switches.validation';
import { multerUpload } from '../../lib';

const router = Router();

const uploadSwitchesImages = multerUpload.fields([
  { name: 'photosOfWhereSwitchesInstallationNeeded', maxCount: 10 },
]);

router
  .route('/')
  .post(
    auth(ROLE.USER),
    uploadSwitchesImages,
    validateRequestFromFormData(SwitchesValidation.createSchema),
    SwitchesController.createSwitches,
  )
  .get(auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), SwitchesController.getAllSwitches);

router.route('/my').get(auth(ROLE.USER), SwitchesController.getMyAllSwitches);

router
  .route('/:id')
  .get(
    auth(ROLE.USER),
    validateRequest(SwitchesValidation.idParamsSchema),
    SwitchesController.getSingleSwitches,
  )
  .patch(
    auth(ROLE.USER),
    uploadSwitchesImages,
    validateRequestFromFormData(SwitchesValidation.updateSchema),
    SwitchesController.updateSingleSwitches,
  )
  .delete(
    auth(ROLE.USER),
    validateRequest(SwitchesValidation.idParamsSchema),
    SwitchesController.deleteSingleSwitches,
  );

export const SwitchesRoutes = router;
