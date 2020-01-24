import { CLOSE_TASKS } from '../../rootIntents';

const closeTasks = async ({
  dispatcher, integration, store, context,
}) => {
  const { businessId } = store.getState();
  const { closeEvent } = context;

  const activities = await new Promise((resolve, reject) => integration.write({
    intent: CLOSE_TASKS,
    urlParams: { businessId, closeEvent },
    onSuccess: resolve,
    onFailure: reject,
  }));

  dispatcher.updateActivities(activities);
};

export default closeTasks;
