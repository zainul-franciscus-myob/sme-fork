import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getAccountRoutes = () => [
  {
    name: RouteName.ACCOUNT_LIST,
    path: '/:region/:businessId/account/',
    loadModule: () => import('./accountList/AccountListModule'),
    documentTitle: 'Accounts',
  },
  {
    name: RouteName.ACCOUNT_DETAIL,
    path: '/:region/:businessId/account/:accountId',
    loadModule: () => import('./accountDetail/AccountDetailModule'),
    documentTitle: 'Account',
  },
];

export default getAccountRoutes;
