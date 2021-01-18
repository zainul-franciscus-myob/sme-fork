import { CLOSE_TASKS } from '../../rootIntents';
import isDismissEvent from './isDismissEvent';
import reactsToCloseEvent from './reactsToCloseEvent';

const closeTasks = async ({ dispatcher, integration, store, context }) => {
  const { businessId, tasks } = store.getState();
  if (!businessId) return;

  const { closeEvent, force } = context;
  if (
    force ||
    reactsToCloseEvent(tasks, closeEvent) ||
    isDismissEvent(closeEvent)
  ) {
    const newTasks = await new Promise((resolve) =>
      integration.write({
        intent: CLOSE_TASKS,
        urlParams: { businessId, closeEvent },
        onSuccess: resolve,
        onFailure: () => {
          dispatcher.updateTasksFailure();
          resolve();
        },
        allowParallelRequests: true,
      })
    );

    if (newTasks) {
      dispatcher.updateTasks(newTasks);
    }
  }
};

export default closeTasks;
