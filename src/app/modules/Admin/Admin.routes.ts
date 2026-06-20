import { Router } from 'express';
import { auth } from '../../middlewares';
import { ROLE } from '../User/user.constant';
import { AdminController } from './Admin.controller';

const router = Router();

router
  .route('/quotes')
  .get(auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), AdminController.getAllQuotes);

export const AdminRoutes = router;
