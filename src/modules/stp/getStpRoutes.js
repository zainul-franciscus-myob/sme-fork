import ReportingCentreModule from './reportingCentre/ReportingCentreModule';
import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getStpRoutes = ({
  integration,
  setRootView,
  replaceURLParams,
  pushMessage,
  popMessages,
  featureToggles,
}) => {
  const routes = [
    {
      name: RouteName.STP_GET_STARTED,
      path: '/:region/:businessId/stp/getStarted',
      loadModule: () => import('./stpGetStarted/StpGetStartedModule'),
      documentTitle: 'STP Get Started',
    },
    {
      name: RouteName.STP_SETUP,
      path: '/:region/:businessId/stp/setup',
      loadModule: () => import('./stpSetup/StpSetupModule'),
      documentTitle: 'Set up STP reporting',
    },
    {
      name: RouteName.STP_ERRORS,
      path: '/:region/:businessId/stp/errors',
      allowedParams: ['source'],
      loadModule: () => import('./stpErrors/StpErrorsModule'),
      documentTitle: 'STP Errors',
    },
    {
      name: RouteName.STP_REPORTING_CENTRE,
      allowedParams: ['tab'],
      path: '/:region/:businessId/stp/reportingCentre',
      module: new ReportingCentreModule({
        integration,
        setRootView,
        replaceURLParams,
        pushMessage,
        popMessages,
        featureToggles,
      }),
      documentTitle: 'Single Touch Payroll reporting',
    },
  ];
  return routes;
};

export default getStpRoutes;
