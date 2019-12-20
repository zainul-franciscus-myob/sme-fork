import { AUTHORISE_WITH_CODE, GET_CODE_TO_AUTHORISE } from './paySuperAuthorisationModalIntents';
import { getAuthoriseWithCodeContent, getBusinessId, getCodeToAuthoriseContent } from './paySuperAuthorisationModalSelector';

const createPaySuperAuthorisationModalModuleIntegrator = (store, integration) => ({
  getCodeToAuthorise: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = GET_CODE_TO_AUTHORISE;

    const urlParams = {
      businessId: getBusinessId(state),
    };
    const content = getCodeToAuthoriseContent(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
  authoriseWithCode: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = AUTHORISE_WITH_CODE;
    const content = getAuthoriseWithCodeContent(state);
    const urlParams = {
      businessId: getBusinessId(state),
    };

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createPaySuperAuthorisationModalModuleIntegrator;
