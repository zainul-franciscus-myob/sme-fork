import {
  LOAD_MATCH_TRANSFER_MONEY,
  LOAD_TRANSFER_MONEY,
  SAVE_TRANSFER_MONEY,
} from '../../BankingIntents';
import { getBankTransactionLineByIndex, getBusinessId } from '../../selectors';
import {
  getMatchTransferMoneyPayload,
  getMatchTransferMoneyQueryParams,
  getMatchTransferMoneyUrlParams,
} from './transferMoneySelectors';

const createBankingIntegrator = (store, integration) => ({
  loadExistingTransferMoney: ({ index, onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_TRANSFER_MONEY;

    const line = getBankTransactionLineByIndex(state, index);

    const urlParams = {
      businessId: getBusinessId(state),
      transferMoneyId: line.journals[0].journalId,
    };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadMatchTransferMoney: ({ index, onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_MATCH_TRANSFER_MONEY;
    const urlParams = getMatchTransferMoneyUrlParams(state);
    const params = getMatchTransferMoneyQueryParams(state, index);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  saveMatchTransferMoney: ({ index, onSuccess, onFailure }) => {
    const intent = SAVE_TRANSFER_MONEY;
    const state = store.getState();

    const urlParams = { businessId: getBusinessId(state) };
    const content = getMatchTransferMoneyPayload(state, index);

    integration.write({
      intent,
      urlParams,
      allowParallelRequests: true,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createBankingIntegrator;
