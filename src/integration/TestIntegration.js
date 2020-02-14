import RootMapping from './memoryMapping/RootMapping';

class TestIntegration {
  constructor() {
    this.requests = [];
    this.mapping = RootMapping;
  }

  read = ({ intent, onSuccess, onFailure }) => {
    this.requests.push({ intent });
    this.mapping[intent]({ intent, onSuccess, onFailure });
  }

  write = ({ intent, onSuccess, onFailure }) => {
    this.requests.push({ intent });
    this.mapping[intent]({ intent, onSuccess, onFailure });
  }

  resetRequests = () => { this.requests = []; }

  getRequests = () => this.requests;

  overrideMapping = (intent, fn) => {
    this.mapping = { ...this.mapping, [intent]: fn };
  };

  mapFailure = (intent) => {
    this.overrideMapping(intent, ({ onFailure }) => onFailure({ message: 'fails' }));
  };
}

export default TestIntegration;
