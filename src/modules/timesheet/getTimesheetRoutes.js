import RouteName from '../../router/RouteName';
import TimesheetModule from './TimesheetModule';

const getTimesheetRoutes = ({
  integration, setRootView,
}) => {
  const routes = [
    {
      name: RouteName.TIMESHEET,
      path: '/:region/:businessId/timesheet',
      module: new TimesheetModule({
        integration, setRootView,
      }),
      documentTitle: 'Timesheet',
    },
  ];

  return routes;
};

export default getTimesheetRoutes;
