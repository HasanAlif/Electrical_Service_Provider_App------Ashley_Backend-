import { Router } from 'express';
import {
  auth,
  validateRequest,
  validateRequestFromFormData,
} from '../../middlewares';
import { ROLE } from '../User/user.constant';
import { StarlinkController } from './Starlink.controller';
import { StarlinkValidation } from './Starlink.validation';
import { multerUpload } from '../../lib';

const router = Router();

const uploadStarlinkImages = multerUpload.fields([
  { name: 'areaOfInstallationPhotos', maxCount: 10 },
  { name: 'photosOfRoomForRouter', maxCount: 10 },
]);

router
  .route('/')
  .post(
    auth(ROLE.USER),
    uploadStarlinkImages,
    validateRequestFromFormData(StarlinkValidation.createSchema),
    StarlinkController.createStarlink,
  )
  .get(auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), StarlinkController.getAllStarlinks);

router.route('/my').get(auth(ROLE.USER), StarlinkController.getMyAllStarlinks);

router
  .route('/:id')
  .get(
    auth(ROLE.USER),
    validateRequest(StarlinkValidation.idParamsSchema),
    StarlinkController.getSingleStarlink,
  )
  .patch(
    auth(ROLE.USER),
    uploadStarlinkImages,
    validateRequestFromFormData(StarlinkValidation.updateSchema),
    StarlinkController.updateSingleStarlink,
  )
  .delete(
    auth(ROLE.USER),
    validateRequest(StarlinkValidation.idParamsSchema),
    StarlinkController.deleteSingleStarlink,
  );

export const StarlinkRoutes = router;
