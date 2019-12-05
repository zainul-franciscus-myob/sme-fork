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
      documentTitle: 'Applied to purchase',
    },
  ];

  return routes;
};

export default getSupplierReturnPurchaseRoutes;
