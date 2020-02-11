import RouteName from '../../router/RouteName';
import SalesSettingsDetailModule from './salesSettingsDetail/SalesSettingsDetailModule';

const getSalesSettingsRoutes = ({
  setRootView, integration, popMessages, replaceURLParams,
}) => [
  {
    name: RouteName.SALES_SETTINGS,
    path: '/:region/:businessId/salesSettings/',
    allowedParams: ['selectedTab'],
    module: new SalesSettingsDetailModule({
      setRootView, integration, popMessages, replaceURLParams,
    }),
    documentTitle: 'Invoice and quote settings',
  },
];

export default getSalesSettingsRoutes;
