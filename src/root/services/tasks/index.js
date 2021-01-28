import closeTasks from './closeTasks';
import dismissTask from './dismissTask';
import loadTasks from './loadTasks';

export default (dispatcher, integration, store) => {
  const load = (compareEnergyBill) =>
    loadTasks({ dispatcher, integration, store, compareEnergyBill });
  const close = (context) =>
    closeTasks({
      dispatcher,
      integration,
      context,
      store,
    });
  const dismiss = (taskKey) =>
    dismissTask({
      dispatcher,
      integration,
      taskKey,
      store,
      closeTasks: close,
    });

  return {
    load,
    closeTasks: close,
    dismissTask: dismiss,
  };
};
