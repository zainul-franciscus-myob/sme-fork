import {
  CREATE_TRANSFER_MONEY,
  DELETE_TRANSFER_MONEY,
} from '../TransferMoneyIntents';
import {
  getCreateTransferMoneyPayload,
  getCreateTransferMoneyUrlParams,
  getDeleteTransferMoneyUrlParams,
  getLoadTransferMoneyIntent,
  getLoadTransferMoneyUrlParams,
} from './transferMoneyDetailSelectors';

const createTransferMoneyDetailIntegrator = (store, integration) => ({
  createTransferMoney: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.write({
      intent: CREATE_TRANSFER_MONEY,
      urlParams: getCreateTransferMoneyUrlParams(state),
      content: getCreateTransferMoneyPayload(state),
      onSuccess,
      onFailure,
    });
  },
  deleteTranferMoney: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.write({
      intent: DELETE_TRANSFER_MONEY,
      urlParams: getDeleteTransferMoneyUrlParams(state),
      onSuccess,
      onFailure,
    });
  },
  loadTransferMoney: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.read({
      intent: getLoadTransferMoneyIntent(state),
      urlParams: getLoadTransferMoneyUrlParams(state),
      onSuccess,
      onFailure,
    });
  },
});

export default createTransferMoneyDetailIntegrator;
