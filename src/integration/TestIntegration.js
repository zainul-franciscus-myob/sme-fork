import RootMapping from './memoryMapping/RootMapping';

class TestIntegration {
  constructor() {
    this.requests = [];
  }

  read = ({ intent, onSuccess, onFailure }) => {
    this.requests.push({ intent });
    RootMapping[intent]({ intent, onSuccess, onFailure });
  }

  write = ({ intent, onSuccess, onFailure }) => {
    this.requests.push({ intent });
    RootMapping[intent]({ intent, onSuccess, onFailure });
  }

  resetRequests = () => { this.requests = []; }

  getRequests = () => this.requests;

  getIntents = () => this.requests.map(request => request.intent)
}

export default TestIntegration;
