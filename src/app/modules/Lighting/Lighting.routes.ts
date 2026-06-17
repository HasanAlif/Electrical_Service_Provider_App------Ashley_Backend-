import { Router } from 'express';
import {
  auth,
  validateRequest,
  validateRequestFromFormData,
} from '../../middlewares';
import { ROLE } from '../User/user.constant';
import { LightingController } from './Lighting.controller';
import { LightingValidation } from './Lighting.validation';
import { multerUpload } from '../../lib';

const router = Router();

const uploadLightingImages = multerUpload.fields([
  { name: 'photosOfWhereWantToInstall', maxCount: 10 },
  { name: 'photosOfCurrentLightFixture', maxCount: 10 },
  { name: 'photosOfNewLightFixture', maxCount: 10 },
  { name: 'photosOfInstallationAreaFloodLight', maxCount: 10 },
  { name: 'photosOfCurrentFloodLight', maxCount: 10 },
  { name: 'photosOfNewFloodLight', maxCount: 10 },
]);

router
  .route('/')
  .post(
    auth(ROLE.USER),
    uploadLightingImages,
    validateRequestFromFormData(LightingValidation.createSchema),
    LightingController.createLighting,
  )
  .get(auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), LightingController.getAllLightings);

router.route('/my').get(auth(ROLE.USER), LightingController.getMyAllLightings);

router
  .route('/:id')
  .get(
    auth(ROLE.USER),
    validateRequest(LightingValidation.idParamsSchema),
    LightingController.getSingleLighting,
  )
  .patch(
    auth(ROLE.USER),
    uploadLightingImages,
    validateRequestFromFormData(LightingValidation.updateSchema),
    LightingController.updateSingleLighting,
  )
  .delete(
    auth(ROLE.USER),
    validateRequest(LightingValidation.idParamsSchema),
    LightingController.deleteSingleLighting,
  );

export const LightingRoutes = router;
