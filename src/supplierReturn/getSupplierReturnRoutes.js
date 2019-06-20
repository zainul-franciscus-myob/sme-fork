import SupplierReturnListModule from './supplierReturnList/SupplierReturnListModule';

const getSupplierReturnRoutes = ({
  integration, setRootView,
}) => {
  const routes = [
    {
      name: 'supplierReturnList',
      path: '/',
      module: new SupplierReturnListModule({
        integration, setRootView,
      }),
    },
  ];

  return routes;
};

export default getSupplierReturnRoutes;
