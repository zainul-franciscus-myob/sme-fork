import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getCustomerReturnRoutes = () => [
  {
    name: RouteName.CUSTOMER_RETURN_LIST,
    path: '/:region/:businessId/customerReturn/',
    loadModule: () => import('./customerReturnList/CustomerReturnListModule'),
    documentTitle: 'Customer returns',
  },
  {
    name: RouteName.CUSTOMER_RETURN_PAY_REFUND,
    path: '/:region/:businessId/customerReturn/:customerReturnId/payRefund/new',
    loadModule: () => import('../payRefund/payRefund/PayRefundModule'),
    documentTitle: 'Pay refund',
  },
  {
    name: RouteName.CUSTOMER_RETURN_APPLY_TO_SALE,
    path:
      '/:region/:businessId/customerReturn/:customerReturnId/applyToSale/new',
    loadModule: () => import('../applyToSale/ApplyToSaleModule'),
    documentTitle: 'Apply to sale',
  },
];

export default getCustomerReturnRoutes;
