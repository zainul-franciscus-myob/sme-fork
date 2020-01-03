import { UPDATE_ACTIVITY } from '../ActivitiesIntents';

const saveActivities = (integration, businessId, activity) => (
  new Promise((resolve, reject) => integration.write({
    intent: UPDATE_ACTIVITY,
    urlParams: {
      businessId,
      activityId: activity.id,
    },
    activity,
    onSuccess: resolve,
    onFailure: reject,
  }))
);

export default saveActivities;
