import { LOAD_BANK_FEED_APPLICATION_DATA, SUBMIT_BANK_FEED_APPLICATION } from './BankFeedsCreateIntents';
import { getBusinessId, getRegion } from './BankFeedsCreateSelectors';

const BankFeedsCreateIntegrator = (store, integration) => ({
  loadBankFeedApplicationData: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = { businessId: getBusinessId(state) };
    const params = { region: getRegion(state) };

    integration.read({
      intent: LOAD_BANK_FEED_APPLICATION_DATA,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  submitBankFeedApplication: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = { businessId: getBusinessId(state) };
    const content = {}; // payload

    integration.write({
      intent: SUBMIT_BANK_FEED_APPLICATION,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default BankFeedsCreateIntegrator;
