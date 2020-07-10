import {
  AUTHORISE_WITH_CODE,
  GET_CODE_TO_AUTHORISE,
} from './paySuperAuthorisationModalIntents';
import {
  getAuthoriseWithCodeContent,
  getBusinessId,
  getCodeToAuthoriseContent,
} from './paySuperAuthorisationModalSelector';

const createPaySuperAuthorisationModalIntegrator = (store, integration) => ({
  getCodeToAuthorise: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const content = getCodeToAuthoriseContent(state);

    integration.write({
      intent: GET_CODE_TO_AUTHORISE,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  authoriseWithCode: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const content = getAuthoriseWithCodeContent(state);

    integration.write({
      intent: AUTHORISE_WITH_CODE,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createPaySuperAuthorisationModalIntegrator;
