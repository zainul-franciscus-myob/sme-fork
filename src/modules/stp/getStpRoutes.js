import RouteName from '../../router/RouteName';
import StpGetStartedModule from './stpGetStarted/StpGetStartedModule';

const getStpRoutes = ({
  integration, setRootView,
}) => {
  const routes = [
    {
      name: RouteName.STP_GET_STARTED,
      path: '/:region/:businessId/stp/getStarted',
      module: new StpGetStartedModule({
        integration, setRootView,
      }),
      documentTitle: 'STP Get Started',
    },
  ];

  return routes;
};

export default getStpRoutes;
