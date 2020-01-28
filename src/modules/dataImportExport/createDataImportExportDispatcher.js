import {
  ADD_IMPORT_FILE,
  LOAD_DATA_IMPORT_EXPORT,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_MODAL_TYPE,
  SET_SELECTED_TAB,
  UPDATE_CONTACTS_IDENTIFY_BY,
  UPDATE_CONTACTS_TYPE,
  UPDATE_DUPLICATE_RECORDS_OPTION,
  UPDATE_EXPORT_CHART_OF_ACCOUNTS_DETAIL,
  UPDATE_EXPORT_COMPANY_FILE_DETAIL,
  UPDATE_EXPORT_DATA_TYPE,
  UPDATE_IMPORT_DATA_TYPE,
} from './DataImportExportIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';

const createDataImportExportDispatcher = store => ({
  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
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

  updateExportDataType: (dataType) => {
    store.dispatch({
      intent: UPDATE_EXPORT_DATA_TYPE,
      dataType,
    });
  },

  updateImportDataType: (dataType) => {
    store.dispatch({
      intent: UPDATE_IMPORT_DATA_TYPE,
      dataType,
    });
  },

  addImportFile: (file) => {
    store.dispatch({
      intent: ADD_IMPORT_FILE,
      file,
    });
  },

  removeImportFile: () => {
    store.dispatch({
      intent: ADD_IMPORT_FILE,
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

  updateContactsIdentifyBy: (identifyBy) => {
    store.dispatch({
      intent: UPDATE_CONTACTS_IDENTIFY_BY,
      identifyBy,
    });
  },

  updateContactsType: (type) => {
    store.dispatch({
      intent: UPDATE_CONTACTS_TYPE,
      type,
    });
  },

  updateExportCompanyFileDetail: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_EXPORT_COMPANY_FILE_DETAIL,
      key,
      value,
    });
  },
});

export default createDataImportExportDispatcher;
