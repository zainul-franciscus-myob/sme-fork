import createRouter from 'router5'
import browserPlugin from 'router5/plugins/browser'
import listenersPlugin from 'router5/plugins/listeners';

const initializeRouter = (routes, actions) => {
  const router = createRouter(routes)
    .usePlugin(listenersPlugin())
    .usePlugin(browserPlugin(
      { useHash: true }
    ))
    .start('/home', (err, route) => {
      actions[route.name]()
    });

  router.subscribe(({ route }) => {
    actions[route.name]()
  });
}

export default initializeRouter;
