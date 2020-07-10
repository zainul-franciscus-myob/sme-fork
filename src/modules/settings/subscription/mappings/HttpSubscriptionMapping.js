import {
  GET_CHANGE_PLAN_URL,
  GET_UPDATE_SUBSCRIPTION_URL,
} from '../subscriptionIntents';

export default {
  [GET_UPDATE_SUBSCRIPTION_URL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/subscription/subscribe_now`,
  },
  [GET_CHANGE_PLAN_URL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/subscription/change_plan`,
  },
};
