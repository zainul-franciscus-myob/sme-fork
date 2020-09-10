import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getJobRoutes = () => [
  {
    name: RouteName.JOB_LIST,
    path: '/:region/:businessId/job/',
    loadModule: () => import('./jobList/JobListModule'),
    documentTitle: 'Jobs',
  },
  {
    name: RouteName.JOB_DETAIL,
    path: '/:region/:businessId/job/:jobId',
    loadModule: () => import('./jobDetail/JobDetailModule'),
    documentTitle: 'Job',
  },
];

export default getJobRoutes;
