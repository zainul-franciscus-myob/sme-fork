import { LOG_IN, REFRESH_LOG_IN } from './StsLoginIntents';
import { getBusinessId, getLogInContent } from './stsLoginSelectors';

const createStsLoginIntegrator = (store, integration) => ({
  logIn: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };
    const content = getLogInContent(state);

    integration.write({
      intent: LOG_IN,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  refreshLogin: ({ refreshToken, onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };
    const content = { refreshToken };

    integration.write({
      intent: REFRESH_LOG_IN,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createStsLoginIntegrator;
