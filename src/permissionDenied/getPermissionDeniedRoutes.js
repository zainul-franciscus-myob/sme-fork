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
    },
  ];

  return routes;
};

export default getPermissionDeniedRoutes;
