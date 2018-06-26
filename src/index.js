import PetModule from './toy/PetModule';
import '@myob/myob-styles/dist/styles/myob-clean.css';
import './index.css';

async function main(integrationType, integrationConfig) {
  const Integration = (await import(`./integration/${integrationType}`)).default;
  const config = await import(`./integration/config/${integrationConfig}`);

  const rootElement = document.getElementById('root');
  const integration = new Integration(config);
  const module = new PetModule(integration, rootElement);

  module.run();
}

main(
  process.env.REACT_APP_INTEGRATION_TYPE,
  process.env.REACT_APP_INTEGRATION_CONFIG
);
