import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getBusinessRoutes = () => [
  {
    name: RouteName.BUSINESS_SETTINGS,
    path: '/:region/:businessId/',
    allowedParams: ['selectedTab'],
    loadModule: () => import('./businessSettings/businessSettingsModule'),
    documentTitle: 'Business settings',
  },
];

export default getBusinessRoutes;
