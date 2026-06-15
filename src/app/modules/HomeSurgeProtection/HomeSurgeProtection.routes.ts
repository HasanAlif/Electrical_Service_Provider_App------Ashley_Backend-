import { Router } from 'express';
import {
  auth,
  validateRequest,
  validateRequestFromFormData,
} from '../../middlewares';
import { ROLE } from '../User/user.constant';
import { HomeSurgeProtectionController } from './HomeSurgeProtection.controller';
import { HomeSurgeProtectionValidation } from './HomeSurgeProtection.validation';
import { multerUpload } from '../../lib';

const router = Router();

const uploadHomeSurgeProtectionImages = multerUpload.fields([
  { name: 'photosOfElectricalPanel', maxCount: 10 },
]);

router
  .route('/')
  .post(
    auth(ROLE.USER),
    uploadHomeSurgeProtectionImages,
    validateRequestFromFormData(HomeSurgeProtectionValidation.createSchema),
    HomeSurgeProtectionController.createHomeSurgeProtection,
  )
  .get(
    auth(ROLE.ADMIN, ROLE.SUPER_ADMIN),
    HomeSurgeProtectionController.getAllHomeSurgeProtections,
  );

router
  .route('/my')
  .get(
    auth(ROLE.USER),
    HomeSurgeProtectionController.getMyAllHomeSurgeProtections,
  );

router
  .route('/:id')
  .get(
    auth(ROLE.USER),
    validateRequest(HomeSurgeProtectionValidation.idParamsSchema),
    HomeSurgeProtectionController.getSingleHomeSurgeProtection,
  )
  .patch(
    auth(ROLE.USER),
    uploadHomeSurgeProtectionImages,
    validateRequestFromFormData(HomeSurgeProtectionValidation.updateSchema),
    HomeSurgeProtectionController.updateSingleHomeSurgeProtection,
  )
  .delete(
    auth(ROLE.USER),
    validateRequest(HomeSurgeProtectionValidation.idParamsSchema),
    HomeSurgeProtectionController.deleteSingleHomeSurgeProtection,
  );

export const HomeSurgeProtectionRoutes = router;
