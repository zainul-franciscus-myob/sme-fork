import BankingModule from './banking/BankingModule';
import '@myob/myob-styles/dist/styles/myob-clean.css';
import './index.css';

async function main(integrationType) {
  const Integration = (await import(`${integrationType}`)).default;

  const rootElement = document.getElementById('root');
  const integration = new Integration();
  const module = new BankingModule(integration, rootElement);

  module.run();
}

main(
  process.env.REACT_APP_INTEGRATION_TYPE
);
