import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getSupplierReturnRoutes = () => [
  {
    name: RouteName.SUPPLIER_RETURN_LIST,
    path: '/:region/:businessId/supplierReturn/',
    loadModule: () => import('./supplierReturnList/SupplierReturnListModule'),
    documentTitle: 'Supplier returns',
  },
  {
    name: RouteName.SUPPLIER_RETURN_RECEIVE_REFUND,
    path:
      '/:region/:businessId/supplierReturn/:supplierReturnId/receiveRefund/new',
    loadModule: () =>
      import('../receiveRefund/receiveRefund/ReceiveRefundModule'),
    documentTitle: 'Receive refund',
  },
  {
    name: RouteName.SUPPLIER_RETURN_PURCHASE,
    path:
      '/:region/:businessId/supplierReturn/:supplierReturnId/applyToPurchase/new',
    loadModule: () =>
      import('../supplierReturnPurchase/SupplierReturnPurchaseModule'),
    documentTitle: 'Apply to purchase',
  },
];

export default getSupplierReturnRoutes;
