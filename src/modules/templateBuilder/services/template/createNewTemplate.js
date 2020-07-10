import { CREATE_NEW_TEMPLATE } from '../../TemplateBuilderIntents';

const createNewTemplate = (integration, store) => {
  const state = store.getState();
  const { businessId } = state;

  return new Promise((resolve, reject) =>
    integration.read({
      intent: CREATE_NEW_TEMPLATE,
      urlParams: { businessId },
      onSuccess: resolve,
      onFailure: reject,
    })
  );
};

export default createNewTemplate;
