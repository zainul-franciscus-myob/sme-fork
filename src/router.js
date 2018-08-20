import createRouter from 'router5'
import browserPlugin from 'router5/plugins/browser'
import listenersPlugin from 'router5/plugins/listeners';

const initializeRouter = (routes, actions) => {
  const defaultRoute = routes.find(route => route.isDefault);

  const routerOptions = {
    defaultRoute: defaultRoute.name
  };

  const router = createRouter(routes, routerOptions)
    .usePlugin(listenersPlugin())
    .usePlugin(browserPlugin({ useHash: true }))
    .start((err, route) => runAction(actions, route));
  
  router.subscribe(({ route }) => runAction(actions, route))
}

function runAction(actions, route) {
  actions[route.name]();
}

export default initializeRouter;
