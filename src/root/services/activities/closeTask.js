import { CLOSE_TASK } from '../../rootIntents';

const closeTask = async ({
  dispatcher, integration, store, context,
}) => {
  const { businessId } = store.getState();
  const { activityId, activityKey } = context;

  try {
    const activity = await new Promise((resolve, reject) => integration.write({
      intent: CLOSE_TASK,
      urlParams: {
        businessId,
        activityId,
        activityKey,
      },
      onSuccess: resolve,
      onFailure: reject,
    }));

    dispatcher.updateActivity(activity);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }
};

export default closeTask;
