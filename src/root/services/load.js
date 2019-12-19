import { LOAD_SETTINGS } from '../rootIntents';

const load = (dispatcher, integration, context) => {
  const urlParams = { businessId: context.businessId };

  // eslint-disable-next-line no-console
  const onFailure = error => console.error(error);

  const onSuccess = settings => dispatcher.loadSettings(settings);

  integration.read({
    intent: LOAD_SETTINGS,
    urlParams,
    onSuccess,
    onFailure,
  });
};

export default load;
