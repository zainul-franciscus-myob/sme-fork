import { CLOSE_TASK } from '../../rootIntents';

const closeTask = async ({
  dispatcher, integration, store, context,
}) => {
  const { businessId } = store.getState();
  const { activityId, activityKey } = context;

  const close = new Promise((resolve, reject) => integration.write({
    intent: CLOSE_TASK,
    urlParams: {
      businessId,
      activityId,
      activityKey,
    },
    onSuccess: resolve,
    onFailure: reject,
  }));

  const activity = await close;

  dispatcher.updateActivity(activity);
};

export default closeTask;
