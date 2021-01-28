import { GET_TASKS_LIST } from '../../rootIntents';

const loadTasks = async ({
  dispatcher,
  integration,
  store,
  compareEnergyBill,
}) => {
  const { businessId, region } = store.getState();

  if (!businessId || !region) return;

  const tasks = await new Promise((resolve) =>
    integration.read({
      intent: GET_TASKS_LIST,
      urlParams: { businessId },
      params: { region, compareEnergyBill },
      onSuccess: resolve,
      onFailure: () => {
        dispatcher.loadTasksFailure();
        resolve();
      },
    })
  );

  if (tasks) {
    dispatcher.loadTasks(tasks);
  }
};

export default loadTasks;
