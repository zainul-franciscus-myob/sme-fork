import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getReceiveRefundRoutes = () => [
  {
    name: RouteName.RECEIVE_REFUND,
    path: '/:region/:businessId/receiveRefund/:refundId',
    loadModule: () => import('./receiveRefund/ReceiveRefundModule'),
    documentTitle: 'Receive refund',
  },
];

export default getReceiveRefundRoutes;
