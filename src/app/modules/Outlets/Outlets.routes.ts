import { Router } from 'express';
import {
  auth,
  validateRequest,
  validateRequestFromFormData,
} from '../../middlewares';
import { ROLE } from '../User/user.constant';
import { OutletsController } from './Outlets.controller';
import { OutletsValidation } from './Outlets.validation';
import { multerUpload } from '../../lib';

const router = Router();

const uploadOutletsImages = multerUpload.fields([
  { name: 'photosOfWhereOutletsInstall', maxCount: 10 },
  { name: 'photosOfCurrentOutlets', maxCount: 10 },
]);

router
  .route('/')
  .post(
    auth(ROLE.USER),
    uploadOutletsImages,
    validateRequestFromFormData(OutletsValidation.createSchema),
    OutletsController.createOutlets,
  )
  .get(auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), OutletsController.getAllOutlets);

router.route('/my').get(auth(ROLE.USER), OutletsController.getMyAllOutlets);

router
  .route('/:id')
  .get(
    auth(ROLE.USER),
    validateRequest(OutletsValidation.idParamsSchema),
    OutletsController.getSingleOutlets,
  )
  .patch(
    auth(ROLE.USER),
    uploadOutletsImages,
    validateRequestFromFormData(OutletsValidation.updateSchema),
    OutletsController.updateSingleOutlets,
  )
  .delete(
    auth(ROLE.USER),
    validateRequest(OutletsValidation.idParamsSchema),
    OutletsController.deleteSingleOutlets,
  );

export const OutletsRoutes = router;
