import {
  LOAD_SUBSCRIPTION,
} from '../httpHandlers/SubscriptionLoaderIntents';

export default {
  [LOAD_SUBSCRIPTION]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/subscription/load_subscription`,
  },
};
