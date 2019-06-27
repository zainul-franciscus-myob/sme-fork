import ReceiveRefundModule from '../receiveRefund/receiveRefund/ReceiveRefundModule';
import SupplierReturnListModule from './supplierReturnList/SupplierReturnListModule';
import SupplierReturnPurchaseModule from '../supplierReturnPurchase/SupplierReturnPurchaseModule';

const getSupplierReturnRoutes = ({
  integration, setRootView, popMessages, pushMessage,
}) => {
  const routes = [
    {
      name: 'supplierReturnList',
      path: '/',
      module: new SupplierReturnListModule({
        integration, setRootView, popMessages,
      }),
    },
    {
      name: 'supplierReturnReceiveRefund',
      path: '/:supplierReturnId/receiveRefund/new',
      module: new ReceiveRefundModule({
        integration, setRootView, pushMessage,
      }),
    },
    {
      name: 'supplierReturnPurchase',
      path: '/:supplierReturnId/applyToPurchase/new',
      module: new SupplierReturnPurchaseModule({
        integration, setRootView, pushMessage,
      }),
    },
  ];

  return routes;
};

export default getSupplierReturnRoutes;
