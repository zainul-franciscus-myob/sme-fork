import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getTaxRoutes = () => [
  {
    name: RouteName.TAX_LIST,
    path: '/:region/:businessId/tax/',
    loadModule: () => import('./taxList/TaxListModule'),
    documentTitle: 'Tax codes',
  },
];

export default getTaxRoutes;
