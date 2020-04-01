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
let onSuccess;

describe('SubscriptionLoader', () => {
  beforeEach(() => {
    integration = createIntegration();
    rootIntegrator = createRootIntegrator(store, integration);
    onSuccess = jest.fn();
  });

  it('requests to load the subscription', async () => {
    await rootIntegrator.loadSubscription({ onSuccess });

    expect(integration.readCalls[0].intent).toBe(LOAD_SUBSCRIPTION);
  });

  it('calls onSuccess callback', async () => {
    await rootIntegrator.loadSubscription({ onSuccess });

    expect(onSuccess).toHaveBeenCalled();
  });
});
