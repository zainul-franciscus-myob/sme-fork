import ReceiveRefundModule from '../receiveRefund/receiveRefund/ReceiveRefundModule';
import RouteName from '../../router/RouteName';
import SupplierReturnListModule from './supplierReturnList/SupplierReturnListModule';
import SupplierReturnPurchaseModule from '../supplierReturnPurchase/SupplierReturnPurchaseModule';

const getSupplierReturnRoutes = ({
  integration, setRootView, popMessages, pushMessage,
}) => {
  const routes = [
    {
      name: RouteName.SUPPLIER_RETURN_LIST,
      path: '/:region/:businessId/supplierReturn/',
      module: new SupplierReturnListModule({
        integration, setRootView, popMessages,
      }),
      documentTitle: 'Supplier returns',
    },
    {
      name: RouteName.SUPPLIER_RETURN_RECEIVE_REFUND,
      path: '/:region/:businessId/supplierReturn/:supplierReturnId/receiveRefund/new',
      module: new ReceiveRefundModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Receive refund',
    },
    {
      name: RouteName.SUPPLIER_RETURN_PURCHASE,
      path: '/:region/:businessId/supplierReturn/:supplierReturnId/applyToPurchase/new',
      module: new SupplierReturnPurchaseModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Apply to purchase',
    },
  ];

  return routes;
};

export default getSupplierReturnRoutes;
