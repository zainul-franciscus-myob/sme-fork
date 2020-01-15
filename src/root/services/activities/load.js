import { GET_ACTIVITIES_LIST } from '../../rootIntents';

const loadActivities = async ({ dispatcher, integration, store }) => {
  const { businessId, region } = store.getState();

  const getActivities = new Promise((resolve, reject) => integration.read({
    intent: GET_ACTIVITIES_LIST,
    urlParams: { businessId },
    params: { region },
    onSuccess: resolve,
    onFailure: reject,
  }));

  const activities = await getActivities;

  dispatcher.loadActivities(activities);
};

export default loadActivities;
