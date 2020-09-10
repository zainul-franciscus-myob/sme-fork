import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getPaySuperRoutes = () => [
  {
    name: RouteName.PAY_SUPER_LIST,
    path: '/:region/:businessId/paySuper/',
    loadModule: () => import('./paySuperList/PaySuperListModule'),
    documentTitle: 'Pay super',
  },
  {
    name: RouteName.PAY_SUPER_CREATE,
    path: '/:region/:businessId/paySuper/new',
    loadModule: () => import('./paySuperCreate/PaySuperCreateModule'),
    documentTitle: 'Pay super',
  },
  {
    name: RouteName.PAY_SUPER_READ,
    path: '/:region/:businessId/paySuper/:businessEventId',
    loadModule: () => import('./paySuperRead/PaySuperReadModule'),
    documentTitle: 'Pay super',
  },
];

export default getPaySuperRoutes;
