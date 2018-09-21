import ReactDOM from 'react-dom';

import '@myob/myob-styles/dist/styles/myob-clean.css';

import './index.css';
import { initializeAuth } from './auth';
import { initializeConfig } from './Config';
import App from './App';
import BankingModule from './banking/BankingModule';
import BusinessModule from './business/BusinessModule';
import GeneralJournalModule from './journal/GeneralJournalModule';
import initalizeRouter from './router';

async function main(integrationType) {
  await initializeConfig();
  initializeAuth();

  const Integration = (await import(`./integration/${integrationType}Integration.js`)).default;

  const root = document.getElementById('root');
  const setRootView = (component) => {
    ReactDOM.render(component, root);
  };

  const integration = Integration();

  const banking = new BankingModule(integration, setRootView);
  const business = new BusinessModule(integration, setRootView);
  const journal = new GeneralJournalModule(integration, setRootView);
  const app = new App(setRootView);

  const routes = [
    { name: 'business', path: '/business' },
    { name: 'home', path: '/home' },
    { name: 'banking', path: '/:businessId/banking' },
    { name: 'journal', path: '/:businessId/journal' },
  ];

  const actions = {
    business: () => { business.run(); },
    home: () => { app.run(); },
    banking: (context) => { banking.run(context); },
    journal: (context) => { journal.run(context); },
  };

  initalizeRouter({
    routes,
    actions,
    defaultRoute: 'home',
  });
}

main(
  process.env.REACT_APP_INTEGRATION_TYPE,
);
