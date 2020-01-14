import { CLOSE_ACTIVITY } from '../../rootIntents';

const closeActivity = async ({
  dispatcher, integration, store, context,
}) => {
  const { businessId } = store.getState();
  const { activityId } = context;

  const close = new Promise((resolve, reject) => integration.write({
    intent: CLOSE_ACTIVITY,
    urlParams: {
      businessId,
      activityId,
    },
    onSuccess: resolve,
    onFailure: reject,
  }));

  const activity = await close;

  dispatcher.updateActivity(activity);
};

export default closeActivity;
