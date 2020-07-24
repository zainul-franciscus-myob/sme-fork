import IntegrationType from './IntegrationType';
import authHttpIntegration from './createAuthHttpIntegration';
import httpIntegration from './createHttpIntegration';

class BadIntegrationTypeError extends Error {
  constructor(integrationType) {
    super(`"${integrationType}" is not a valid integration type`);
    this.integrationType = integrationType;
  }
}

const getDefault = (module) => module.default;

const getCreateIntegration = (integrationType) => {
  switch (integrationType) {
    case IntegrationType.Http:
      return Promise.resolve(httpIntegration);
    case IntegrationType.AuthHttp:
      return Promise.resolve(authHttpIntegration);
    case IntegrationType.Memory:
      // Dynamically importing the memory integration module causes it to be bundled into a separate
      // chunk which is downloaded only when this line is hit at runtime. Hence, production code
      // won't ever download the memory integration or any of it's JSON fixtures.
      return import('./createMemoryIntegration').then(getDefault);
    default:
      throw new BadIntegrationTypeError(integrationType);
  }
};

export default getCreateIntegration;
