import RouteName from '../../router/RouteName';
import SalesSettingsDetailModule from './salesSettingsDetail/SalesSettingsDetailModule';

const getSalesSettingsRoutes = ({
  setRootView, integration, popMessages,
}) => {
  const routes = [
    {
      name: RouteName.SALES_SETTINGS,
      path: '/:region/:businessId/salesSettings/',
      module: new SalesSettingsDetailModule({ setRootView, integration, popMessages }),
      documentTitle: 'Invoice and quote settings',
    },
  ];

  return routes;
};

export default getSalesSettingsRoutes;
