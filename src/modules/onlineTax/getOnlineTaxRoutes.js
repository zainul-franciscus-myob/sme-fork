import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getOnlineTaxRoutes = () => [
  {
    name: RouteName.ONLINE_TAX,
    path: '/:region/:businessId/onlineTax/',
    loadModule: () => import('./OnlineTaxModule'),
    documentTitle: 'Online tax',
  },
];

export default getOnlineTaxRoutes;
