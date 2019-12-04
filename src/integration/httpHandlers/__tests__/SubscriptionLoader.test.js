import { LOAD_SUBSCRIPTION } from '../SubscriptionLoaderIntents';
import SubscriptionLoader from '../SubscriptionLoader';

const createIntegration = (document) => {
  const integration = {
    readCalls: [],
  };
  integration.read = (options) => {
    integration.readCalls.push(options);
    options.onSuccess();
    // eslint-disable-next-line no-param-reassign
    document.cookie += `subscription-for-${options.urlParams.businessId}=yes;`;
  };
  return integration;
};

const createDocument = () => ({
  cookie: '',
});

let integration;
let document;
let subscriptionLoader;

describe('SubscriptionLoader', () => {
  beforeEach(() => {
    document = createDocument();
    integration = createIntegration(document);
    subscriptionLoader = new SubscriptionLoader(integration, document);
  });

  describe('when loading data that is not specific to a business', () => {
    it('does not perform a LOAD_SUBSCRIPTION call', async () => {
      await subscriptionLoader.loadSubscriptionIfNeeded({
        intent: 'load business list',
        urlParams: { },
      });
      expect(integration.readCalls.length).toBe(0);
    });
  });

  describe('when loading subscription data for a business', () => {
    it('does not double-up on the LOAD_SUBSCRIPTION call', async () => {
      await subscriptionLoader.loadSubscriptionIfNeeded({
        intent: LOAD_SUBSCRIPTION,
        urlParams: { businessId: '12345' },
      });
      expect(integration.readCalls.length).toBe(0);
    });
  });

  describe('when loading non-subscription data for a business', () => {
    describe('and the cookie for this business has not been loaded', () => {
      it('requests to load the subscription tied to a promise', async () => {
        await subscriptionLoader.loadSubscriptionIfNeeded({
          intent: 'Load some data',
          urlParams: { businessId: '12345' },
        });
        expect(integration.readCalls[0].intent).toBe(LOAD_SUBSCRIPTION);
      });

      describe('and subsequent calls are made before the subscription is loaded', () => {
        it('returns a promise to all calls waiting', () => {
          subscriptionLoader.loadSubscriptionIfNeeded({
            intent: 'Load some data',
            urlParams: { businessId: '12345' },
          });
          subscriptionLoader.loadSubscriptionIfNeeded({
            intent: 'Load some data',
            urlParams: { businessId: '12345' },
          });
          expect(integration.readCalls.length).toBe(1);
        });
      });
    });

    describe('and the cookie for this business has been loaded', () => {
      beforeEach(() => {
        subscriptionLoader.loadSubscriptionIfNeeded({
          intent: 'Load some data',
          urlParams: { businessId: '12345' },
        });
      });

      it('does not load the subscription and returns a fulfilled promise', async () => {
        await subscriptionLoader.loadSubscriptionIfNeeded({
          intent: 'Load more data',
          urlParams: { businessId: '12345' },
        });
        expect(integration.readCalls.length).toBe(1);
      });
    });

    describe('and the cookie for this business has been loaded, but missing', () => {
      beforeEach(() => {
        subscriptionLoader.loadSubscriptionIfNeeded({
          intent: 'Load some data',
          urlParams: { businessId: '12345' },
        });
        document.cookie = '';
      });

      it('requests to load the subscription tied to a new promise', async () => {
        await subscriptionLoader.loadSubscriptionIfNeeded({
          intent: 'Load more data',
          urlParams: { businessId: '12345' },
        });
        expect(integration.readCalls[1].intent).toBe(LOAD_SUBSCRIPTION);
      });
    });
  });

  describe('when loading non-subscription data for two businesses', () => {
    describe('and the cookie for one business has not been loaded', () => {
      beforeEach(async () => {
        await subscriptionLoader.loadSubscriptionIfNeeded({
          intent: 'Load some data',
          urlParams: { businessId: '12345' },
        });
      });
      it('requests to load the subscriptions tied to promises', async () => {
        await subscriptionLoader.loadSubscriptionIfNeeded({
          intent: 'Load more data',
          urlParams: { businessId: '12345' },
        });
        await subscriptionLoader.loadSubscriptionIfNeeded({
          intent: 'Load some data',
          urlParams: { businessId: '54321' },
        });
        expect(integration.readCalls.length).toBe(2);
      });
    });
  });
});
