import {
  ADD_IN_TRAY_LIST_ENTRY,
  CREATE_IN_TRAY_MODAL_DOCUMENT,
  GENERATE_IN_TRAY_EMAIL,
  LOAD_IN_TRAY_MODAL,
  REMOVE_IN_TRAY_LIST_ENTRY,
  RESET_IN_TRAY_LIST_FILTER_OPTIONS,
  SELECT_DOCUMENT,
  SET_ALERT,
  SET_CONFIRMING_EMAIL_GENERATION,
  SET_IN_TRAY_LIST_ENTRY_SUBMITTING_STATE,
  SET_IN_TRAY_LIST_FILTER_OPTIONS,
  SET_IN_TRAY_LIST_SORT_ORDER,
  SET_IN_TRAY_LIST_TABLE_LOADING_STATE,
  SET_LOADING_STATE,
  SET_UPLOAD_OPTIONS_ALERT,
  SET_UPLOAD_OPTIONS_LOADING_STATE,
  SET_UPLOAD_POPOVER_STATE,
  SORT_AND_FILTER_IN_TRAY_MODAL,
} from '../InTrayIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createInTrayModalDispatcher = (store) => ({
  resetState: () => {
    const intent = RESET_STATE;
    store.dispatch({ intent });
  },

  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({ intent, context });
  },

  setLoadingState: (isLoading) => {
    const intent = SET_LOADING_STATE;
    store.dispatch({ intent, isLoading });
  },

  setAlert: ({ message, type }) => {
    const intent = SET_ALERT;
    store.dispatch({
      intent,
      alert: { message, type },
    });
  },

  dismissAlert: () => {
    const intent = SET_ALERT;
    store.dispatch({
      intent,
      alert: undefined,
    });
  },

  loadInTrayModal: (payload) => {
    const intent = LOAD_IN_TRAY_MODAL;
    store.dispatch({ intent, ...payload });
  },

  sortAndFilterInTrayList: (response) => {
    const intent = SORT_AND_FILTER_IN_TRAY_MODAL;
    store.dispatch({
      intent,
      ...response,
    });
  },

  setFilterOptions: ({ key, value }) => {
    const intent = SET_IN_TRAY_LIST_FILTER_OPTIONS;
    store.dispatch({
      intent,
      key,
      value,
    });
  },

  resetFilterOptions: () => {
    const intent = RESET_IN_TRAY_LIST_FILTER_OPTIONS;
    store.dispatch({
      intent,
    });
  },

  setSortOrder: (orderBy, sortOrder) => {
    const intent = SET_IN_TRAY_LIST_SORT_ORDER;
    store.dispatch({
      intent,
      orderBy,
      sortOrder,
    });
  },

  setTableLoadingState: (isTableLoading) => {
    const intent = SET_IN_TRAY_LIST_TABLE_LOADING_STATE;
    store.dispatch({ intent, isTableLoading });
  },

  createInTrayDocument: (uploadId, entry) => {
    const intent = CREATE_IN_TRAY_MODAL_DOCUMENT;
    store.dispatch({ intent, uploadId, entry });
  },

  addInTrayListEntry: (entry) => {
    const intent = ADD_IN_TRAY_LIST_ENTRY;
    store.dispatch({ intent, entry });
  },

  removeInTrayListEntry: (uploadId) => {
    const intent = REMOVE_IN_TRAY_LIST_ENTRY;
    store.dispatch({ intent, uploadId });
  },

  setEntrySubmittingState: (id, isSubmitting) => {
    const intent = SET_IN_TRAY_LIST_ENTRY_SUBMITTING_STATE;
    store.dispatch({ intent, id, isSubmitting });
  },

  setSelectedDocumentId: (id) => {
    const intent = SELECT_DOCUMENT;
    store.dispatch({ intent, id });
  },

  setUploadOptionsAlert: ({ message, type }) => {
    const intent = SET_UPLOAD_OPTIONS_ALERT;
    store.dispatch({
      intent,
      uploadOptionsAlert: { message, type },
    });
  },

  dismissUploadOptionsAlert: () => {
    const intent = SET_UPLOAD_OPTIONS_ALERT;
    store.dispatch({ intent, uploadOptionsAlert: undefined });
  },

  setConfirmingEmailGeneration: (isConfirmingEmailGeneration) => {
    const intent = SET_CONFIRMING_EMAIL_GENERATION;
    store.dispatch({ intent, isConfirmingEmailGeneration });
  },

  setUploadOptionsLoading: (isUploadOptionsLoading) => {
    const intent = SET_UPLOAD_OPTIONS_LOADING_STATE;
    store.dispatch({ intent, isUploadOptionsLoading });
  },

  setUploadPopoverState: (isUploadPopoverOpen) => {
    store.dispatch({
      intent: SET_UPLOAD_POPOVER_STATE,
      isUploadPopoverOpen,
    });
  },

  generateNewEmail: (message, email) => {
    const intent = GENERATE_IN_TRAY_EMAIL;
    store.dispatch({ intent, message, email });
  },
});

export default createInTrayModalDispatcher;
