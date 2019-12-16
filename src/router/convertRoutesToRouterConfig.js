const stripDanglingSlash = path => path.replace(/\/$/, '');

const getFullPath = (path, queryParams = []) => {
  const queryPath = queryParams.join('&');
  const fixedPath = stripDanglingSlash(path);

  return queryPath ? `${fixedPath}?${queryPath}` : fixedPath;
};

const buildSubRoute = ({ name, path, allowedParams }) => ({
  name,
  path: getFullPath(path, allowedParams),
});

const convertRoutesToRouterConfig = routes => routes.map(buildSubRoute);

export default convertRoutesToRouterConfig;
