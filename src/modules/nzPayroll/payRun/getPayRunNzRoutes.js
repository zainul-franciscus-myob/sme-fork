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
  {
    name: RouteName.PAY_RUN_LIST_NZ,
    path: '/nz/:businessId/payRun/',
    defaultParams: { region: 'nz' },
    loadModule: () => import('./payRunList/PayRunListModule'),
    documentTitle: 'Pay runs',
  },
  {
    name: RouteName.PAY_RUN_DETAIL_NZ,
    path: '/nz/:businessId/payRun/:payRunId',
    defaultParams: { region: 'nz' },
    loadModule: () => import('./payRunDetail/PayRunDetailNzModule'),
    documentTitle: 'Pay run',
  },
];

export default getPayRunRoutes;
