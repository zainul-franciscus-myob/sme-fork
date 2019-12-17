import {
  CREATE_ACCOUNT_MODAL,
  LOAD_NEW_ACCOUNT_MODAL,
} from '../AccountIntents';
import {
  getAccountForRequest,
  getBusinessId,
} from './accountModalSelectors';

const createAccountModalIntegrator = (store, integration) => ({
  loadNewAccount: (onSuccess, onFailure) => {
    const intent = LOAD_NEW_ACCOUNT_MODAL;
    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };
    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  createAccount: (onSuccess, onFailure) => {
    const intent = CREATE_ACCOUNT_MODAL;
    const state = store.getState();
    const content = getAccountForRequest(state);
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

export default createAccountModalIntegrator;
