import {
  DELETE_BANK_FEED,
  GET_BANK_FEEDS_ACCESS,
  LOAD_BANK_FEEDS,
  REFRESH_BANK_FEEDS,
  SAVE_BANK_FEEDS,
} from './BankFeedsIntents';
import {
  getBankFeedsLoginDetails,
  getBankFeedsUrlParams,
  getBusinessId,
  getDeleteBankFeedUrlParams,
  getSaveBankFeedsPayload,
} from './BankFeedsSelectors';

const createBankFeedsIntegrator = (store, integration) => ({
  loadBankFeeds: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = getBankFeedsUrlParams(state);

    integration.read({
      intent: LOAD_BANK_FEEDS,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
  saveBankFeeds: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = getBankFeedsUrlParams(state);
    const content = getSaveBankFeedsPayload(state);

    integration.write({
      intent: SAVE_BANK_FEEDS,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
  deleteBankFeed: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = getDeleteBankFeedUrlParams(state);

    integration.write({
      intent: DELETE_BANK_FEED,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
  bankFeedsLogin: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = getBankFeedsUrlParams(state);
    const content = getBankFeedsLoginDetails(state);

    integration.write({
      intent: REFRESH_BANK_FEEDS,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
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
});

export default createBankFeedsIntegrator;
