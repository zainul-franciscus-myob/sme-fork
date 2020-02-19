import { LOAD_SUBSCRIPTION } from '../rootIntents';
import createRootIntegrator from '../createRootIntegrator';

const createIntegration = () => {
  const integration = {
    readCalls: [],
  };
  integration.read = (options) => {
    integration.readCalls.push(options);
    options.onSuccess();
  };
  return integration;
};

const store = {
  getState: () => ({
    businessId: '12345',
  }),
};

let integration;
let rootIntegrator;

describe('SubscriptionLoader', () => {
  beforeEach(() => {
    integration = createIntegration();
    rootIntegrator = createRootIntegrator(store, integration);
  });

  it('requests to load the subscription', async () => {
    await rootIntegrator.loadSubscriptions();

    expect(integration.readCalls[0].intent).toBe(LOAD_SUBSCRIPTION);
  });
});
