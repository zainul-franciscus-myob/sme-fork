const stripDanglingSlash = (path) => path.replace(/\/$/, '');

const alwaysAllowedQueryParams = ['appcue'];

const getFullPath = (path, queryParams = []) => {
  let queryParamsAgain = queryParams;
  alwaysAllowedQueryParams.forEach((qp) => {
    if (!queryParams.includes(qp)) {
      queryParamsAgain = [...queryParamsAgain, qp];
    }
  });

  const queryPath = queryParamsAgain.join('&');
  const fixedPath = stripDanglingSlash(path);

  return queryPath ? `${fixedPath}?${queryPath}` : fixedPath;
};

const buildSubRoute = ({ name, path, allowedParams, defaultParams }) => ({
  name,
  path: getFullPath(path, allowedParams),
  defaultParams,
});

const convertRoutesToRouterConfig = (routes) => routes.map(buildSubRoute);

export default convertRoutesToRouterConfig;
