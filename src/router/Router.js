import browserPlugin from 'router5/plugins/browser';
import createRouter from 'router5';

import convertRoutesToRouterConfig from './convertRoutesToRouterConfig';
import getRouteNameToModuleMapping from './getRouteNameToModuleMapping';
import removeEmptyParams from './removeEmptyParams';

export default class Router {
  constructor({ defaultRoute }) {
    this.router = createRouter([], {
      defaultRoute,
      trailingSlashMode: 'never',
    }).usePlugin(browserPlugin({ useHash: true }));
  }

  reload = () => {
    const currentRoute = this.router.getState();
    this.router.navigate(currentRoute.name, currentRoute.params, { reload: true });
  }

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
  }

  replaceURLParamsAndReload = (params) => {
    const currentRoute = this.router.getState();

    if (Object.entries(params).every(([key, value]) => currentRoute.params[key] === value)) {
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
  }

  start = (options) => {
    const {
      routes,
      beforeAll,
      afterAll,
    } = options;
    const routerConfig = convertRoutesToRouterConfig(routes);
    const moduleMapping = getRouteNameToModuleMapping(routes);

    this.router.add(routerConfig);

    this.router.subscribe(({ route }) => {
      const { module, action } = moduleMapping[route.name];

      beforeAll({
        module,
        routeProps: {
          routeParams: route.params,
          currentRouteName: route.name,
        },
      });
      action({ ...route.params }, this.replaceURLParams);
      afterAll();
    });

    this.router.start();
  }

  constructPath = (name, params) => this.router.buildPath(name, params)
}
