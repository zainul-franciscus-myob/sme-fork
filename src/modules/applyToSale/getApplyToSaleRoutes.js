import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getApplyToSaleRoutes = () => [
  {
    name: RouteName.APPLY_TO_SALE,
    path: '/:region/:businessId/applyToSale/:applyToSaleId',
    loadModule: () => import('./ApplyToSaleModule'),
    documentTitle: 'Apply to sale',
  },
];

export default getApplyToSaleRoutes;
