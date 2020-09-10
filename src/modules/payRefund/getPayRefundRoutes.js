import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getPayRefundRoutes = () => [
  {
    name: RouteName.PAY_REFUND,
    path: '/:region/:businessId/payRefund/:refundId',
    loadModule: () => import('./payRefund/PayRefundModule'),
    documentTitle: 'Pay refund',
  },
];

export default getPayRefundRoutes;
