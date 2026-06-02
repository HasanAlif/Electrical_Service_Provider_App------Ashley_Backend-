import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { ServiceCallRoutes } from '../modules/ServiceCall/ServiceCall.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/service-calls',
    route: ServiceCallRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
