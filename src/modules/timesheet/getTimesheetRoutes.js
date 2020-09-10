import RouteName from '../../router/RouteName';
import TimesheetModule from './TimesheetModule';

const getTimesheetRoutes = ({
  integration,
  setRootView,
  featureToggles,
  isToggleOn,
}) => {
  const routes = [
    {
      name: RouteName.TIMESHEET,
      path: '/:region/:businessId/timesheet',
      module: new TimesheetModule({
        integration,
        setRootView,
        featureToggles,
        isToggleOn,
      }),
      documentTitle: 'Timesheet',
    },
  ];

  return routes;
};

export default getTimesheetRoutes;
