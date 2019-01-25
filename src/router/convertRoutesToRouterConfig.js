const getFullPath = (path, queryParams = []) => {
  const queryPath = queryParams.join('&');

  return queryPath ? `${path}?${queryPath}` : path;
};

const convertSubRouteToRouteChildren = subRoutes => subRoutes.reduce(
  (acc, subRoute) => {
    const { name, path, allowedParams } = subRoute;

    if (path === '/') {
      return acc;
    }

    const fullPath = getFullPath(path, allowedParams);

    return [...acc, { name, path: fullPath }];
  },
  [],
);

const getRootPath = ({ rootPath, subRoutes }) => {
  const { allowedParams } = subRoutes.find(({ path }) => path === '/') || {};

  return allowedParams ? getFullPath(rootPath, allowedParams) : rootPath;
};

const convertRoutesToRouterConfig = routes => routes.map(route => ({
  name: route.name,
  path: getRootPath(route),
  children: convertSubRouteToRouteChildren(route.subRoutes),
}));

export default convertRoutesToRouterConfig;
