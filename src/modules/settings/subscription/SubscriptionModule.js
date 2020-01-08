import { GET_UPDATE_SUBSCRIPTION_URL } from './subscriptionIntents';

export default class SubscriptionModule {
  constructor({ integration, previousRoute }) {
    this.integration = integration;
    this.previousRoute = previousRoute;
  }

  run = async ({ businessId }) => {
    try {
      const result = await new Promise((resolve, reject) => this.integration.write({
        intent: GET_UPDATE_SUBSCRIPTION_URL,
        urlParams: {
          businessId,
        },
        content: { redirectUrl: this.previousRoute.url },
        onSuccess: resolve,
        onFailure: reject,
      }));
      this.redirectToUrl(result.redirect);
    } catch (err) {
      console.error('Error redirecting to external subscription page');
      this.redirectToUrl(this.previousRoute.url);
    }
  };

  unsubscribeFromStore = () => {}

  resetState = () => {}

  redirectToUrl = (url) => {
    if (url) {
      window.location.href = url;
    }
  }
}
