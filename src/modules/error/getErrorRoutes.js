import ErrorModule from './ErrorModule';
import RouteName from '../../router/RouteName';

const getErrorRoutes = ({ setRootView }) => {
  const routes = [
    {
      name: RouteName.ERROR,
      path: '/:region/:businessId/error',
      module: new ErrorModule({
        setRootView,
      }),
      documentTitle: 'Error',
    },
  ];

  return routes;
};

export default getErrorRoutes;
