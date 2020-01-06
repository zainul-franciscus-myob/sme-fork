import { CLOSE_TASK } from '../ActivitiesIntents';

const closeTask = ({
  integration, businessId, activityId, activityKey,
}) => (
  new Promise((resolve, reject) => integration.write({
    intent: CLOSE_TASK,
    urlParams: {
      businessId,
      activityId,
      activityKey,
    },
    onSuccess: resolve,
    onFailure: reject,
  }))
);

export default closeTask;
