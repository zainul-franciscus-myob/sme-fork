import browserPlugin from 'router5/plugins/browser';
import createRouter from 'router5';

const initializeRouter = (options) => {
  const {
    routes,
    actions,
    beforeAll,
    defaultRoute,
  } = options;

  const routerOptions = {
    defaultRoute,
  };

  const router = createRouter(routes, routerOptions)
    .usePlugin(browserPlugin({ useHash: true }));

  router.subscribe(({ route }) => {
    beforeAll();
    actions[route.name]({ ...route.params });
  });

  router.start();
};

export default initializeRouter;
