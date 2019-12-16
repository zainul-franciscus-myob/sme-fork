import RouteName from '../router/RouteName';
import SalesSettingsDetailModule from './salesSettingsDetail/SalesSettingsDetailModule';

const getSalesSettingsRoutes = ({
  setRootView, integration,
}) => {
  const routes = [
    {
      name: RouteName.SALES_SETTINGS,
      path: '/:region/:businessId/salesSettings/',
      module: new SalesSettingsDetailModule({ setRootView, integration }),
      documentTitle: 'Invoice and quote settings',
    },
  ];

  return routes;
};

export default getSalesSettingsRoutes;
