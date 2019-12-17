import ApplyToSaleModule from '../applyToSale/ApplyToSaleModule';
import CustomerReturnListModule from './customerReturnList/CustomerReturnListModule';
import PayRefundModule from '../../payRefund/payRefund/PayRefundModule';
import RouteName from '../../router/RouteName';

export const CUSTOMER_RETURN_LIST_ROUTE = 'customerReturnList';

const getCustomerReturnRoutes = ({
  integration, setRootView, popMessages, pushMessage,
}) => {
  const routes = [
    {
      name: RouteName.CUSTOMER_RETURN_LIST,
      path: '/:region/:businessId/customerReturn/',
      module: new CustomerReturnListModule({
        integration, setRootView, popMessages,
      }),
      documentTitle: 'Customer returns',
    },
    {
      name: RouteName.CUSTOMER_RETURN_PAY_REFUND,
      path: '/:region/:businessId/customerReturn/:customerReturnId/payRefund/new',
      module: new PayRefundModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Pay refund',
    },
    {
      name: RouteName.CUSTOMER_RETURN_APPLY_TO_SALE,
      path: '/:region/:businessId/customerReturn/:customerReturnId/applyToSale/new',
      module: new ApplyToSaleModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Apply to sale',
    },
  ];

  return routes;
};

export default getCustomerReturnRoutes;
