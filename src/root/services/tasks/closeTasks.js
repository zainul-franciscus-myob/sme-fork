import { CLOSE_TASKS } from '../../rootIntents';

const reactsToCloseEvent = (tasks, closeEvent) => {
  const hasCloseEvent = task => task.closeEvent === closeEvent;
  return tasks
  && tasks.some(t => hasCloseEvent(t) || (t.tasks && t.tasks.some(st => hasCloseEvent(st))));
};

//  If Event is not a close event of a current task, then don't send it.
const closeTasks = async ({
  dispatcher, integration, store, context,
}) => {
  const { businessId, tasks } = store.getState();
  if (!businessId) return;

  const { closeEvent } = context;
  if (!reactsToCloseEvent(tasks, closeEvent)) return;

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
