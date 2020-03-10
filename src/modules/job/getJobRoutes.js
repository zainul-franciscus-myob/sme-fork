import JobListModule from './jobList/JobListModule';
import RouteName from '../../router/RouteName';

const getJobRoutes = ({
  integration, setRootView, popMessages,
}) => {
  const routes = [
    {
      name: RouteName.JOB_LIST,
      path: '/:region/:businessId/job/',
      module: new JobListModule({
        integration, setRootView, popMessages,
      }),
      documentTitle: 'Jobs',
    },
  ];

  return routes;
};

export default getJobRoutes;
