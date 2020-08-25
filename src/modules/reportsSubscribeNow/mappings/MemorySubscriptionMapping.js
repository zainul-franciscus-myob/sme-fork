import { GET_UPDATE_SUBSCRIPTION_URL } from '../reportsSubscribeNowIntents';
import updateSubscriptionResponse from './data/updateSubscription.json';

export default {
  [GET_UPDATE_SUBSCRIPTION_URL]: ({ onSuccess }) =>
    onSuccess(updateSubscriptionResponse),
};
