import ReactDOM from 'react-dom';

import '@myob/myob-styles/dist/styles/myob-clean.css';

import './index.css';
import { initializeAuth } from './Auth';
import { initializeConfig } from './Config';
import Inbox from './inbox';
import getRoutes from './getRoutes';
import initializeRouter from './router/initializeRouter';

async function main(integrationType) {
  await initializeConfig();
  initializeAuth();

  const createIntegration = (await import(`./integration/create${integrationType}Integration.js`)).default;

  const root = document.getElementById('root');
  const setRootView = (component) => {
    ReactDOM.unmountComponentAtNode(root);
    ReactDOM.render(component, root);
  };

  const inbox = new Inbox();
  const { popMessages, pushMessage, clearInbox } = inbox;

  const integration = createIntegration();

  const routes = getRoutes({
    integration, setRootView, popMessages, pushMessage,
  });

  const moduleList = routes.reduce((acc, route) => {
    const routeModules = route.subRoutes.map(({ module }) => module);
    return [...acc, ...routeModules];
  }, []);

  const unsubscribeAllModulesFromStore = () => {
    moduleList.forEach((module) => {
      module.unsubscribeFromStore();
    });
  };

  const beforeAll = (currentModule) => {
    unsubscribeAllModulesFromStore();
    currentModule.resetState();
  };

  initializeRouter({
    routes,
    beforeAll,
    defaultRoute: 'home',
    afterAll: () => clearInbox,
  });
}

main(
  process.env.REACT_APP_INTEGRATION_TYPE,
);
