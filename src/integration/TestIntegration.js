import RootMapping from './memoryMapping/RootMapping';

class TestIntegration {
  constructor() {
    this.requests = [];
    this.resetMapping();
  }

  read = ({ intent, urlParams, params, onSuccess, onFailure }) => {
    this.requests.push({ intent, urlParams, params });
    this.mapping[intent]({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  };

  readFile = ({ intent, urlParams, params, content, onSuccess, onFailure }) => {
    this.requests.push({ intent, urlParams, params });
    this.mapping[intent]({
      intent,
      urlParams,
      params,
      content,
      onSuccess,
      onFailure,
    });
  };

  write = ({ intent, urlParams, params, content, onSuccess, onFailure }) => {
    this.requests.push({ intent, urlParams, params, content });
    this.mapping[intent]({
      intent,
      urlParams,
      params,
      content,
      onSuccess,
      onFailure,
    });
  };

  writeFormData = ({ intent, urlParams, params, onSuccess, onFailure }) => {
    this.requests.push({ intent, urlParams, params });
    this.mapping[intent]({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  };

  resetRequests = () => {
    this.requests = [];
  };

  resetMapping = () => {
    this.mapping = { ...RootMapping };
  };

  getRequests = () => this.requests;

  overrideMapping = (intent, fn) => {
    this.mapping = { ...this.mapping, [intent]: fn };
  };

  mapFailure = (intent, error = { message: 'fails' }) => {
    this.overrideMapping(intent, ({ onFailure }) => onFailure(error));
  };

  mapSuccess = (intent, response) => {
    this.mapping = {
      ...this.mapping,
      [intent]: ({ onSuccess }) => onSuccess(response),
    };
  };
}

export default TestIntegration;
