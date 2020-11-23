import RouteName from '../../../router/RouteName';

/** @type {import('../../module-types').RouteConfig} */
const getBankFeedsRoutes = () => [
  {
    name: RouteName.BANK_FEEDS,
    path: '/:region/:businessId/bankFeeds/',
    loadModule: () => import('./BankFeedsModule'),
    documentTitle: 'Bank feeds',
  },
];

export default getBankFeedsRoutes;
