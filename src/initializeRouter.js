import browserPlugin from 'router5/plugins/browser';
import createRouter from 'router5';

const initializeRouter = (options) => {
  const {
    routes,
    actions,
    beforeAll,
    defaultRoute,
    afterAll,
  } = options;

  const routerOptions = {
    defaultRoute,
  };

  const router = createRouter(routes, routerOptions)
    .usePlugin(browserPlugin({ useHash: true }));

  router.subscribe(({ route }) => {
    beforeAll(route.name);
    actions[route.name]({ ...route.params });
    afterAll();
  });

  router.start();
};

export default initializeRouter;
