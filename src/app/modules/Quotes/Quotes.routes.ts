import { Router } from 'express';
import { auth } from '../../middlewares';
import { ROLE } from '../User/user.constant';
import { QuotesController } from './Quotes.controller';

const router = Router();

router.route('/').get(auth(ROLE.USER), QuotesController.getAllMyQuotes);

export const QuotesRoutes = router;
