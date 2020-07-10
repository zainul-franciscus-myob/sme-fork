import {
  LOAD_DEFAULT_BANKING,
  SET_BANKING_ERROR_STATE,
  SET_BANKING_LOADING_STATE,
  SET_BANK_FEED_ACCOUNT_ID,
} from '../DashboardIntents';

const setBankingState = (state, bankingState) => ({
  ...state,
  banking: {
    ...state.banking,
    ...bankingState,
  },
});

const loadBanking = (state, action) => setBankingState(state, action.banking);

const setBankingLoadingState = (state, { isLoading }) =>
  setBankingState(state, { isLoading });

const setBankingErrorState = (state, { hasError }) =>
  setBankingState(state, { hasError });

const setBankFeedAccount = (state, { bankFeedAccountId }) =>
  setBankingState(state, { bankFeedAccountId });

export default {
  [LOAD_DEFAULT_BANKING]: loadBanking,
  [SET_BANKING_LOADING_STATE]: setBankingLoadingState,
  [SET_BANKING_ERROR_STATE]: setBankingErrorState,
  [SET_BANK_FEED_ACCOUNT_ID]: setBankFeedAccount,
};
