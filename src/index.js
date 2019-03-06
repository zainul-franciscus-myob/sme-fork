import ReactDOM from 'react-dom';

import '@myob/myob-styles/dist/styles/myob-clean.css';

import './index.css';
import { initializeAuth } from './Auth';
import { initializeConfig } from './Config';
import Inbox from './inbox';
import NavigationModule from './navigation/NavigationModule';
import Router from './router/Router';
import getRoutes from './getRoutes';

async function main(integrationType) {
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
    defaultRoute: 'businessList.businessList',
  });
  const inbox = new Inbox();
  const integration = createIntegration();

  const routes = getRoutes({
    integration,
    setRootView,
    popMessages: inbox.popMessages,
    pushMessage: inbox.pushMessage,
    replaceURLParams: router.replaceURLParams,
  });

  const moduleList = routes.reduce((acc, route) => {
    const routeModules = route.subRoutes.map(({ module }) => module);
    return [...acc, ...routeModules];
  }, []);

  const { constructPath } = router;

  const nav = new NavigationModule({
    integration, setNavigationView, constructPath,
  });

  const unsubscribeAllModulesFromStore = () => {
    moduleList.forEach((module) => {
      module.unsubscribeFromStore();
    });
  };

  const beforeAll = ({ module, routeProps }) => {
    unsubscribeAllModulesFromStore();
    module.resetState();
    nav.run(routeProps);
  };

  router.start({
    routes,
    beforeAll,
    afterAll: inbox.clearInbox,
  });
}

main(
  process.env.REACT_APP_INTEGRATION_TYPE,
);
