import { Router } from 'express';
import {
  auth,
  validateRequest,
  validateRequestFromFormData,
} from '../../middlewares';
import { ROLE } from '../User/user.constant';
import { GenaratorController } from './Genarator.controller';
import { GenaratorValidation } from './Genarator.validation';
import { multerUpload } from '../../lib';

const router = Router();

const uploadGenaratorImages = multerUpload.fields([
  { name: 'photosOfWhereGeneratorWillBeInlet', maxCount: 10 },
  { name: 'photosOfReceptacleOnGenerator', maxCount: 10 },
  { name: 'electricPanelPhotos', maxCount: 10 },
  { name: 'generatorInstallationLocationPhotos', maxCount: 10 },
  { name: 'photosOfElectricalMeter', maxCount: 10 },
]);

router
  .route('/')
  .post(
    auth(ROLE.USER),
    uploadGenaratorImages,
    validateRequestFromFormData(GenaratorValidation.createSchema),
    GenaratorController.createGenarator,
  )
  .get(
    auth(ROLE.ADMIN, ROLE.SUPER_ADMIN),
    GenaratorController.getAllGenarators,
  );

router
  .route('/my')
  .get(auth(ROLE.USER), GenaratorController.getMyAllGenarators);

router
  .route('/:id')
  .get(
    auth(ROLE.USER),
    validateRequest(GenaratorValidation.idParamsSchema),
    GenaratorController.getSingleGenarator,
  )
  .patch(
    auth(ROLE.USER),
    uploadGenaratorImages,
    validateRequestFromFormData(GenaratorValidation.updateSchema),
    GenaratorController.updateSingleGenarator,
  )
  .delete(
    auth(ROLE.USER),
    validateRequest(GenaratorValidation.idParamsSchema),
    GenaratorController.deleteSingleGenarator,
  );

export const GenaratorRoutes = router;
