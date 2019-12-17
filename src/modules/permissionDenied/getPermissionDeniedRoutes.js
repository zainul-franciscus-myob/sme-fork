import PermissionDeniedModule from './PermissionDeniedModule';
import RouteName from '../../router/RouteName';

const getPermissionDeniedRoutes = ({
  setRootView,
}) => {
  const routes = [
    {
      name: RouteName.PERMISSION_DENIED,
      path: '/:region/:businessId/permissionDenied/',
      module: new PermissionDeniedModule({
        setRootView,
      }),
      documentTitle: 'Permission denied',
    },
  ];

  return routes;
};

export default getPermissionDeniedRoutes;
