import {
  CREATE_ACCOUNT,
  DELETE_ACCOUNT,
  LOAD_ACCOUNT_DETAIL,
  LOAD_NEW_ACCOUNT,
  UPDATE_ACCOUNT,
} from '../AccountIntents';
import {
  getAccount,
  getAccountId,
  getBusinessId,
} from './accountDetailSelectors';

const createAccountListIntegrator = (store, integration) => ({
  loadAccountDetail: (onSuccess, onFailure) => {
    const state = store.getState();
    const intent = LOAD_ACCOUNT_DETAIL;
    const urlParams = {
      businessId: getBusinessId(state),
      accountId: getAccountId(state),
    };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
  loadNewAccount: (onSuccess, onFailure) => {
    const intent = LOAD_NEW_ACCOUNT;
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
    const intent = CREATE_ACCOUNT;
    const state = store.getState();
    const content = getAccount(state);
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

  updateAccount: (onSuccess, onFailure) => {
    const intent = UPDATE_ACCOUNT;
    const state = store.getState();
    const content = getAccount(state);
    const urlParams = {
      businessId: getBusinessId(state),
      accountId: getAccountId(state),
    };
    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  deleteAccount: (onSuccess, onFailure) => {
    const state = store.getState();
    integration.write({
      intent: DELETE_ACCOUNT,
      urlParams: {
        businessId: getBusinessId(state),
        accountId: getAccountId(state),
      },
      onSuccess,
      onFailure,
    });
  },
});

export default createAccountListIntegrator;
