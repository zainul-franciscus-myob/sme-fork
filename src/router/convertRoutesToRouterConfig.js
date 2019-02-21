const getFullPath = (path, queryParams = []) => {
  const queryPath = queryParams.join('&');

  return queryPath ? `${path}?${queryPath}` : path;
};

const convertSubRouteToRouteChildren = subRoutes => subRoutes.reduce(
  (acc, subRoute) => {
    const { name, path, allowedParams } = subRoute;

    const fullPath = getFullPath(path, allowedParams);

    return [...acc, { name, path: fullPath }];
  },
  [],
);

const convertRoutesToRouterConfig = routes => routes.map(route => ({
  name: route.name,
  path: route.rootPath,
  children: convertSubRouteToRouteChildren(route.subRoutes),
}));

export default convertRoutesToRouterConfig;
