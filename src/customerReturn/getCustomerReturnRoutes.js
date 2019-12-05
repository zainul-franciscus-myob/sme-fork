import ApplyToSaleModule from '../applyToSale/ApplyToSaleModule';
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
      documentTitle: 'Customer returns',
    },
    {
      name: 'customerReturnPayRefund',
      path: '/:customerReturnId/payRefund/new',
      module: new PayRefundModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Pay refund',
    },
    {
      name: 'customerReturnApplyToSale',
      path: '/:customerReturnId/applyToSale/new',
      module: new ApplyToSaleModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Apply to sale',
    },
  ];

  return routes;
};

export default getCustomerReturnRoutes;
