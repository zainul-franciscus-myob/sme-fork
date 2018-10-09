import ReactDOM from 'react-dom';

import '@myob/myob-styles/dist/styles/myob-clean.css';

import './index.css';
import { initializeAuth } from './Auth';
import { initializeConfig } from './Config';
import App from './App';
import BankingModule from './banking/BankingModule';
import BusinessModule from './business/BusinessModule';
import GeneralJournalDetailModule from './generalJournal/GeneralJournalDetailModule';
import GeneralJournalModule from './generalJournal/GeneralJournalModule';
import initializeRouter from './initializeRouter';

async function main(integrationType) {
  await initializeConfig();
  initializeAuth();

  const createIntegration = (await import(`./integration/create${integrationType}Integration.js`)).default;

  const root = document.getElementById('root');
  const setRootView = (component) => {
    ReactDOM.render(component, root);
  };

  const integration = createIntegration();

  const banking = new BankingModule(integration, setRootView);
  const business = new BusinessModule(integration, setRootView);
  const generalJournal = new GeneralJournalModule(integration, setRootView);
  const generalJournalDetail = new GeneralJournalDetailModule(integration, setRootView);

  const app = new App(setRootView);

  const routes = [
    { name: 'business', path: '/business' },
    { name: 'home', path: '/home' },
    { name: 'banking', path: '/:businessId/banking' },
    { name: 'generalJournal', path: '/:businessId/generalJournal' },
    { name: 'generalJournalDetail', path: '/:businessId/generalJournal/:referenceId' },
  ];

  const moduleMappings = {
    home: app,
    banking,
    business,
    generalJournal,
    generalJournalDetail,
  };

  const unsubscribeAllModulesFromStore = () => {
    Object.keys(moduleMappings).forEach((moduleName) => {
      if (moduleName !== 'home') {
        moduleMappings[moduleName].unsubscribeFromStore();
      }
    });
  };

  const actions = {
    business: () => { moduleMappings.business.run(); },
    home: () => { moduleMappings.home.run(); },
    banking: (context) => { moduleMappings.banking.run(context); },
    generalJournal: (context) => { moduleMappings.generalJournal.run(context); },
    generalJournalDetail: (context) => { moduleMappings.generalJournalDetail.run(context); },
  };

  initializeRouter({
    routes,
    actions,
    beforeAll: unsubscribeAllModulesFromStore,
    defaultRoute: 'home',
  });
}

main(
  process.env.REACT_APP_INTEGRATION_TYPE,
);
