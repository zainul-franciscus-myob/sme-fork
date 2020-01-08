import {
  GET_UPDATE_SUBSCRIPTION_URL, LOAD_SUBSCRIPTION,
} from '../subscriptionIntents';
import loadSubscriptionResponse from './data/subscription.json';
import updateSubscriptionResponse from './data/updateSubscription.json';

export default {
  [LOAD_SUBSCRIPTION]: ({ onSuccess }) => onSuccess(loadSubscriptionResponse),
  [GET_UPDATE_SUBSCRIPTION_URL]: ({ onSuccess }) => onSuccess(updateSubscriptionResponse),
};