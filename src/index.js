import './components/component-css';
import './index.css';
import '@myob/myob-styles/dist/design-tokens/css/design-tokens.css';
import '@myob/myob-styles/dist/styles/myob-clean.css';

import { initializeAuth } from './Auth';
import { initializeTelemetry } from './telemetry';
import Config from './Config';
import Inbox from './inbox';
import RootModule from './root/rootModule';
import Router from './router/Router';
import getCreateIntegration from './integration/getCreateIntegration';
import getInitializeLeanEngage from './leanEngage/getInitializeLeanEngage';
import getRoutes from './getRoutes';
import loadFeatureToggles from './featureToggles/loadFeatureToggles';
import stopResizeAnimation from './stopResizeAnimation';
import unbindAllKeys from './hotKeys/unbindAllKeys';

async function main(integrationType, telemetryType, leanEngageType) {
  initializeAuth();
  stopResizeAnimation();

  const rootModule = new RootModule();

  const createIntegration = await getCreateIntegration(integrationType);
  const integration = createIntegration({
    getRegion: rootModule.getRegion,
  });

  initializeTelemetry(telemetryType, rootModule.getTelemetryInfo);
  const initializeLeanEngage = getInitializeLeanEngage(leanEngageType);
  const startLeanEngage = initializeLeanEngage(Config.LEAN_ENGAGE_APP_ID);

  const router = new Router({
    defaultRoute: 'businessList/businessList',
  });
  const inbox = new Inbox();

  const featureToggles = await loadFeatureToggles(integration);

  rootModule.init({
    integration,
    router,
    startLeanEngage,
    featureToggles,
  });

  const container = Object.freeze({
    integration,
    setRootView: rootModule.render,
    popMessages: inbox.popMessages,
    pushMessage: inbox.pushMessage,
    replaceURLParams: router.replaceURLParams,
    navigateTo: router.navigateTo,
    navigateToName: router.navigateToName,
    isActiveRoute: router.isActiveRoute,
    globalCallbacks: rootModule.globalCallbacks,
    isToggleOn: rootModule.isToggleOn,
    subscribeOrUpgrade: rootModule.subscribeOrUpgrade,
    featureToggles,
    loadGlobalBusinessDetails: rootModule.loadGlobalBusinessDetails,
    loadHelpContentBasedOnRoute: rootModule.loadHelpContentBasedOnRoute,
  });

  const routes = getRoutes(container);

  const unsubscribeAllModulesFromStore = () =>
    routes.forEach((route) => {
      if (route.module) {
        route.module.unsubscribeFromStore();
      }
    });

  const showAppcues = ({ routeParams }) => {
    const { appcue } = routeParams;
    if (window.Appcues && appcue) window.Appcues.show(appcue);
  };

  const beforeAll = ({ routeProps }) => {
    unbindAllKeys();
    unsubscribeAllModulesFromStore();
    showAppcues(routeProps);
  };

  router.start({
    rootModule,
    routes,
    container,
    beforeAll,
    afterAll: inbox.clearInbox,
  });
}

main(Config.INTEGRATION_TYPE, Config.TELEMETRY_TYPE, Config.LEAN_ENGAGE_TYPE);
