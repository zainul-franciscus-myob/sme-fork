import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getTimesheetRoutes = () => [
  {
    name: RouteName.TIMESHEET,
    path: '/:region/:businessId/timesheet',
    loadModule: () => import('./TimesheetModule'),
    documentTitle: 'Timesheet',
  },
];

export default getTimesheetRoutes;
