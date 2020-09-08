import browserPlugin from 'router5-plugin-browser';
import createRouter from 'router5';

import buildModuleContext from './buildModuleContext';
import convertRoutesToRouterConfig from './convertRoutesToRouterConfig';
import getRouteNameToModuleMapping from './getRouteNameToModuleMapping';
import isCurrentRoute from './isCurrentRoute';
import removeEmptyParams from './removeEmptyParams';

function retainDefaultParams(newParams, oldParams) {
  const params = newParams || {};
  if (oldParams) {
    if (!params.region) {
      params.region = oldParams.region;
    }
    if (!params.businessId) {
      params.businessId = oldParams.businessId;
    }
  }
  return params;
}

export default class Router {
  constructor({ defaultRoute }) {
    this.router = createRouter([], {
      defaultRoute,
      trailingSlashMode: 'never',
    });
    this.router.usePlugin(browserPlugin({ useHash: true }));
  }

  // @DEPRECATED
  reload = () => {
    const currentRoute = this.router.getState();
    this.router.navigate(currentRoute.name, currentRoute.params, {
      reload: true,
    });
  };

  replaceURLParams = (params) => {
    const currentRoute = this.router.getState();

    const newParams = removeEmptyParams({
      ...currentRoute.params,
      ...params,
    });

    this.router.setState({
      ...currentRoute,
      params: newParams,
    });

    this.router.replaceHistoryState(currentRoute.name, newParams);
  };

  // @DEPRECATED
  replaceURLParamsAndReload = (params) => {
    const currentRoute = this.router.getState();

    if (
      Object.entries(params).every(
        ([key, value]) => currentRoute.params[key] === value
      )
    ) {
      return;
    }

    const newParams = removeEmptyParams({
      ...currentRoute.params,
      ...params,
    });

    this.router.setState({
      ...currentRoute,
      params: newParams,
    });

    this.router.replaceHistoryState(currentRoute.name, newParams);

    window.location.reload();
  };

  navigateTo = (newPath, openInNewTab) => {
    if (!openInNewTab) {
      const prevPath = `/${window.location.hash}`;

      if (isCurrentRoute(prevPath, newPath)) {
        this.reload();
      }

      window.location.href = newPath;
    } else {
      window.open(newPath, '_blank');
    }
  };

  /** Navigate to a route by name.
   * @param {string} routeName The name of the target route.
   * @param {Record<string, any>} routeParams The params required by the route. `region` and
   * `businessId` will default to the values in the current route, unless explicitly provided here.
   * @example `router.navigateToName('paySuper/PaySuperRead', { businessEventId: 'abc' });
   */
  navigateToName = (routeName, routeParams = undefined) => {
    const params = retainDefaultParams(
      routeParams,
      this.router.getState().params
    );
    return this.router.navigate(routeName, params);
  };

  /** Tests whether a route is currently active.
   * @param {string} routeName The name of the route to check.
   * @param {Record<string, any>} routeParams The params required by the route. `region` and
   * `businessId` will default to the values in the current route, unless explicitly provided here.
   * @param {boolean} ignoreQueryParams Whether to ignore query params.
   * @example `router.isActive('paySuper/PaySuperRead', { businessEventId: 'abc' });
   */
  isActiveRoute = (
    routeName,
    routeParams = undefined,
    ignoreQueryParams = true
  ) => {
    const params = retainDefaultParams(
      routeParams,
      this.router.getState().params
    );
    return this.router.isActive(
      routeName,
      params,
      undefined,
      ignoreQueryParams
    );
  };

  buildDocumentTitle = (title) => (title ? `MYOB - ${title}` : 'MYOB');

  start = ({ rootModule, routes, beforeAll, afterAll, container }) => {
    const routerConfig = convertRoutesToRouterConfig(routes);
    const moduleMapping = getRouteNameToModuleMapping(routes);

    this.router.add(routerConfig);

    this.router.subscribe(async ({ route, previousRoute }) => {
      const mappedRoute = moduleMapping[route.name];
      document.title = this.buildDocumentTitle(mappedRoute.title);

      if (!mappedRoute.module) {
        const { default: ModuleCtor } = await mappedRoute.loadModule();
        mappedRoute.module = new ModuleCtor(container);
      }

      const routeProps = {
        routeParams: route.params,
        currentRouteName: route.name,
        previousRouteName: previousRoute ? previousRoute.name : undefined,
      };

      beforeAll({ routeProps });
      await rootModule.run(
        routeProps,
        mappedRoute.module,
        buildModuleContext(route)
      );
      afterAll();
    });

    this.router.start();
  };

  routeParams = () => this.router.getState() && this.router.getState().params;

  /** Creates a path to a named route. The result is suitable for use as a href in an anchor.
   * @param {string} routeName The name of the target route.
   * @param {Record<string, any>} routeParams The params required by the route. `region` and
   * `businessId` will default to the values in the current route, unless explicitly provided here.
   * @example `router.navigateToName('paySuper/PaySuperRead', { businessEventId: 'abc' });
   */
  constructPath = (routeName, routeParams = undefined) => {
    const params = retainDefaultParams(
      routeParams,
      this.router.getState().params
    );
    return this.router.buildPath(routeName, params);
  };
}
