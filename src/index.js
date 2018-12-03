import ReactDOM from 'react-dom';

import '@myob/myob-styles/dist/styles/myob-clean.css';

import './index.css';
import { initializeAuth } from './Auth';
import { initializeConfig } from './Config';
import App from './App';
import BankingModule from './banking/BankingModule';
import BusinessModule from './business/BusinessModule';
import GeneralJournalDetailModule from './generalJournal/generalJournalDetail/GeneralJournalDetailModule';
import GeneralJournalModule from './generalJournal/generalJournalList/GeneralJournalModule';
import Inbox from './inbox';
import SpendMoneyDetailModule from './spendMoney/spendMoneyDetail/SpendMoneyDetailModule';
import initializeRouter from './initializeRouter';

async function main(integrationType) {
  await initializeConfig();
  initializeAuth();

  const createIntegration = (await import(`./integration/create${integrationType}Integration.js`)).default;

  const root = document.getElementById('root');
  const setRootView = (component) => {
    ReactDOM.render(component, root);
  };

  const inbox = new Inbox();
  const { popMessages, pushMessage, clearInbox } = inbox;

  const integration = createIntegration();

  const banking = new BankingModule({ integration, setRootView });
  const business = new BusinessModule({ integration, setRootView });
  const generalJournal = new GeneralJournalModule({ integration, setRootView, popMessages });
  const generalJournalDetail = new GeneralJournalDetailModule({
    integration, setRootView, pushMessage,
  });
  const spendMoney = new SpendMoneyDetailModule({ integration, setRootView, popMessages });

  const app = new App(setRootView);
  const routes = [
    { name: 'business', path: '/business' },
    { name: 'home', path: '/home' },
    { name: 'banking', path: '/:businessId/banking' },
    { name: 'generalJournal', path: '/:businessId/generalJournal' },
    { name: 'spendMoney', path: '/:businessId/spendMoney/new' },
    { name: 'generalJournalDetail', path: '/:businessId/generalJournal/:journalId' },
  ];

  const moduleMappings = {
    home: app,
    banking,
    business,
    generalJournal,
    generalJournalDetail,
    spendMoney,
  };

  const actions = {
    business: () => { moduleMappings.business.run(); },
    home: () => { moduleMappings.home.run(); },
    banking: (context) => { moduleMappings.banking.run(context); },
    generalJournal: (context) => { moduleMappings.generalJournal.run(context); },
    spendMoney: (context) => { moduleMappings.spendMoney.run(context); },
    generalJournalDetail: (context) => { moduleMappings.generalJournalDetail.run(context); },
  };

  const unsubscribeAllModulesFromStore = () => {
    Object.keys(moduleMappings).forEach((moduleName) => {
      if (moduleName !== 'home') {
        moduleMappings[moduleName].unsubscribeFromStore();
      }
    });
  };

  const beforeAll = (previousModule) => {
    unsubscribeAllModulesFromStore();
    const module = moduleMappings[previousModule];
    if (module && module.exit) {
      module.exit();
    }
  };

  initializeRouter({
    routes,
    actions,
    beforeAll,
    defaultRoute: 'home',
    afterAll: () => clearInbox,
  });
}

main(
  process.env.REACT_APP_INTEGRATION_TYPE,
);
