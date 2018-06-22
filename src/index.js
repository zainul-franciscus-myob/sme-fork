import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Toy from './toy/Toy';

async function main(integrationModule, integrationConfig) {
  const IntegrationModule = await import(`./integration/${integrationModule}`);
  const config = await import(`./integration/config/${integrationConfig}`);
  const Integration = IntegrationModule.default;

  // TODO: Instantiate new ServiceLayer(new Integration(config));

  ReactDOM.render(<Toy />, document.getElementById('root'));
}

main(
  process.env.REACT_APP_INTEGRATION_MODULE,
  process.env.REACT_APP_INTEGRATION_CONFIG
);
