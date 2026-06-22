import { Router } from 'express';
import { auth, validateRequest } from '../../middlewares';
import { ROLE } from '../User/user.constant';
import { FAQController } from './FAQ.controller';
import { FAQValidation } from './FAQ.validation';

const router = Router();

router
  .route('/')
  .post(
    auth(ROLE.ADMIN, ROLE.SUPER_ADMIN),
    validateRequest(FAQValidation.createSchema),
    FAQController.createFAQ,
  )
  .get(FAQController.getAllFAQs);

router
  .route('/:id')
  .get(
    validateRequest(FAQValidation.idParamsSchema),
    FAQController.getSingleFAQ,
  )
  .patch(
    auth(ROLE.ADMIN, ROLE.SUPER_ADMIN),
    validateRequest(FAQValidation.updateSchema),
    FAQController.updateFAQ,
  )
  .delete(
    auth(ROLE.ADMIN, ROLE.SUPER_ADMIN),
    validateRequest(FAQValidation.idParamsSchema),
    FAQController.deleteFAQ,
  );

export const FAQRoutes = router;
