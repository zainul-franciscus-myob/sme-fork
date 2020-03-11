import { CLOSE_TASKS } from '../../rootIntents';
import isDismissEvent from './isDismissEvent';
import reactsToCloseEvent from './reactsToCloseEvent';

//  If Event is not a close event of a current task, then don't send it.
const closeTasks = async ({
  dispatcher, integration, store, context,
}) => {
  const { businessId, tasks } = store.getState();
  if (!businessId) return;

  const { closeEvent } = context;
  const dismissEvent = isDismissEvent(closeEvent);
  if (!reactsToCloseEvent(tasks, closeEvent) && !dismissEvent) return;

  const newTasks = await new Promise((resolve, reject) => integration.write({
    intent: CLOSE_TASKS,
    urlParams: { businessId, closeEvent },
    onSuccess: resolve,
    onFailure: reject,
    allowParallelRequests: true,
  }));

  dispatcher.updateTasks(newTasks);
};

export default closeTasks;
