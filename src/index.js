import PetModule from './toy/PetModule';
import './index.css';

async function main(integrationModule, integrationConfig) {
  const IntegrationModule = await import(`./integration/${integrationModule}`);
  const config = await import(`./integration/config/${integrationConfig}`);
  const Integration = IntegrationModule.default;
  
  const rootElement = document.getElementById('root');
  const integration = new Integration(config);
  const module = new PetModule(integration, rootElement);

  module.run();
}

main(
  process.env.REACT_APP_INTEGRATION_MODULE,
  process.env.REACT_APP_INTEGRATION_CONFIG
);
