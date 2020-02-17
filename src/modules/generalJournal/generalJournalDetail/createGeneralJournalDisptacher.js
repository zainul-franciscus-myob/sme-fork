import {
  ADD_GENERAL_JOURNAL_LINE,
  CLOSE_MODAL,
  DELETE_GENERAL_JOURNAL_LINE,
  GET_TAX_CALCULATIONS,
  LOAD_GENERAL_JOURNAL_DETAIL,
  LOAD_NEW_GENERAL_JOURNAL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_GENERAL_JOURNAL_HEADER,
  UPDATE_GENERAL_JOURNAL_LINE,
} from '../GeneralJournalIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { getIsCreating } from './generalJournalDetailSelectors';

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
  setAlertMessage: (alertMessage) => {
    store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage,
    });
  },
  dismissAlert: () => {
    store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage: '',
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
    const isCreating = getIsCreating(state);
    const intent = isCreating ? LOAD_NEW_GENERAL_JOURNAL : LOAD_GENERAL_JOURNAL_DETAIL;

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
});

export default createGeneralJournalDispatcher;
