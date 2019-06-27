import SupplierReturnPurchaseModule from './SupplierReturnPurchaseModule';

const getSupplierReturnPurchaseRoutes = ({
  integration, setRootView, pushMessage,
}) => {
  const routes = [
    {
      name: 'supplierReturnPurchases',
      path: '/:purchaseReturnId',
      module: new SupplierReturnPurchaseModule({
        integration, setRootView, pushMessage,
      }),
    },
  ];

  return routes;
};

export default getSupplierReturnPurchaseRoutes;
