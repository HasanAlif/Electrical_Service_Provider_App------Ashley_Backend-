import { Router } from 'express';
import { auth, validateRequest } from '../../middlewares';
import { ROLE } from '../User/user.constant';
import { FAQController } from './FAQ.controller';
import { FAQValidation } from './FAQ.validation';

const router = Router();

router.get('/:type', FAQController.getContentByType);

router.patch(
  '/:type',
  auth(ROLE.ADMIN, ROLE.SUPER_ADMIN),
  validateRequest(FAQValidation.updateAppContentSchema),
  FAQController.createOrUpdateContent,
);

export const appContentRoutes = router;
