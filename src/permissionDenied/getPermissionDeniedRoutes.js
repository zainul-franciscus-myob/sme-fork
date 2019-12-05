import PermissionDeniedModule from './PermissionDeniedModule';

const getPermissionDeniedRoutes = ({
  setRootView,
}) => {
  const routes = [
    {
      name: 'permissionDenied',
      path: '/',
      module: new PermissionDeniedModule({
        setRootView,
      }),
      documentTitle: 'Permission denied',
    },
  ];

  return routes;
};

export default getPermissionDeniedRoutes;
