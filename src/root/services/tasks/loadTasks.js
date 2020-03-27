import { GET_TASKS_LIST } from '../../rootIntents';

const loadTasks = async ({ dispatcher, integration, store }) => {
  const { businessId, region } = store.getState();

  if (!businessId || !region) return;

  try {
    const tasks = await new Promise((resolve, reject) => integration.read({
      intent: GET_TASKS_LIST,
      urlParams: { businessId },
      params: { region },
      onSuccess: resolve,
      onFailure: reject,
    }));

    dispatcher.loadTasks(tasks);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }
};

export default loadTasks;
