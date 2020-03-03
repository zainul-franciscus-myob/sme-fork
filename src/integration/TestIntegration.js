import RootMapping from './memoryMapping/RootMapping';

class TestIntegration {
  constructor() {
    this.requests = [];
    this.mapping = RootMapping;
  }

  read = ({
    intent, params, onSuccess, onFailure,
  }) => {
    this.requests.push({ intent, params });
    this.mapping[intent]({ intent, onSuccess, onFailure });
  }

  write = ({
    intent, params, onSuccess, onFailure,
  }) => {
    this.requests.push({ intent, params });
    this.mapping[intent]({ intent, onSuccess, onFailure });
  }

  writeFormData = ({
    intent, params, onSuccess, onFailure,
  }) => {
    this.requests.push({ intent, params });
    this.mapping[intent]({ intent, onSuccess, onFailure });
  }

  resetRequests = () => { this.requests = []; }

  getRequests = () => this.requests;

  overrideMapping = (intent, fn) => {
    this.mapping = { ...this.mapping, [intent]: fn };
  };

  mapFailure = (intent, error = { message: 'fails' }) => {
    this.overrideMapping(intent, ({ onFailure }) => onFailure(error));
  };
}

export default TestIntegration;
