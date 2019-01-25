import browserPlugin from 'router5/plugins/browser';
import createRouter from 'router5';

import convertRoutesToRouterConfig from './convertRoutesToRouterConfig';
import getRouteNameToModuleMapping from './getRouteNameToModuleMapping';
import removeEmptyParams from './removeEmptyParams';

export default class Router {
  constructor({ defaultRoute }) {
    this.router = createRouter([], {
      defaultRoute,
    }).usePlugin(browserPlugin({ useHash: true }));
  }

  replaceURLParams = (params) => {
    const currentRoute = this.router.getState();

    const newParams = removeEmptyParams({
      ...currentRoute.params,
      ...params,
    });

    this.router.replaceHistoryState(currentRoute.name, newParams);
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

      beforeAll(module);
      action({ ...route.params }, this.replaceURLParams);
      afterAll();
    });

    this.router.start();
  }
}
