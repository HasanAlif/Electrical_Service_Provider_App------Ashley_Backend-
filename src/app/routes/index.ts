import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { AddressRoutes } from '../modules/Address/address.route';
import { ServiceCallRoutes } from '../modules/ServiceCall/ServiceCall.routes';
import { EVChargerInstallationRoutes } from '../modules/EVChargerInstallation/EVChargerInstallation.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/addresses',
    route: AddressRoutes,
  },
  {
    path: '/service-calls',
    route: ServiceCallRoutes,
  },
  {
    path: '/ev-charger-installations',
    route: EVChargerInstallationRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
