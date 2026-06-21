import { Router } from 'express';
import { auth, validateRequest } from '../../middlewares';
import { ROLE } from '../User/user.constant';
import { AdminController } from './Admin.controller';
import { AdminValidation } from './Admin.validation';

const router = Router();

router
  .route('/quotes')
  .get(auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), AdminController.getAllQuotes);

// Must precede '/quotes/:id' so 'count'/'search' aren't matched as an :id.
router
  .route('/quotes/count')
  .get(auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), AdminController.getQoutesCount);

router
  .route('/quotes/search')
  .get(
    auth(ROLE.ADMIN, ROLE.SUPER_ADMIN),
    AdminController.searchByNameQidOrEmail,
  );

router
  .route('/quotes/:id')
  .get(
    auth(ROLE.ADMIN, ROLE.SUPER_ADMIN),
    validateRequest(AdminValidation.idParamsSchema),
    AdminController.getSingleQuote,
  );

router
  .route('/quotes/:id/status')
  .get(
    auth(ROLE.ADMIN, ROLE.SUPER_ADMIN),
    validateRequest(AdminValidation.idParamsSchema),
    AdminController.getQouteForUpdate,
  )
  .patch(
    auth(ROLE.ADMIN, ROLE.SUPER_ADMIN),
    validateRequest(AdminValidation.updateQuoteStatusSchema),
    AdminController.updateQuoteStatus,
  );

export const AdminRoutes = router;
