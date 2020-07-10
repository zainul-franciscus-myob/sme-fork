import {
  ADD_IN_TRAY_LIST_ENTRY,
  CLOSE_MODAL,
  CREATE_IN_TRAY_DOCUMENT,
  DELETE_IN_TRAY_DOCUMENT,
  GENERATE_IN_TRAY_EMAIL,
  LOAD_IN_TRAY,
  OPEN_MODAL,
  POLL_INTRAY_LIST,
  REMOVE_IN_TRAY_LIST_ENTRY,
  SET_ACTIVE_ENTRY_ROW,
  SET_ALERT,
  SET_CONFIRMING_EMAIL_GENERATION,
  SET_DOCUMENT_VIEWER_URL,
  SET_IN_TRAY_DELETE_MODAL,
  SET_IN_TRAY_LIST_ENTRY_SUBMITTING_STATE,
  SET_IN_TRAY_LIST_FILTER_OPTIONS,
  SET_IN_TRAY_LIST_SORT_ORDER,
  SET_IN_TRAY_LIST_TABLE_LOADING_STATE,
  SET_LOADING_STATE,
  SET_UPLOAD_OPTIONS_ALERT,
  SET_UPLOAD_OPTIONS_LOADING_STATE,
  SORT_AND_FILTER_IN_TRAY_LIST,
  UNSET_ACTIVE_ENTRY_ROW,
  UNSET_DOCUMENT_VIEWER_URL,
} from '../InTrayIntents';

const createInTrayDispatcher = (store) => ({
  setLoadingState: (loadingState) => {
    const intent = SET_LOADING_STATE;
    store.dispatch({ intent, loadingState });
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

  openModal: (modalType) => {
    const intent = OPEN_MODAL;
    store.dispatch({ intent, modalType });
  },

  closeModal: () => {
    const intent = CLOSE_MODAL;
    store.dispatch({ intent });
  },

  loadInTray: (payload) => {
    const intent = LOAD_IN_TRAY;
    store.dispatch({ intent, ...payload });
  },

  sortAndFilterInTrayList: (response) => {
    const intent = SORT_AND_FILTER_IN_TRAY_LIST;
    store.dispatch({
      intent,
      ...response,
    });
  },

  activeEntryRow: (entryId) => {
    const intent = SET_ACTIVE_ENTRY_ROW;
    store.dispatch({
      intent,
      entryId,
    });
  },

  removeActiveEntryRow: (entryId) => {
    const intent = UNSET_ACTIVE_ENTRY_ROW;
    store.dispatch({
      intent,
      entryId,
    });
  },

  setInTrayListFilterOptions: ({ key, value }) => {
    const intent = SET_IN_TRAY_LIST_FILTER_OPTIONS;
    store.dispatch({
      intent,
      key,
      value,
    });
  },

  setInTrayListSortOrder: (orderBy, sortOrder) => {
    const intent = SET_IN_TRAY_LIST_SORT_ORDER;
    store.dispatch({
      intent,
      orderBy,
      sortOrder,
    });
  },

  setInTrayListTableLoadingState: (isTableLoading) => {
    const intent = SET_IN_TRAY_LIST_TABLE_LOADING_STATE;
    store.dispatch({ intent, isTableLoading });
  },

  createInTrayDocument: (uploadId, entry) => {
    const intent = CREATE_IN_TRAY_DOCUMENT;
    store.dispatch({ intent, uploadId, entry });
  },

  deleteInTrayDocument: (id) => {
    const intent = DELETE_IN_TRAY_DOCUMENT;
    store.dispatch({ intent, id });
  },

  addInTrayListEntry: (entry) => {
    const intent = ADD_IN_TRAY_LIST_ENTRY;
    store.dispatch({ intent, entry });
  },

  removeInTrayListEntry: (uploadId) => {
    const intent = REMOVE_IN_TRAY_LIST_ENTRY;
    store.dispatch({ intent, uploadId });
  },

  setInTrayListEntrySubmittingState: (id, isSubmitting) => {
    const intent = SET_IN_TRAY_LIST_ENTRY_SUBMITTING_STATE;
    store.dispatch({ intent, id, isSubmitting });
  },

  openInTrayDeleteModal: (entry) => {
    const intent = SET_IN_TRAY_DELETE_MODAL;
    store.dispatch({ intent, entry });
  },

  closeInTrayDeleteModal: () => {
    const intent = SET_IN_TRAY_DELETE_MODAL;
    store.dispatch({ intent, entry: undefined });
  },

  setConfirmingEmailGeneration: (isConfirmingEmailGeneration) => {
    const intent = SET_CONFIRMING_EMAIL_GENERATION;
    store.dispatch({ intent, isConfirmingEmailGeneration });
  },

  generateNewEmail: (message, email) => {
    const intent = GENERATE_IN_TRAY_EMAIL;
    store.dispatch({ intent, message, email });
  },

  setUploadOptionsLoading: (isUploadOptionsLoading) => {
    const intent = SET_UPLOAD_OPTIONS_LOADING_STATE;
    store.dispatch({ intent, isUploadOptionsLoading });
  },

  setUploadOptionsAlert: (type, message) => {
    const intent = SET_UPLOAD_OPTIONS_ALERT;
    const uploadOptionsAlert = { type, message };
    store.dispatch({ intent, uploadOptionsAlert });
  },

  dismissUploadOptionsAlert: () => {
    const intent = SET_UPLOAD_OPTIONS_ALERT;
    store.dispatch({ intent, uploadOptionsAlert: undefined });
  },

  setDocumentViewerUrl: (documentViewerUrl) => {
    store.dispatch({
      intent: SET_DOCUMENT_VIEWER_URL,
      documentViewerUrl,
    });
  },

  unsetDocumentViewerUrl: () => {
    store.dispatch({
      intent: UNSET_DOCUMENT_VIEWER_URL,
    });
  },

  pollIntrayList: (entries) => {
    store.dispatch({ intent: POLL_INTRAY_LIST, entries });
  },
});

export default createInTrayDispatcher;
