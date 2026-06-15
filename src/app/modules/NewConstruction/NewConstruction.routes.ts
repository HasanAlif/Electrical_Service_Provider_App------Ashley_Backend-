import { Router } from 'express';
import {
  auth,
  validateRequest,
  validateRequestFromFormData,
} from '../../middlewares';
import { ROLE } from '../User/user.constant';
import { NewConstructionController } from './NewConstruction.controller';
import { NewConstructionValidation } from './NewConstruction.validation';
import { multerUpload } from '../../lib';

const router = Router();

const uploadNewConstructionImages = multerUpload.fields([
  { name: 'photosOfBuildingPlans', maxCount: 10 },
]);

router
  .route('/')
  .post(
    auth(ROLE.USER),
    uploadNewConstructionImages,
    validateRequestFromFormData(NewConstructionValidation.createSchema),
    NewConstructionController.createNewConstruction,
  )
  .get(
    auth(ROLE.ADMIN, ROLE.SUPER_ADMIN),
    NewConstructionController.getAllNewConstructions,
  );

router
  .route('/my')
  .get(auth(ROLE.USER), NewConstructionController.getMyAllNewConstructions);

router
  .route('/:id')
  .get(
    auth(ROLE.USER),
    validateRequest(NewConstructionValidation.idParamsSchema),
    NewConstructionController.getSingleNewConstruction,
  )
  .patch(
    auth(ROLE.USER),
    uploadNewConstructionImages,
    validateRequestFromFormData(NewConstructionValidation.updateSchema),
    NewConstructionController.updateSingleNewConstruction,
  )
  .delete(
    auth(ROLE.USER),
    validateRequest(NewConstructionValidation.idParamsSchema),
    NewConstructionController.deleteSingleNewConstruction,
  );

export const NewConstructionRoutes = router;
