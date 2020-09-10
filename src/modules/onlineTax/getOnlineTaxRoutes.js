import OnlineTaxModule from './OnlineTaxModule';
import RouteName from '../../router/RouteName';

const getOnlineTaxRoutes = ({ integration, setRootView }) => {
  const routes = [
    {
      name: RouteName.ONLINE_TAX,
      path: '/:region/:businessId/onlineTax/',
      module: new OnlineTaxModule({
        integration,
        setRootView,
      }),
      documentTitle: 'Online tax',
    },
  ];

  return routes;
};

export default getOnlineTaxRoutes;
