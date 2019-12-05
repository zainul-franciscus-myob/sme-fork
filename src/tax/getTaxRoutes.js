import TaxListModule from './taxList/TaxListModule';

const getTaxRoutes = ({
  integration, setRootView,
}) => {
  const routes = [
    {
      name: 'taxList',
      path: '/',
      module: new TaxListModule({ integration, setRootView }),
      documentTitle: 'Tax codes',
    },
  ];

  return routes;
};

export default getTaxRoutes;
