import BankingModule from './banking/BankingModule';
import ReactDOM from 'react-dom';
import PetModule from './pet/PetModule';
import '@myob/myob-styles/dist/styles/myob-clean.css';
import './index.css';
import Router from './router';
import App from './App';

async function main(integrationType) {

  const Integration = (await import(`./integration/${integrationType}Integration.js`)).default;

  const root = document.getElementById('root');
  const setRootView = (component) => {
    ReactDOM.render(component, root);
  }

  const integration = new Integration();

  const banking = new BankingModule(integration, setRootView);
  const pets = new PetModule(integration, setRootView);
  const app = new App(setRootView);

  const routes = [
    {name: 'home',    path:'/home', isDefault: true},
    {name: 'banking', path:'/banking'},
    {name: 'pets',    path:'/pets'}
  ];

  const actions = {
    home:     () => { app.run() },
    banking:  () => { banking.run() },
    pets:     () => { pets.run() }
  };

  Router(routes, actions);
}

main(
  process.env.REACT_APP_INTEGRATION_TYPE
);

