import FileUnavailableModule from './FileUnavailableModule';
import RouteName from '../../router/RouteName';

const getFileUnavailableRoutes = ({ integration, setRootView, navigateTo }) => {
  const routes = [
    {
      name: RouteName.FILE_UNAVAILABLE,
      path: '/:region/:businessId/unavailable/',
      module: new FileUnavailableModule({
        integration,
        setRootView,
        navigateTo,
      }),
      documentTitle: 'Business unavailable',
      allowedParams: ['reason'],
    },
  ];

  return routes;
};

export default getFileUnavailableRoutes;
