import { CLOSE_TASKS } from '../../rootIntents';

const closeTasks = async ({
  dispatcher, integration, store, context,
}) => {
  const { businessId } = store.getState();
  const { closeEvent } = context;

  const tasks = await new Promise((resolve, reject) => integration.write({
    intent: CLOSE_TASKS,
    urlParams: { businessId, closeEvent },
    onSuccess: resolve,
    onFailure: reject,
  }));

  dispatcher.updateTasks(tasks);
};

export default closeTasks;
