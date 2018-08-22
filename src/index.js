import BankingModule from './banking/BankingModule';
import ReactDOM from 'react-dom';
import PetModule from './pet/PetModule';
import '@myob/myob-styles/dist/styles/myob-clean.css';
import './index.css';
import initalizeRouter from './router';
import App from './App';
import GeneralJournalModule from './journal/GeneralJournalModule';

async function main(integrationType) {

  const Integration = (await import(`./integration/${integrationType}Integration.js`)).default;

  const root = document.getElementById('root');
  const setRootView = (component) => {
    ReactDOM.render(component, root);
  }

  const integration = new Integration();

  const banking = new BankingModule(integration, setRootView);
  const journal = new GeneralJournalModule(integration, setRootView);
  const pets = new PetModule(integration, setRootView);
  const app = new App(setRootView);

  const routes = [
    {name: 'home',    path:'/home'},
    {name: 'banking', path:'/banking'},
    {name: 'journal', path:'/journal'},
    {name: 'pets',    path:'/pets'}
  ];

  const actions = {
    home:     () => { app.run() },
    banking:  () => { banking.run() },
    journal:  () => { journal.run() },
    pets:     () => { pets.run() }
  };

  initalizeRouter({
    routes,
    actions,
    defaultRoute: 'home'
  });
}

main(
  process.env.REACT_APP_INTEGRATION_TYPE
);

