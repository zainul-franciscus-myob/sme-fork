import { GET_UPDATE_SUBSCRIPTION_URL } from '../settings/subscription/subscriptionIntents';

export default class ReportsSubscribeNowModule {
  constructor({ integration, navigateTo }) {
    this.integration = integration;
    this.navigateTo = navigateTo;
  }

  unsubscribeFromStore = () => {};

  resetState = () => {};

  getAbsoluteDashboardUrl = ({ businessId, region }) => {
    return `${window.location.origin}/#/${region}/${businessId}/dashboard`;
  };

  getErrorUrl = ({ businessId, region }) => {
    return `/#/${region}/${businessId}/error`;
  };

  subscribeNow = ({ businessId, redirectUrl, errorUrl }) => {
    this.integration.write({
      intent: GET_UPDATE_SUBSCRIPTION_URL,
      urlParams: {
        businessId,
      },
      content: { redirectUrl },
      onSuccess: ({ redirect: subscribeNowUrl }) =>
        window.location.replace(subscribeNowUrl),
      onFailure: () => this.navigateTo(errorUrl),
    });
  };

  run = ({ businessId, region }) => {
    const redirectUrl = this.getAbsoluteDashboardUrl({ businessId, region });
    const errorUrl = this.getErrorUrl({ businessId, region });

    this.subscribeNow({
      businessId,
      redirectUrl,
      errorUrl,
    });
  };
}
