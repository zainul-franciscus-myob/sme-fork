import './index.css';
import '@myob/myob-styles/dist/styles/myob-clean.css';
import ReactDOM from 'react-dom';

import { initializeAuth } from './Auth';
import Config, { initializeConfig } from './Config';
import Inbox from './inbox';
import NavigationModule from './navigation/NavigationModule';
import Router from './router/Router';
import getRoutes from './getRoutes';
import unbindAllKeys from './hotKeys/unbindAllKeys';

async function main(integrationType, telemetryType, leanEngageType) {
  await initializeConfig();
  initializeAuth();

  const createIntegration = (await import(`./integration/create${integrationType}Integration.js`)).default;
  const root = document.getElementById('root');
  const setRootView = (component) => {
    ReactDOM.unmountComponentAtNode(root);
    ReactDOM.render(component, root);
  };

  const navNode = document.getElementById('nav');
  const setNavigationView = (component) => {
    ReactDOM.unmountComponentAtNode(navNode);
    ReactDOM.render(component, navNode);
  };

  const router = new Router({
    defaultRoute: 'businessList/businessList',
  });
  const inbox = new Inbox();
  const integration = createIntegration();

  const routes = getRoutes({
    integration,
    setRootView,
    popMessages: inbox.popMessages,
    pushMessage: inbox.pushMessage,
    replaceURLParams: router.replaceURLParams,
    reload: router.reload,
  });

  const moduleList = routes.reduce((acc, route) => {
    const routeModules = route.subRoutes.map(({ module }) => module);
    return [...acc, ...routeModules];
  }, []);

  const { constructPath, replaceURLParamsAndReload } = router;

  const nav = new NavigationModule({
    integration,
    setNavigationView,
    constructPath,
    replaceURLParamsAndReload,
    mainContentElement: root,
  });

  const unsubscribeAllModulesFromStore = () => {
    moduleList.forEach((module) => {
      module.unsubscribeFromStore();
    });
  };

  const initializeTelemetry = (await import(`./telemetry/initialize${telemetryType}Telemetry`)).default;
  const telemetry = initializeTelemetry(Config.SEGMENT_WRITE_KEY);
  const initializeLeanEngage = (await import(`./leanEngage/initialize${leanEngageType}LeanEngage`)).default;
  const startLeanEngage = initializeLeanEngage(Config.LEAN_ENGAGE_APP_ID);

  const beforeAll = ({ module, routeProps }) => {
    unbindAllKeys();
    unsubscribeAllModulesFromStore();
    module.resetState();
    nav.run({ ...routeProps, onPageTransition: module.handlePageTransition });
    telemetry(routeProps);
    startLeanEngage(routeProps);
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
