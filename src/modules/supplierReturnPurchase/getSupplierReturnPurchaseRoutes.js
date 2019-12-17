import RouteName from '../../router/RouteName';
import SupplierReturnPurchaseModule from './SupplierReturnPurchaseModule';

const getSupplierReturnPurchaseRoutes = ({
  integration, setRootView, pushMessage,
}) => {
  const routes = [
    {
      name: RouteName.SUPPLIER_RETURN_PURCHASES,
      path: '/:region/:businessId/appliedPurchaseReturn/:purchaseReturnId',
      module: new SupplierReturnPurchaseModule({
        integration, setRootView, pushMessage,
      }),
      documentTitle: 'Applied to purchase',
    },
  ];

  return routes;
};

export default getSupplierReturnPurchaseRoutes;
