import {
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_LINKED_ACCOUNTS,
  SAVE_LINKED_ACCOUNTS,
} from './LinkedAccountsIntents';
import {
  getBusinessId,
  getLoadAddedAccountUrlParams,
  getSaveLinkedAccountsPayload,
} from './LinkedAccountsSelectors';

const createLinkedAccountsIntegrator = ({ store, integration }) => ({
  loadLinkedAccounts: ({ onSuccess, onFailure }) => {
    const intent = LOAD_LINKED_ACCOUNTS;
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

  loadAccountAfterCreate: ({ id, onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_ACCOUNT_AFTER_CREATE;
    const urlParams = getLoadAddedAccountUrlParams(state, id);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  saveLinkedAccounts: ({ onSuccess, onFailure }) => {
    const intent = SAVE_LINKED_ACCOUNTS;
    const state = store.getState();
    const urlParams = { businessId: getBusinessId(state) };
    const content = getSaveLinkedAccountsPayload(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createLinkedAccountsIntegrator;
