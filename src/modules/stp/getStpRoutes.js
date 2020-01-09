import ReportingCentreModule from './reportingCentre/ReportingCentreModule';
import RouteName from '../../router/RouteName';
import StpErrorsModule from './stpErrors/StpErrorsModule';
import StpGetStartedModule from './stpGetStarted/StpGetStartedModule';
import StpSetupModule from './stpSetup/StpSetupModule';

const getStpRoutes = ({
  integration, setRootView, replaceURLParams,
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
    {
      name: RouteName.STP_ERRORS,
      path: '/:region/:businessId/stp/errors',
      module: new StpErrorsModule({
        integration, setRootView,
      }),
      documentTitle: 'STP Errors',
    },
    {
      name: RouteName.STP_REPORTING_CENTRE,
      allowedParams: ['tab'],
      path: '/:region/:businessId/stp/reportingCentre',
      module: new ReportingCentreModule({
        integration, setRootView, replaceURLParams,
      }),
      documentTitle: 'Single Touch Payroll reporting',
    },
  ];

  return routes;
};

export default getStpRoutes;
