import { LOAD_DEFAULT_TEMPLATE } from '../../TemplateBuilderIntents';

const fetchDefaultTemplate = (integration, store) => {
  const state = store.getState();
  const { businessId } = state;

  return new Promise((resolve, reject) =>
    integration.read({
      intent: LOAD_DEFAULT_TEMPLATE,
      urlParams: { businessId },
      onSuccess: resolve,
      onFailure: reject,
    })
  );
};

export default fetchDefaultTemplate;
