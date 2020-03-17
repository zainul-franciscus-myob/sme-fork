import browserPlugin from 'router5-plugin-browser';
import createRouter from 'router5';

import buildModuleContext from './buildModuleContext';
import convertRoutesToRouterConfig from './convertRoutesToRouterConfig';
import getRouteNameToModuleMapping from './getRouteNameToModuleMapping';
import removeEmptyParams from './removeEmptyParams';

export default class Router {
  constructor({ defaultRoute }) {
    this.router = createRouter([], {
      defaultRoute,
      trailingSlashMode: 'never',
    });
    this.router.usePlugin(browserPlugin({ useHash: true }));
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

  buildDocumentTitle = title => (title ? `MYOB - ${title}` : 'MYOB')

  start = (options) => {
    const {
      rootModule,
      routes,
      beforeAll,
      afterAll,
    } = options;
    const routerConfig = convertRoutesToRouterConfig(routes);
    const moduleMapping = getRouteNameToModuleMapping(routes);

    this.router.add(routerConfig);

    this.router.subscribe(async ({ route, previousRoute }) => {
      const { module, title } = moduleMapping[route.name];
      document.title = this.buildDocumentTitle(title);

      const routeProps = {
        routeParams: route.params,
        currentRouteName: route.name,
        previousRouteName: previousRoute.name,
      };

      beforeAll({ routeProps });
      await rootModule.run(routeProps, module, buildModuleContext(route));
      afterAll();
    });

    this.router.start();
  }

  routeParams = () => this.router.getState() && this.router.getState().params;

  constructPath = (name, params) => this.router.buildPath(name, params)
}
