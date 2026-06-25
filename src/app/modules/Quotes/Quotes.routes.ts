import { Router } from 'express';
import { auth } from '../../middlewares';
import { ROLE } from '../User/user.constant';
import { QuotesController } from './Quotes.controller';

const router = Router();

router.route('/').get(auth(ROLE.USER), QuotesController.getAllMyQuotes);

// Literal paths must precede '/:id' so they aren't captured as an id.
router
  .route('/recent-activity')
  .get(auth(ROLE.USER), QuotesController.getUserRecntActivity);

router
  .route('/search')
  .get(auth(ROLE.USER), QuotesController.searchQuoteAndPartners);

router
  .route('/:id')
  .get(auth(ROLE.USER), QuotesController.getMySingleQuoteActivityDetails);

export const QuotesRoutes = router;
