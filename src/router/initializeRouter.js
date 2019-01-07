import browserPlugin from 'router5/plugins/browser';
import createRouter from 'router5';

import convertRoutesToRouterConfig from './convertRoutesToRouterConfig';
import getRouteNameToModuleMapping from './getRouteNameToModuleMapping';

const initializeRouter = (options) => {
  const {
    routes,
    beforeAll,
    defaultRoute,
    afterAll,
  } = options;

  const routerOptions = {
    defaultRoute,
  };

  const routerConfig = convertRoutesToRouterConfig(routes);

  const moduleMapping = getRouteNameToModuleMapping(routes);

  const router = createRouter(routerConfig, routerOptions)
    .usePlugin(browserPlugin({ useHash: true }));

  router.subscribe(({ route }) => {
    const { module, action } = moduleMapping[route.name];

    beforeAll(module);
    action({ ...route.params });
    afterAll();
  });

  router.start();
};

export default initializeRouter;
