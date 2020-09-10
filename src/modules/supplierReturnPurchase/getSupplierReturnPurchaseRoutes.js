import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getSupplierReturnPurchaseRoutes = () => [
  {
    name: RouteName.SUPPLIER_RETURN_PURCHASES,
    path: '/:region/:businessId/appliedPurchaseReturn/:purchaseReturnId',
    loadModule: () => import('./SupplierReturnPurchaseModule'),
    documentTitle: 'Applied to purchase',
  },
];

export default getSupplierReturnPurchaseRoutes;
