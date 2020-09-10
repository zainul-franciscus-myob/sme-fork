import RouteName from '../../../router/RouteName';

/** @type {import('../../module-types').RouteConfig} */
const getPayRunRoutes = () => [
  {
    name: RouteName.PAY_RUN_CREATE_NZ,
    path: '/nz/:businessId/payRun/new',
    defaultParams: { region: 'nz' },
    loadModule: () => import('./payRunCreate/PayRunModule'),
    documentTitle: 'Pay run',
  },
];

export default getPayRunRoutes;
