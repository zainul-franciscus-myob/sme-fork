import {
  LOAD_BANKING_RULE_LIST,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BANKING_RULE_LIST,
  UPDATE_FILTER_OPTIONS,
} from './BankingRuleListIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { getNewSortOrder } from './BankingRuleListSelectors';

const createBankingRuleListDispatcher = (store) => ({
  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },
  setAlert: (alert) => {
    store.dispatch({
      intent: SET_ALERT,
      alert,
    });
  },
  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },
  setSortOrder: (orderBy) => {
    const state = store.getState();
    const sortOrder = getNewSortOrder(state, orderBy);

    store.dispatch({
      intent: SET_SORT_ORDER,
      sortOrder,
      orderBy,
    });
  },
  setTableLoadingState: (isTableLoading) => {
    store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    });
  },
  filterBankingRuleList: (response) => {
    store.dispatch({
      intent: SORT_AND_FILTER_BANKING_RULE_LIST,
      ...response,
      isSort: false,
    });
  },
  sortBankingRuleList: (response) => {
    store.dispatch({
      intent: SORT_AND_FILTER_BANKING_RULE_LIST,
      ...response,
      isSort: true,
    });
  },
  updateFilterOptions: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_FILTER_OPTIONS,
      key,
      value,
    });
  },
  loadBankingRuleList: (response) => {
    store.dispatch({
      intent: LOAD_BANKING_RULE_LIST,
      ...response,
    });
  },
});

export default createBankingRuleListDispatcher;
