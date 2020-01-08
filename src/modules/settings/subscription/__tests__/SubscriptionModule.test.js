import { GET_UPDATE_SUBSCRIPTION_URL } from '../subscriptionIntents';
import SubscriptionModule from '../SubscriptionModule';

describe('SubscriptionModule', () => {
  const integrationResult = { redirect: 'redirect url' };
  const previousRoute = { url: 'url of the previous route' };

  it('should call appropriate integration', async () => {
    const integration = {
      write: jest.fn(({ onSuccess }) => onSuccess(integrationResult)),
    };
    const module = new SubscriptionModule({ integration, previousRoute });
    await module.run({ businessId: 'business id' });
    expect(integration.write).toBeCalledWith(
      expect.objectContaining({
        intent: GET_UPDATE_SUBSCRIPTION_URL,
        urlParams: { businessId: 'business id' },
        content: { redirectUrl: previousRoute.url },
      }),
    );
  });

  it('should redirect to integration result', async () => {
    const integration = {
      write: jest.fn(({ onSuccess }) => onSuccess(integrationResult)),
    };
    const module = new SubscriptionModule({ integration, previousRoute });
    module.redirectToUrl = jest.fn();
    await module.run({ businessId: 'business id' });
    expect(module.redirectToUrl).toBeCalledWith(integrationResult.redirect);
  });

  it('on error should redirect to previous route', async () => {
    const integration = {
      write: jest.fn(({ onFailure }) => onFailure('big error')),
    };
    const module = new SubscriptionModule({ integration, previousRoute });
    module.redirectToUrl = jest.fn();
    await module.run({ businessId: 'business id' });
    expect(module.redirectToUrl).toBeCalledWith(previousRoute.url);
  });
});
