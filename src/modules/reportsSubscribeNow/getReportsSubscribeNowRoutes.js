import ReportsSubscribeNowModule from './ReportsSubscribeNowModule';
import RouteName from '../../router/RouteName';

const getReportsSubscribeNowRoutes = ({ integration, navigateTo }) => {
  const routes = [
    {
      name: RouteName.REPORTS_SUBSCRIBE_NOW,
      path: '/:region/:businessId/reportsSubscribeNow',
      module: new ReportsSubscribeNowModule({ integration, navigateTo }),
      documentTitle: 'Redirecting...',
    },
  ];

  return routes;
};

export default getReportsSubscribeNowRoutes;
