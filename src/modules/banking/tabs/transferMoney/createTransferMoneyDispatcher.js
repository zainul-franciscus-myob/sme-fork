import {
  LOAD_MATCH_TRANSFER_MONEY,
  LOAD_TRANSFER_MONEY,
  SET_MATCH_TRANSFER_MONEY_LOADING_STATE,
  SET_MATCH_TRANSFER_MONEY_SELECTION,
  SET_MATCH_TRANSFER_MONEY_SORT_ORDER,
  SORT_MATCH_TRANSFER_MONEY,
} from '../../BankingIntents';

const createTransferMoneyDispatcher = (store) => ({
  setMatchTransferMoneySortOrder: (orderBy, sortOrder) => {
    store.dispatch({
      intent: SET_MATCH_TRANSFER_MONEY_SORT_ORDER,
      orderBy,
      sortOrder,
    });
  },

  sortMatchTransferMoney: (payload) => {
    store.dispatch({ intent: SORT_MATCH_TRANSFER_MONEY, entries: payload });
  },

  loadMatchTransferMoney: (index, payload) => {
    store.dispatch({
      intent: LOAD_MATCH_TRANSFER_MONEY,
      index,
      entries: payload,
    });
  },

  setMatchTransferMoneySelection: ({ value }) => {
    store.dispatch({
      intent: SET_MATCH_TRANSFER_MONEY_SELECTION,
      index: value,
    });
  },

  setMatchTransferMoneyLoadingState: (isTableLoading) => {
    store.dispatch({
      intent: SET_MATCH_TRANSFER_MONEY_LOADING_STATE,
      isTableLoading,
    });
  },

  loadExistingTransferMoney: (index, payload) => {
    store.dispatch({ intent: LOAD_TRANSFER_MONEY, index, ...payload });
  },
});

export default createTransferMoneyDispatcher;
