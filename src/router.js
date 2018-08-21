import createRouter from 'router5'
import browserPlugin from 'router5/plugins/browser'

const initializeRouter = (routes, actions, defaultRoute) => {
  const routerOptions = {
    defaultRoute: defaultRoute
  };

  const router = createRouter(routes, routerOptions)
    .usePlugin(browserPlugin({ useHash: true }));
  
  router.subscribe(({ route }) => runAction(actions, route));

  router.start();
}

function runAction(actions, route) {
  actions[route.name]();
}

export default initializeRouter;
