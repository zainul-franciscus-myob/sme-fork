import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getPayRunRoutes = () => [
  {
    name: RouteName.PAY_RUN_CREATE,
    path: '/au/:businessId/payRun/new',
    defaultParams: { region: 'au' },
    loadModule: () => import('./payRunCreate/PayRunModule'),
    documentTitle: 'Pay run',
  },
  {
    name: RouteName.PAY_RUN_LIST,
    path: '/au/:businessId/payRun/',
    defaultParams: { region: 'au' },
    loadModule: () => import('./payRunList/PayRunListModule'),
    documentTitle: 'Pay runs',
  },
  {
    name: RouteName.PAY_RUN_DETAIL,
    path: '/au/:businessId/payRun/:payRunId',
    defaultParams: { region: 'au' },
    loadModule: () => import('./payRunDetail/payRunDetailModule'),
    documentTitle: 'Pay run',
  },
];

export default getPayRunRoutes;
