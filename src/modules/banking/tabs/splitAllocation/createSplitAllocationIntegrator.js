import {
  LOAD_PREFILL_SPLIT_ALLOCATION,
  LOAD_SPLIT_ALLOCATION,
  SAVE_SPLIT_ALLOCATION,
} from '../../BankingIntents';
import { getBankTransactionLineByIndex, getBusinessId } from '../../selectors';
import {
  getSplitAllocationPayload,
  getTotalAmount,
} from './splitAllocationSelectors';

const createBankingIntegrator = (store, integration) => ({
  loadSplitAllocation: ({ index, onSuccess, onFailure }) => {
    const state = store.getState();

    const { withdrawal, journals } = getBankTransactionLineByIndex(
      state,
      index
    );
    const intent = LOAD_SPLIT_ALLOCATION;

    const urlParams = {
      businessId: getBusinessId(state),
      type: withdrawal ? 'spend_money' : 'receive_money',
      journalId: journals[0].journalId,
    };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadPrefillSplitAllocation: ({ bankingRuleId, onSuccess, onFailure }) => {
    const intent = LOAD_PREFILL_SPLIT_ALLOCATION;

    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      bankingRuleId,
    };
    const params = {
      total: getTotalAmount(state),
    };

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  saveSplitAllocation: ({ index, onSuccess, onFailure }) => {
    const intent = SAVE_SPLIT_ALLOCATION;
    const state = store.getState();

    const urlParams = { businessId: getBusinessId(state) };
    const content = getSplitAllocationPayload(state, index);

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
