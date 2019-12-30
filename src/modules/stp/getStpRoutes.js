import RouteName from '../../router/RouteName';
import StpGetStartedModule from './stpGetStarted/StpGetStartedModule';
import StpSetupModule from './stpSetup/StpSetupModule';

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
    {
      name: RouteName.STP_SETUP,
      path: '/:region/:businessId/stp/setup',
      module: new StpSetupModule({
        integration, setRootView,
      }),
      documentTitle: 'Set up STP reporting',
    },
  ];

  return routes;
};

export default getStpRoutes;
