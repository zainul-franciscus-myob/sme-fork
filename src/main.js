import './index.css';
import '@myob/myob-styles/dist/design-tokens/css/design-tokens.css';
import '@myob/myob-styles/dist/styles/myob-clean.css';

import { initializeAuth } from './Auth';
import Config from './Config';
import Inbox from './inbox';
import RootModule from './root/rootModule';
import Router from './router/Router';
import getCreateIntegration from './integration/getCreateIntegration';
import getInitializeLeanEngage from './leanEngage/getInitializeLeanEngage';
import getInitializeTelemetry from './telemetry/getInitializeTelemetry';
import getRoutes from './getRoutes';
import loadFeatureToggles from './featureToggles/loadFeatureToggles';
import stopResizeAnimation from './stopResizeAnimation';
import unbindAllKeys from './hotKeys/unbindAllKeys';

async function main(integrationType, telemetryType, leanEngageType) {
  initializeAuth();
  stopResizeAnimation();

  const rootModule = new RootModule();

  const createIntegration = getCreateIntegration(integrationType);
  const integration = createIntegration({
    getRegion: rootModule.getRegion,
  });
  const initializeTelemetry = getInitializeTelemetry(telemetryType);
  const telemetry = initializeTelemetry();
  const initializeLeanEngage = getInitializeLeanEngage(leanEngageType);
  const startLeanEngage = initializeLeanEngage(Config.LEAN_ENGAGE_APP_ID);

  const router = new Router({
    defaultRoute: 'businessList/businessList',
  });
  const inbox = new Inbox();

  rootModule.init({
    integration,
    router,
    sendTelemetryEvent: telemetry,
    startLeanEngage,
  });

  const featureToggles = await loadFeatureToggles(integration);

  const routes = getRoutes({
    integration,
    setRootView: rootModule.render,
    popMessages: inbox.popMessages,
    pushMessage: inbox.pushMessage,
    replaceURLParams: router.replaceURLParams,
    navigateTo: router.navigateTo,
    globalCallbacks: rootModule.globalCallbacks,
    featureToggles,
  });

  const moduleList = routes.map(route => route.module);

  const unsubscribeAllModulesFromStore = () => {
    moduleList.forEach((module) => {
      module.unsubscribeFromStore();
    });
  };

  const showAppcues = ({ routeParams }) => {
    const { appcue } = routeParams;
    if (window.Appcues && appcue) window.Appcues.show(appcue);
  };

  const beforeAll = ({ routeProps }) => {
    unbindAllKeys();
    unsubscribeAllModulesFromStore();
    telemetry(routeProps);
    showAppcues(routeProps);
  };

  router.start({
    rootModule,
    routes,
    beforeAll,
    afterAll: inbox.clearInbox,
  });
}

main(
  Config.INTEGRATION_TYPE,
  Config.TELEMETRY_TYPE,
  Config.LEAN_ENGAGE_TYPE,
);
