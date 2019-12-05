import PayRefundModule from './payRefund/PayRefundModule';

const getPayRefundRoutes = ({
  integration, setRootView, pushMessage,
}) => {
  const routes = [
    {
      name: 'payRefund',
      path: '/:refundId',
      module: new PayRefundModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Pay refund',
    },
  ];

  return routes;
};

export default getPayRefundRoutes;
