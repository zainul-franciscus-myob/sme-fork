import { CLOSE_ACTIVITY } from '../../rootIntents';

const closeActivity = async ({
  dispatcher, integration, store, context,
}) => {
  const { businessId } = store.getState();
  const { activityId } = context;

  try {
    const activity = await new Promise((resolve, reject) => integration.write({
      intent: CLOSE_ACTIVITY,
      urlParams: {
        businessId,
        activityId,
      },
      onSuccess: resolve,
      onFailure: reject,
    }));

    dispatcher.updateActivity(activity);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }
};

export default closeActivity;
