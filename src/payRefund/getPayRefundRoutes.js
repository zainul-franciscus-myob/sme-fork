import PayRefundModule from './payRefund/PayRefundModule';
import RouteName from '../router/RouteName';

const getPayRefundRoutes = ({
  integration, setRootView, pushMessage,
}) => {
  const routes = [
    {
      name: RouteName.PAY_REFUND,
      path: '/:region/:businessId/payRefund/:refundId',
      module: new PayRefundModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Pay refund',
    },
  ];

  return routes;
};

export default getPayRefundRoutes;
