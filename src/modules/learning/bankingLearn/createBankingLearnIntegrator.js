import {
  GET_BANK_FEEDS_ACCESS,
  GET_SERIAL_NUMBER,
} from './bankingLearnIntents';
import { getBusinessId } from './BankingLearnSelectors';

const createBankingLearnIntegrator = (store, integration) => ({
  getBankFeedsAccess: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = GET_BANK_FEEDS_ACCESS;
    const urlParams = { businessId: getBusinessId(state) };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
  getSerialNumber: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = GET_SERIAL_NUMBER;
    const urlParams = { businessId: getBusinessId(state) };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createBankingLearnIntegrator;
