import {
  CREATE_RECEIVE_MONEY,
  DELETE_RECEIVE_MONEY,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_AFTER_CREATE,
  UPDATE_RECEIVE_MONEY,
} from '../ReceiveMoneyIntents';
import {
  getIsCreating,
} from './selectors/receiveMoneyDetailSelectors';
import {
  getLoadAddedAccountUrlParams,
  getLoadAddedContactUrlParams,
  getLoadReceiveMoneyIntent,
  getReceiveMoneyForCreatePayload,
  getReceiveMoneyForUpdatePayload,
  getUrlParams,
} from './selectors/integrationSelectors';

const createReceiveMoneyDetailIntegrator = ({ store, integration }) => ({
  loadReceiveMoney: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = getLoadReceiveMoneyIntent(state);
    const urlParams = getUrlParams(state);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
  deleteReceiveMoney: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = getUrlParams(state);

    integration.write({
      intent: DELETE_RECEIVE_MONEY,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
  saveReceiveMoney: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating ? CREATE_RECEIVE_MONEY : UPDATE_RECEIVE_MONEY;
    const urlParams = getUrlParams(state);
    const content = isCreating
      ? getReceiveMoneyForCreatePayload(state)
      : getReceiveMoneyForUpdatePayload(state);

    integration.write({
      intent,
      urlParams,
      content,
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
  loadContactAfterCreate: ({ id, onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_CONTACT_AFTER_CREATE;
    const urlParams = getLoadAddedContactUrlParams(state, id);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createReceiveMoneyDetailIntegrator;
