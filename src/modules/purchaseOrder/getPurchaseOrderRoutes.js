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
      documentTitle: 'Purchase',
    },
  ];

  return routes;
};

export default getPurchaseOrderRoutes;
