import { GET_UPDATE_SUBSCRIPTION_URL } from './subscriptionIntents';

export default class SubscriptionModule {
  constructor({ integration }) {
    this.integration = integration;
  }

  run = async ({ businessId }) => {
    try {
      const result = await new Promise((resolve, reject) => this.integration.read({
        intent: GET_UPDATE_SUBSCRIPTION_URL,
        urlParams: {
          businessId,
        },
        params: { },
        onSuccess: resolve,
        onFailure: reject,
      }));
      this.redirectToUrl(result.redirect);
    } catch (err) {
      console.error('Error redirecting to external subscription page');
      this.redirectToUrl('#');
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
