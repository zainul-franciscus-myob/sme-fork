import IntegrationType from './IntegrationType';
import createAuthHttpIntegration from './createAuthHttpIntegration';
import createHttpIntegration from './createHttpIntegration';
import createMemoryIntegration from './createMemoryIntegration';

class BadIntegrationTypeError extends Error {
  constructor(integrationType) {
    super(`"${integrationType}" is not a valid integration type`);
    this.integrationType = integrationType;
  }
}

const getCreateIntegration = (integrationType) => {
  switch (integrationType) {
    case IntegrationType.Http:
      return createHttpIntegration;
    case IntegrationType.AuthHttp:
      return createAuthHttpIntegration;
    case IntegrationType.Memory:
      return createMemoryIntegration;
    default:
      throw new BadIntegrationTypeError(integrationType);
  }
};

export default getCreateIntegration;
