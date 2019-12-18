import {
  ADD_IMPORT_CHART_OF_ACCOUNTS_FILE,
  LOAD_DATA_IMPORT_EXPORT,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_MODAL_TYPE,
  SET_SELECTED_TAB,
  SET_SUBMITTING_STATE,
  UPDATE_DATA_TYPE,
  UPDATE_DUPLICATE_RECORDS_OPTION,
  UPDATE_EXPORT_CHART_OF_ACCOUNTS_DETAIL,
} from './DataImportExportIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';

const createDataImportExportDispatcher = store => ({
  setLoadingState: (isLoading) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  },

  setSubmittingState: (isSubmitting) => {
    store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    });
  },

  setAlert: ({ message, type }) => {
    store.dispatch({
      intent: SET_ALERT,
      alert: {
        message,
        type,
      },
    });
  },

  setModalType: (modalType) => {
    store.dispatch({
      intent: SET_MODAL_TYPE,
      modalType,
    });
  },

  dismissAlert: () => {
    store.dispatch({
      intent: SET_ALERT,
    });
  },

  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      ...context,
    });
  },

  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },

  setSelectedTab: (selectedTab) => {
    store.dispatch({
      intent: SET_SELECTED_TAB,
      selectedTab,
    });
  },

  loadDataImportExport: (response) => {
    store.dispatch({
      intent: LOAD_DATA_IMPORT_EXPORT,
      ...response,
    });
  },

  updateDataType: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_DATA_TYPE,
      key,
      value,
    });
  },

  addImportChartOfAccountsFile: (file) => {
    store.dispatch({
      intent: ADD_IMPORT_CHART_OF_ACCOUNTS_FILE,
      file,
    });
  },

  removeImportChartOfAccountsFile: () => {
    store.dispatch({
      intent: ADD_IMPORT_CHART_OF_ACCOUNTS_FILE,
    });
  },

  updateDuplicateRecordsOption: ({ value }) => {
    store.dispatch({
      intent: UPDATE_DUPLICATE_RECORDS_OPTION,
      value,
    });
  },

  updateExportChartOfAccountsDetail: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_EXPORT_CHART_OF_ACCOUNTS_DETAIL,
      key,
      value,
    });
  },
});

export default createDataImportExportDispatcher;
