import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getBillPaymentRoutes = () => [
  {
    name: RouteName.BILL_PAYMENT_DETAIL,
    path: '/:region/:businessId/billPayment/:billPaymentId',
    loadModule: () => import('./billPaymentDetail/BillPaymentDetailModule'),
    documentTitle: 'Payment to supplier',
  },
];

export default getBillPaymentRoutes;
