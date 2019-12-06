import { LOAD_SUBSCRIPTION } from './SubscriptionLoaderIntents';

export default class SubscriptionLoader {
  constructor(integration, document) {
    this.promises = {};
    this.integration = integration;
    this.document = document;
  }

  loadSubscriptionIfNeeded = ({
    intent,
    urlParams: { businessId } = {},
  }) => {
    if (intent === LOAD_SUBSCRIPTION || !businessId) {
      return Promise.resolve();
    }

    if (!this.promises[businessId]) {
      this.promises[businessId] = this.fetchSubscription(businessId);
    }
    return this.promises[businessId].then(() => this.refetchCookieIfMissing(businessId));
  };

  refetchCookieIfMissing = (businessId) => {
    // eslint-disable-next-line no-useless-escape
    const cookieIdentifier = new RegExp(`subscription-for-${businessId}\=.+`);
    const cookie = this.document.cookie.split(';').find(it => cookieIdentifier.test(it));
    if (!cookie) {
      this.promises[businessId] = this.fetchSubscription(businessId);
    }
    return this.promises[businessId];
  }

  fetchSubscription = businessId => new Promise((resolve, reject) => {
    const intent = LOAD_SUBSCRIPTION;

    const urlParams = {
      businessId,
    };
    const onSuccess = () => resolve();

    const onFailure = () => {
      reject(new Error('Failed to load subscription'));
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  });
}
