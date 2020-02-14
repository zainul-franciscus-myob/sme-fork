import FileUnavailableModule from './FileUnavailableModule';
import RouteName from '../../router/RouteName';

const getFileUnavailableRoutes = ({
  integration, setRootView,
}) => {
  const routes = [
    {
      name: RouteName.FILE_UNAVAILABLE,
      path: '/:region/:businessId/unavailable/',
      module: new FileUnavailableModule({
        integration, setRootView,
      }),
      documentTitle: 'Business unavailable',
    },
  ];

  return routes;
};

export default getFileUnavailableRoutes;
