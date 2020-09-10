import RouteName from '../../router/RouteName';
import TaxListModule from './taxList/TaxListModule';

const getTaxRoutes = ({ integration, setRootView }) => {
  const routes = [
    {
      name: RouteName.TAX_LIST,
      path: '/:region/:businessId/tax/',
      module: new TaxListModule({ integration, setRootView }),
      documentTitle: 'Tax codes',
    },
  ];

  return routes;
};

export default getTaxRoutes;
