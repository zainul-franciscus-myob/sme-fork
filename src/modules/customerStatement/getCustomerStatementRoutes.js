import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getCustomerStatementRoutes = () => [
  {
    name: RouteName.CUSTOMER_STATEMENT_LIST,
    path: '/:region/:businessId/customerStatement/',
    loadModule: () => import('./CustomerStatementListModule'),
    documentTitle: 'Customer statements',
  },
];

export default getCustomerStatementRoutes;
