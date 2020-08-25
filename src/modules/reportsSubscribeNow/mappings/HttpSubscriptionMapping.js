import { GET_UPDATE_SUBSCRIPTION_URL } from '../reportsSubscribeNowIntents';

export default {
  [GET_UPDATE_SUBSCRIPTION_URL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/subscription/subscribe_now`,
  },
};
