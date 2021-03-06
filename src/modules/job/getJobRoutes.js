import JobDetailModule from './jobDetail/JobDetailModule';
import JobListModule from './jobList/JobListModule';
import RouteName from '../../router/RouteName';

const getJobRoutes = ({
  integration,
  setRootView,
  popMessages,
  pushMessage,
}) => {
  const routes = [
    {
      name: RouteName.JOB_LIST,
      path: '/:region/:businessId/job/',
      module: new JobListModule({
        integration,
        setRootView,
        popMessages,
      }),
      documentTitle: 'Jobs',
    },
    {
      name: RouteName.JOB_DETAIL,
      path: '/:region/:businessId/job/:jobId',
      module: new JobDetailModule({
        integration,
        setRootView,
        pushMessage,
      }),
      documentTitle: 'Job',
    },
  ];

  return routes;
};

export default getJobRoutes;
