import { LINK_USER, LOAD_BUSINESS_INFORMATION } from './LinkUserIntents';
import { getBusinessId, getContent } from './LinkUserSelectors';

const createLinkUserIntegrator = (store, integration) => ({
  loadBusinessInformation: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_BUSINESS_INFORMATION;

    const businessId = getBusinessId(state);
    const urlParams = { businessId };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  linkUserId: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LINK_USER;

    const businessId = getBusinessId(state);
    const urlParams = { businessId };
    const content = getContent(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createLinkUserIntegrator;
