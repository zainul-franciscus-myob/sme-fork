import { GET_ACTIVITIES_LIST } from '../ActivitiesIntents';

const loadActivitiesIntegration = (integration, businessId, region) => (
  new Promise((resolve, reject) => integration.read({
    intent: GET_ACTIVITIES_LIST,
    urlParams: { businessId, region },
    params: { businessId, region },
    onSuccess: resolve,
    onFailure: reject,
  }))
);

export default loadActivitiesIntegration;
