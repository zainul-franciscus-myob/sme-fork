/** @type {import('../module-types').RouteConfig} */

import RouteName from '../../router/RouteName';

const getPurchaseOrderRoutes = () => {
  const routes = [
    {
      name: RouteName.PURCHASE_ORDER_LIST,
      path: '/:region/:businessId/purchaseOrder/',
      allowedParams: [
        'dateFrom',
        'dateTo',
        'keywords',
        'supplierId',
        'orderBy',
        'sortOrder',
      ],
      loadModule: () => import('./purchaseOrderList/PurchaseOrderListModule'),
      documentTitle: 'Purchases',
    },
    {
      name: RouteName.PURCHASE_ORDER_DETAIL,
      path: '/:region/:businessId/purchaseOrder/:purchaseOrderId',
      loadModule: () => import('./purchaseOrderDetail/PurchaseOrderModule'),
      documentTitle: 'Purchase',
    },
  ];

  return routes;
};

export default getPurchaseOrderRoutes;
