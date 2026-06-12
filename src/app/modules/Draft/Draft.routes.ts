import { Router } from 'express';
import { DraftController } from './Draft.controller';
import { auth } from '../../middlewares';
import { ROLE } from '../User/user.constant';

const router = Router();

router.route('/').get(auth(ROLE.USER), DraftController.getAllMyDrafts);

export const DraftRoutes = router;
