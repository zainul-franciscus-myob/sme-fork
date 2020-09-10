import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getSuperFundRoutes = () => [
  {
    name: RouteName.SUPER_FUND_DETAIL,
    path: '/:region/:businessId/superFund/:superFundId',
    loadModule: () => import('./SuperFundModule'),
    documentTitle: 'Superannuation fund',
  },
];

export default getSuperFundRoutes;
