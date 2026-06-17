import { Router } from 'express';
import {
  auth,
  validateRequest,
  validateRequestFromFormData,
} from '../../middlewares';
import { ROLE } from '../User/user.constant';
import { CellingFansController } from './CellingFans.controller';
import { CellingFansValidation } from './CellingFans.validation';
import { multerUpload } from '../../lib';

const router = Router();

const uploadCellingFansImages = multerUpload.fields([
  { name: 'photosOfCurrentCeilingFan', maxCount: 10 },
  { name: 'photosOfNewCeilingFan', maxCount: 10 },
]);

router
  .route('/')
  .post(
    auth(ROLE.USER),
    uploadCellingFansImages,
    validateRequestFromFormData(CellingFansValidation.createSchema),
    CellingFansController.createCellingFans,
  )
  .get(
    auth(ROLE.ADMIN, ROLE.SUPER_ADMIN),
    CellingFansController.getAllCellingFans,
  );

router
  .route('/my')
  .get(auth(ROLE.USER), CellingFansController.getMyAllCellingFans);

router
  .route('/:id')
  .get(
    auth(ROLE.USER),
    validateRequest(CellingFansValidation.idParamsSchema),
    CellingFansController.getSingleCellingFans,
  )
  .patch(
    auth(ROLE.USER),
    uploadCellingFansImages,
    validateRequestFromFormData(CellingFansValidation.updateSchema),
    CellingFansController.updateSingleCellingFans,
  )
  .delete(
    auth(ROLE.USER),
    validateRequest(CellingFansValidation.idParamsSchema),
    CellingFansController.deleteSingleCellingFans,
  );

export const CellingFansRoutes = router;
