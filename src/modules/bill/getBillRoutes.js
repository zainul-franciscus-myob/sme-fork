import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getBillRoutes = () => [
  {
    name: RouteName.BILL_LIST,
    path: '/:region/:businessId/bill/',
    allowedParams: [
      'dateFrom',
      'dateTo',
      'keywords',
      'supplierId',
      'status',
      'orderBy',
      'sortOrder',
    ],
    loadModule: () => import('./billList/BillListModule'),
    documentTitle: 'Bills',
  },
  {
    name: RouteName.BILL_DETAIL,
    path: '/:region/:businessId/bill/:billId',
    loadModule: () => import('./billDetail/BillModule'),
    documentTitle: 'Bill',
  },
];

export default getBillRoutes;
