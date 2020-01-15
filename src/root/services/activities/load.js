import { GET_ACTIVITIES_LIST } from '../../rootIntents';

const loadActivities = async ({ dispatcher, integration, store }) => {
  const { businessId, region } = store.getState();

  try {
    const activities = await new Promise((resolve, reject) => integration.read({
      intent: GET_ACTIVITIES_LIST,
      urlParams: { businessId },
      params: { region },
      onSuccess: resolve,
      onFailure: reject,
    }));

    dispatcher.loadActivities(activities);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }
};

export default loadActivities;
