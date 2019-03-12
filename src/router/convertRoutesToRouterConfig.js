const getFullPath = (path, queryParams = []) => {
  const queryPath = queryParams.join('&');

  return queryPath ? `${path}?${queryPath}` : path;
};

const stripDanglingSlash = path => path.replace(/\/$/, '');

const buildSubRoute = ({
  subRoute: { name: subRouteName, path: subRoutePath, allowedParams },
  rootName, rootPath,
}) => {
  const name = `${rootName}/${subRouteName}`;
  const path = stripDanglingSlash(`${rootPath}${subRoutePath}`);

  return {
    name,
    path: getFullPath(path, allowedParams),
  };
};

const buildSubRoutes = ({ name: rootName, rootPath, subRoutes }) => (
  subRoutes.map(subRoute => buildSubRoute({ subRoute, rootName, rootPath }))
);

const flatSingle = arr => [].concat(...arr);

const convertRoutesToRouterConfig = routes => flatSingle(routes.map(buildSubRoutes));

export default convertRoutesToRouterConfig;
