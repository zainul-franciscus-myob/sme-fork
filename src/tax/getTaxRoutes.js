import TaxListModule from './taxList/TaxListModule';

const getTaxRoutes = ({
  integration, setRootView,
}) => {
  const routes = [
    {
      name: 'taxList',
      path: '/',
      module: new TaxListModule({ integration, setRootView }),
    },
  ];

  return routes;
};

export default getTaxRoutes;
