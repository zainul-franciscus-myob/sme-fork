import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getBusinessListRoutes = () => [
  {
    name: RouteName.BUSINESS_LIST,
    path: '/businesses',
    loadModule: () => import('./businessList/BusinessListModule'),
    documentTitle: 'My businesses',
  },
];

export default getBusinessListRoutes;
