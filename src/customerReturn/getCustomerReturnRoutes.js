import CustomerReturnListModule from './customerReturnList/CustomerReturnListModule';
import PayRefundModule from '../payRefund/payRefund/PayRefundModule';

const getCustomerReturnRoutes = ({
  integration, setRootView, popMessages, pushMessage,
}) => {
  const routes = [
    {
      name: 'customerReturnList',
      path: '/',
      module: new CustomerReturnListModule({
        integration, setRootView, popMessages,
      }),
    },
    {
      name: 'customerReturnPayRefund',
      path: '/:customerReturnId/payRefund/new',
      module: new PayRefundModule({
        integration, setRootView, pushMessage,
      }),
    },
  ];

  return routes;
};

export default getCustomerReturnRoutes;
