import ReceiveRefundModule from './receiveRefund/ReceiveRefundModule';
import RouteName from '../../router/RouteName';

const getReceiveRefundRoutes = ({ integration, setRootView, pushMessage }) => {
  const routes = [
    {
      name: RouteName.RECEIVE_REFUND,
      path: '/:region/:businessId/receiveRefund/:refundId',
      module: new ReceiveRefundModule({
        integration,
        setRootView,
        pushMessage,
      }),
      documentTitle: 'Receive refund',
    },
  ];

  return routes;
};

export default getReceiveRefundRoutes;
