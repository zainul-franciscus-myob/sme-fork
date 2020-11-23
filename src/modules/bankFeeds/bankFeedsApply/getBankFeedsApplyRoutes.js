import RouteName from '../../../router/RouteName';

/** @type {import('../../module-types').RouteConfig} */
const getBankFeedsApplyRoutes = () => [
  {
    name: RouteName.BANK_FEEDS_CREATE,
    path: '/:region/:businessId/bankFeeds/create',
    loadModule: () => import('./BankFeedsApplyModule'),
    documentTitle: 'Create a bank feed',
  },
];

export default getBankFeedsApplyRoutes;
