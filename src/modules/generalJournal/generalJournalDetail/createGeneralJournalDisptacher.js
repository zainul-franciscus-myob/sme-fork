import {
  ADD_GENERAL_JOURNAL_LINE,
  CLOSE_MODAL,
  DELETE_GENERAL_JOURNAL_LINE,
  GET_TAX_CALCULATIONS,
  LOAD_ACCOUNT_AFTER_CREATE,
  OPEN_MODAL,
  SET_ALERT,
  SET_CREATED_ACCOUNT_LOADING_STATE,
  SET_DUPLICATE_ID,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_GENERAL_JOURNAL_HEADER,
  UPDATE_GENERAL_JOURNAL_LINE,
} from '../GeneralJournalIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { getLoadGeneralJournalIntent } from './generalJournalDetailSelectors';

const createGeneralJournalDispatcher = store => ({
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },
  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },
  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },
  setSubmittingState: (isSubmitting) => {
    store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    });
  },
  setCreatedAccountLoadingState: (isCreatedAccountLoading) => {
    store.dispatch({
      intent: SET_CREATED_ACCOUNT_LOADING_STATE,
      isCreatedAccountLoading,
    });
  },
  setAlert: (alert) => {
    store.dispatch({
      intent: SET_ALERT,
      alert,
    });
  },
  dismissAlert: () => {
    store.dispatch({
      intent: SET_ALERT,
      alert: undefined,
    });
  },
  openModal: ({ type, url }) => {
    store.dispatch({
      intent: OPEN_MODAL,
      modal: {
        type,
        url,
      },
    });
  },
  closeModal: () => {
    store.dispatch({
      intent: CLOSE_MODAL,
    });
  },
  addGeneralJournalLine: (line) => {
    store.dispatch({
      intent: ADD_GENERAL_JOURNAL_LINE,
      line,
    });
  },
  deleteGeneralJournalLine: (index) => {
    store.dispatch({
      intent: DELETE_GENERAL_JOURNAL_LINE,
      index,
    });
  },
  getTaxCalculations: (taxCalculations) => {
    store.dispatch({
      intent: GET_TAX_CALCULATIONS,
      taxCalculations,
    });
  },
  updateGeneralJournalHeader: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_GENERAL_JOURNAL_HEADER,
      key,
      value,
    });
  },
  updateGeneralJournalLine: ({ lineIndex, lineKey, lineValue }) => {
    store.dispatch({
      intent: UPDATE_GENERAL_JOURNAL_LINE,
      lineIndex,
      lineKey,
      lineValue,
    });
  },
  loadGeneralJournalDetail: ({
    generalJournal, totals, newLine, pageTitle, taxCodeOptions, accountOptions,
  }) => {
    const state = store.getState();
    const intent = getLoadGeneralJournalIntent(state);

    store.dispatch({
      intent,
      generalJournal,
      totals,
      newLine,
      pageTitle,
      taxCodeOptions,
      accountOptions,
    });
  },
  loadAccountAfterCreate: (payload) => {
    store.dispatch({
      intent: LOAD_ACCOUNT_AFTER_CREATE,
      ...payload,
    });
  },
  setDuplicateId: duplicateId => store.dispatch({
    intent: SET_DUPLICATE_ID,
    duplicateId,
  }),
});

export default createGeneralJournalDispatcher;
