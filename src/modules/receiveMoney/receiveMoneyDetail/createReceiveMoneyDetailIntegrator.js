import {
  CREATE_RECEIVE_MONEY,
  DELETE_RECEIVE_MONEY,
  LOAD_NEW_RECEIVE_MONEY,
  LOAD_RECEIVE_MONEY_DETAIL,
  UPDATE_RECEIVE_MONEY,
} from '../ReceiveMoneyIntents';
import {
  getIsCreating, getReceiveMoneyForCreatePayload, getReceiveMoneyForUpdatePayload, getUrlParams,
} from './receiveMoneyDetailSelectors';

const createReceiveMoneyDetailIntegrator = ({ store, integration }) => ({
  loadReceiveMoney: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating
      ? LOAD_NEW_RECEIVE_MONEY
      : LOAD_RECEIVE_MONEY_DETAIL;

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
  saveReceiveMoneyEntry: ({ onSuccess, onFailure }) => {
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
});

export default createReceiveMoneyDetailIntegrator;
