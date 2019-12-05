import ReceiveRefundModule from './receiveRefund/ReceiveRefundModule';

const getReceiveRefundRoutes = ({
  integration, setRootView, pushMessage,
}) => {
  const routes = [
    {
      name: 'receiveRefund',
      path: '/:refundId',
      module: new ReceiveRefundModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Receive refund',
    },
  ];

  return routes;
};

export default getReceiveRefundRoutes;
