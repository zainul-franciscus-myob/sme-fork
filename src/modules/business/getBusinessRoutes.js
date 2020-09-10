import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getBusinessRoutes = () => [
  {
    name: RouteName.BUSINESS_DETAIL,
    path: '/:region/:businessId/',
    loadModule: () => import('./businessDetail/businessDetailModule'),
    documentTitle: 'Business details',
  },
];

export default getBusinessRoutes;
