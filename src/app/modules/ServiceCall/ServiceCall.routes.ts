import { Router } from 'express';
import { ServiceCallController } from './ServiceCall.controller';
import { validateRequest, auth } from '../../middlewares';
import { ServiceCallValidation } from './ServiceCall.validation';
import { ROLE } from '../User/user.constant';

const router = Router();

router
  .route('/')
  .post(
    auth(ROLE.USER),
    validateRequest(ServiceCallValidation.createServiceCallSchema),
    ServiceCallController.createServiceCall,
  )
  .get(ServiceCallController.getAllServiceCalls);

router
  .route('/my')
  .get(auth(ROLE.USER), ServiceCallController.getMyServiceCalls);

router
  .route('/:id')
  .get(
    validateRequest(ServiceCallValidation.serviceCallIdParamsSchema),
    ServiceCallController.getSingleServiceCall,
  );

router
  .route('/:id/status')
  .patch(
    validateRequest(ServiceCallValidation.updateServiceCallStatusSchema),
    ServiceCallController.updateServiceCallStatus,
  );

export const ServiceCallRoutes = router;
