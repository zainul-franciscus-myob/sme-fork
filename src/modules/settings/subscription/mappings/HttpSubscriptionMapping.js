import {
  GET_UPDATE_SUBSCRIPTION_URL, LOAD_SUBSCRIPTION,
} from '../subscriptionIntents';

export default {
  [LOAD_SUBSCRIPTION]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/subscription/load_subscription`,
  },
  [GET_UPDATE_SUBSCRIPTION_URL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/subscription/subscribe_now`,
  },
};