import { Router } from 'express';
import {
  auth,
  validateRequest,
  validateRequestFromFormData,
} from '../../middlewares';
import { ROLE } from '../User/user.constant';
import { ExhaustFansController } from './ExhaustFans.controller';
import { ExhaustFansValidation } from './ExhaustFans.validation';
import { multerUpload } from '../../lib';

const router = Router();

const uploadExhaustFansImages = multerUpload.fields([
  { name: 'photoOfNewFan', maxCount: 10 },
  { name: 'photosOfInstallationArea', maxCount: 10 },
  { name: 'photosOfPanelCloseUp', maxCount: 10 },
  { name: 'photosOfPanelWideShot', maxCount: 10 },
  { name: 'photosOfCurrentKitchenExhaustFan', maxCount: 10 },
  { name: 'photosOfCurrentBathroomExhaustFan', maxCount: 10 },
]);

router
  .route('/')
  .post(
    auth(ROLE.USER),
    uploadExhaustFansImages,
    validateRequestFromFormData(ExhaustFansValidation.createSchema),
    ExhaustFansController.createExhaustFans,
  )
  .get(
    auth(ROLE.ADMIN, ROLE.SUPER_ADMIN),
    ExhaustFansController.getAllExhaustFans,
  );

router
  .route('/my')
  .get(auth(ROLE.USER), ExhaustFansController.getMyAllExhaustFans);

router
  .route('/:id')
  .get(
    auth(ROLE.USER),
    validateRequest(ExhaustFansValidation.idParamsSchema),
    ExhaustFansController.getSingleExhaustFans,
  )
  .patch(
    auth(ROLE.USER),
    uploadExhaustFansImages,
    validateRequestFromFormData(ExhaustFansValidation.updateSchema),
    ExhaustFansController.updateSingleExhaustFans,
  )
  .delete(
    auth(ROLE.USER),
    validateRequest(ExhaustFansValidation.idParamsSchema),
    ExhaustFansController.deleteSingleExhaustFans,
  );

export const ExhaustFansRoutes = router;
