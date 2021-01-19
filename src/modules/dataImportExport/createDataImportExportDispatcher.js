import {
  ADD_IMPORT_FILE,
  LOAD_DATA_IMPORT_EXPORT,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_MODAL_TYPE,
  SET_SELECTED_TAB,
  UPDATE_CONTACTS_IDENTIFY_BY,
  UPDATE_CONTACTS_TYPE,
  UPDATE_DELETE_UNUSED_ACCOUNTS_VALUE,
  UPDATE_DUPLICATE_RECORDS_OPTION,
  UPDATE_EXPORT_CHART_OF_ACCOUNTS_DETAIL,
  UPDATE_EXPORT_COMPANY_FILE_DETAIL,
  UPDATE_EXPORT_DATA_TYPE,
  UPDATE_IMPORT_DATA_TYPE,
  UPDATE_PERIOD_DATE_RANGE,
  UPDATE_TAX_CODE_MAPPINGS,
} from './DataImportExportIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';

const createDataImportExportDispatcher = (store) => ({
  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },

  setAlert: ({ message, type, dismissAfter }) => {
    store.dispatch({
      intent: SET_ALERT,
      alert: {
        message,
        type,
        dismissAfter,
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

  setInitialState: (context, settings) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
      settings,
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

  loadDataImportExport: (response, settings) => {
    store.dispatch({
      intent: LOAD_DATA_IMPORT_EXPORT,
      ...response,
      settings,
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

  updateDeleteUnusedAccounts: ({ value }) => {
    store.dispatch({
      intent: UPDATE_DELETE_UNUSED_ACCOUNTS_VALUE,
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

  updatePeriodDateRange: ({ period, dateFrom, dateTo }) => {
    store.dispatch({
      intent: UPDATE_PERIOD_DATE_RANGE,
      period,
      dateFrom,
      dateTo,
    });
  },

  updateTaxCodeMappings: ({ id, key, value }) => {
    store.dispatch({
      intent: UPDATE_TAX_CODE_MAPPINGS,
      id,
      key,
      value,
    });
  },
});

export default createDataImportExportDispatcher;
