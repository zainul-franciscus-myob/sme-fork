const convertSubRouteToRouteChildren = subRoutes => subRoutes.reduce(
  (acc, subRoute) => {
    const { name, path } = subRoute;

    if (path === '/') {
      return acc;
    }

    return [...acc, { name, path }];
  },
  [],
);

const convertRoutesToRouterConfig = routes => routes.map(route => ({
  name: route.name,
  path: route.rootPath,
  children: convertSubRouteToRouteChildren(route.subRoutes),
}));

export default convertRoutesToRouterConfig;
