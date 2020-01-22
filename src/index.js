import './index.css';
import '@myob/myob-styles/dist/design-tokens/css/design-tokens.css';
import '@myob/myob-styles/dist/styles/myob-clean.css';
import ReactDOM from 'react-dom';

import { initializeAuth } from './Auth';
import Config, { initializeConfig } from './Config';
import Inbox from './inbox';
import RootModule from './root/rootModule';
import Router from './router/Router';
import getRoutes from './getRoutes';
import stopResizeAnimation from './stopResizeAnimation';
import unbindAllKeys from './hotKeys/unbindAllKeys';

async function main(integrationType, telemetryType, leanEngageType) {
  await initializeConfig();
  initializeAuth();
  stopResizeAnimation();

  const createIntegration = (await import(`./integration/create${integrationType}Integration.js`)).default;
  const integration = createIntegration();

  const router = new Router({
    defaultRoute: 'businessList/businessList',
  });
  const inbox = new Inbox();

  const rootModule = new RootModule({
    integration,
    router,
  });

  const root = document.getElementById('root');

  const setRootView = (component) => {
    ReactDOM.unmountComponentAtNode(root);
    ReactDOM.render(rootModule.render(component), root);
  };
  let previousRoute = null;

  const routes = getRoutes({
    integration,
    setRootView,
    previousRoute: {
      get name() { return previousRoute && previousRoute.name; },
      get params() { return previousRoute && previousRoute.params; },
      get url() { return previousRoute && previousRoute.url; },
    },
    popMessages: inbox.popMessages,
    pushMessage: inbox.pushMessage,
    replaceURLParams: router.replaceURLParams,
    reload: router.reload,
    globalCallbacks: rootModule.globalCallbacks,
  });

  const moduleList = routes.map(route => route.module);

  const unsubscribeAllModulesFromStore = () => {
    moduleList.forEach((module) => {
      module.unsubscribeFromStore();
    });
  };

  const initializeTelemetry = (await import(`./telemetry/initialize${telemetryType}Telemetry`)).default;
  const telemetry = initializeTelemetry(Config.SEGMENT_WRITE_KEY);
  const initializeLeanEngage = (await import(`./leanEngage/initialize${leanEngageType}LeanEngage`)).default;
  const startLeanEngage = initializeLeanEngage(Config.LEAN_ENGAGE_APP_ID);

  const showAppcues = ({ routeParams }) => {
    const { appcue } = routeParams;
    if (window.Appcues && appcue) window.Appcues.show(appcue);
  };

  const beforeAll = ({ module, routeProps, previousRoute: prevRoute }) => {
    previousRoute = prevRoute;
    unbindAllKeys();
    unsubscribeAllModulesFromStore();
    module.resetState();
    rootModule.run(routeProps, module.handlePageTransition);
    telemetry(routeProps);
    startLeanEngage(routeProps);
    showAppcues(routeProps);
  };

  router.start({
    routes,
    beforeAll,
    afterAll: inbox.clearInbox,
  });
}

main(
  process.env.REACT_APP_INTEGRATION_TYPE,
  process.env.REACT_APP_TELEMETRY_TYPE,
  process.env.REACT_APP_LEAN_ENGAGE_TYPE,
);
