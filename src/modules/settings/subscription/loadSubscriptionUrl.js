import { GET_UPDATE_SUBSCRIPTION_URL } from './subscriptionIntents';

export default async (integration, businessId, returnUrl) => {
  const { redirect } = await new Promise((resolve, reject) => integration.write({
    intent: GET_UPDATE_SUBSCRIPTION_URL,
    urlParams: {
      businessId,
    },
    content: { redirectUrl: returnUrl },
    onSuccess: resolve,
    onFailure: reject,
  }));
  return redirect;
};
