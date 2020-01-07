import { CLOSE_ACTIVITY } from '../ActivitiesIntents';

const closeActivity = ({
  integration, businessId, activityId, activityKey,
}) => (
  new Promise((resolve, reject) => integration.write({
    intent: CLOSE_ACTIVITY,
    urlParams: {
      businessId,
      activityId,
      activityKey,
    },
    onSuccess: resolve,
    onFailure: reject,
  }))
);

export default closeActivity;
