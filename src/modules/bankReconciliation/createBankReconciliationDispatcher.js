
import {
  CLOSE_MODAL,
  LOAD_BANK_RECONCILIATION,
  LOAD_BANK_RECONCILIATION_WITH_BANK_ACCOUNT,
  OPEN_MODAL,
  RESET_STATEMENT_DATE,
  SELECT_ALL,
  SELECT_ROW,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_SUBMITTING_STATE,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BANK_RECONCILIATION,
  UPDATE_HEADER_OPTION,
  UPDATE_RESULT,
} from './BankReconciliationIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import { getAccountId } from './BankReconciliationSelectors';
import ModalType from './ModalType';

const createBankReconciliationDispatcher = store => ({
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
  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },
  setTableLoadingState: (isTableLoading) => {
    store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    });
  },
  openOutOfBalanceModal: () => {
    store.dispatch({
      intent: OPEN_MODAL,
      modal: { type: ModalType.OUT_OF_BALANCE },
    });
  },
  setSubmittingState: (isSubmitting) => {
    store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    });
  },
  setAlert: ({ message, type }) => {
    const intent = SET_ALERT;
    store.dispatch({
      intent,
      alert: {
        message,
        type,
      },
    });
  },
  dismissAlert: () => {
    store.dispatch({
      intent: SET_ALERT,
      alert: undefined,
    });
  },
  updateHeaderOption: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_HEADER_OPTION,
      key,
      value,
    });
  },
  selectRow: ({ index, value }) => store.dispatch({
    intent: SELECT_ROW,
    index,
    value,
  }),
  selectAll: () => store.dispatch({
    intent: SELECT_ALL,
  }),
  openUndoReconciliationModal: () => {
    store.dispatch({
      intent: OPEN_MODAL,
      modal: { type: ModalType.UNDO },
    });
  },
  closeModal: () => {
    store.dispatch({
      intent: CLOSE_MODAL,
    });
  },
  setSortOrder: (orderBy) => {
    store.dispatch({
      intent: SET_SORT_ORDER,
      orderBy,
    });
  },
  updateReconciliationResult: () => {
    store.dispatch({
      intent: UPDATE_RESULT,
    });
  },
  loadBankReconciliation: (response) => {
    const state = store.getState();

    const intent = getAccountId(state)
      ? LOAD_BANK_RECONCILIATION_WITH_BANK_ACCOUNT
      : LOAD_BANK_RECONCILIATION;

    store.dispatch({
      intent,
      ...response,
    });
  },
  sortAndFilterBankReconciliation: (response) => {
    store.dispatch({
      intent: SORT_AND_FILTER_BANK_RECONCILIATION,
      ...response,
    });
  },
  resetStatementDate: () => store.dispatch({ intent: RESET_STATEMENT_DATE }),
});

export default createBankReconciliationDispatcher;
