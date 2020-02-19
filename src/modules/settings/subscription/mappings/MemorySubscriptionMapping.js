import {
  GET_CHANGE_PLAN_URL, GET_UPDATE_SUBSCRIPTION_URL,
} from '../subscriptionIntents';
import updateSubscriptionResponse from './data/updateSubscription.json';

export default {
  [GET_UPDATE_SUBSCRIPTION_URL]: ({ onSuccess }) => onSuccess(updateSubscriptionResponse),
  [GET_CHANGE_PLAN_URL]: ({ onSuccess }) => onSuccess(updateSubscriptionResponse),
};
