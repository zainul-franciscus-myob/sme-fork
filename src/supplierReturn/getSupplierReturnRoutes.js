import ReceiveRefundModule from '../receiveRefund/receiveRefund/ReceiveRefundModule';
import SupplierReturnListModule from './supplierReturnList/SupplierReturnListModule';
import SupplierReturnPurchaseModule from '../supplierReturnPurchase/SupplierReturnPurchaseModule';

export const SUPPLIER_RETURN_LIST = 'supplierReturnList';
const SUPPLIER_RETURN_RECEIVE_REFUND = 'supplierReturnReceiveRefund';
const SUPPLIER_RETURN_APPLY_TO_PURCHASE = 'supplierReturnPurchase';

const getSupplierReturnRoutes = ({
  integration, setRootView, popMessages, pushMessage,
}) => {
  const routes = [
    {
      name: SUPPLIER_RETURN_LIST,
      path: '/',
      module: new SupplierReturnListModule({
        integration, setRootView, popMessages,
      }),
      documentTitle: 'Supplier returns',
    },
    {
      name: SUPPLIER_RETURN_RECEIVE_REFUND,
      path: '/:supplierReturnId/receiveRefund/new',
      module: new ReceiveRefundModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Receive refund',
    },
    {
      name: SUPPLIER_RETURN_APPLY_TO_PURCHASE,
      path: '/:supplierReturnId/applyToPurchase/new',
      module: new SupplierReturnPurchaseModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Apply to purchase',
    },
  ];

  return routes;
};

export default getSupplierReturnRoutes;
