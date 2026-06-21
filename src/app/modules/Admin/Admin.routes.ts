import { Router } from 'express';
import { auth, validateRequest } from '../../middlewares';
import { ROLE } from '../User/user.constant';
import { AdminController } from './Admin.controller';
import { AdminValidation } from './Admin.validation';

const router = Router();

router
  .route('/quotes')
  .get(auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), AdminController.getAllQuotes);

router
  .route('/quotes/:id')
  .get(
    auth(ROLE.ADMIN, ROLE.SUPER_ADMIN),
    validateRequest(AdminValidation.idParamsSchema),
    AdminController.getSingleQuote,
  );

router
  .route('/quotes/:id/status')
  .patch(
    auth(ROLE.ADMIN, ROLE.SUPER_ADMIN),
    validateRequest(AdminValidation.updateQuoteStatusSchema),
    AdminController.updateQuoteStatus,
  );

export const AdminRoutes = router;
