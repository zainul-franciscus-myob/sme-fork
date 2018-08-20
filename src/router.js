import createRouter from 'router5'
import browserPlugin from 'router5/plugins/browser'
import listenersPlugin from 'router5/plugins/listeners';

function createModuleRouterPlugin(actions) {
  function moduleRouterPlugin(router, dependencies) {
    return {
      onTransitionSuccess: (toState, fromState) => {
        actions[toState.name]()
      }
    };
  }

  moduleRouterPlugin.pluginName = "MODULE_ROUTER_PLUGIN";
  return moduleRouterPlugin;
}

const initializeRouter = (routes, actions) => {
  const defaultRoute = routes.find(route => route.isDefault);

  const routerOptions = {
    defaultRoute: defaultRoute.name
  };

  const router = createRouter(routes, routerOptions)
    .usePlugin(listenersPlugin())
    .usePlugin(browserPlugin({ useHash: true }))
    .usePlugin(createModuleRouterPlugin(actions))
    .start();

    return router;
}

export default initializeRouter;
