import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getLinkedAccountsRoutes = () => [
  {
    name: RouteName.LINKED_ACCOUNTS,
    path: '/:region/:businessId/linkedAccounts/',
    loadModule: () => import('./LinkedAccountsModule'),
    documentTitle: 'Linked accounts',
  },
];

export default getLinkedAccountsRoutes;
