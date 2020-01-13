import {
  ADD_IMPORT_CHART_OF_ACCOUNTS_FILE,
  LOAD_DATA_IMPORT_EXPORT,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_MODAL_TYPE,
  SET_SELECTED_TAB,
  UPDATE_DATA_TYPE,
  UPDATE_DUPLICATE_RECORDS_OPTION,
  UPDATE_EXPORT_CHART_OF_ACCOUNTS_DETAIL,
} from './DataImportExportIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import LoadingState from '../../components/PageView/LoadingState';
import TabItem from './types/TabItem';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  alert: undefined,
  modalType: '',
  loadingState: LoadingState.LOADING,
  isSubmitting: false,
  region: '',
  businessId: '',
  selectedTab: TabItem.IMPORT,
  import: {
    dataTypes: [],
    selectedDataType: '',
    chartOfAccounts: {
      importFile: undefined,
      duplicateRecordsOption: '',
      duplicateRecordsOptions: [],
    },
  },
  export: {
    dataTypes: [],
    selectedDataType: '',
    chartOfAccounts: {
      financialYears: [],
      financialYear: '',
      accountBalanceTransactionOptions: [],
      accountBalanceTransaction: '',
    },
  },
});

const resetState = () => getDefaultState();

const setInitialState = (state, action) => ({
  ...state,
  businessId: action.businessId,
  region: action.region,
  import: {
    ...state.import,
    selectedDataType: action.importType ? action.importType : state.import.selectedDataType,
  },
  export: {
    ...state.export,
    selectedDataType: action.exportType ? action.exportType : state.export.selectedDataType,
  },
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setModalType = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const setSelectedTab = (state, action) => ({
  ...state,
  selectedTab: action.selectedTab,
});

const loadDataImportExport = (state, action) => ({
  ...state,
  import: {
    ...state.import,
    dataTypes: action.import.dataTypes,
    chartOfAccounts: {
      ...state.import.chartOfAccounts,
      duplicateRecordsOptions: action.import.chartOfAccounts.duplicateRecordsOptions,
    },
  },
  export: {
    ...state.export,
    dataTypes: action.export.dataTypes,
    chartOfAccounts: action.export.chartOfAccounts,
  },
});

const updateDataType = (state, action) => ({
  ...state,
  [action.key]: {
    ...state[action.key],
    selectedDataType: action.value,
  },
});

const addImportChartOfAccountsFile = (state, action) => ({
  ...state,
  import: {
    ...state.import,
    chartOfAccounts: {
      ...state.import.chartOfAccounts,
      importFile: action.file,
    },
  },
});

const updateDuplicateRecordsOption = (state, action) => ({
  ...state,
  import: {
    ...state.import,
    chartOfAccounts: {
      ...state.import.chartOfAccounts,
      duplicateRecordsOption: action.value,
    },
  },
});

const updateExportChartOfAccountsDetail = (state, action) => ({
  ...state,
  export: {
    ...state.export,
    chartOfAccounts: {
      ...state.export.chartOfAccounts,
      [action.key]: action.value,
    },
  },
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_ALERT]: setAlert,
  [SET_MODAL_TYPE]: setModalType,
  [SET_SELECTED_TAB]: setSelectedTab,
  [LOAD_DATA_IMPORT_EXPORT]: loadDataImportExport,
  [UPDATE_DATA_TYPE]: updateDataType,
  [ADD_IMPORT_CHART_OF_ACCOUNTS_FILE]: addImportChartOfAccountsFile,
  [UPDATE_DUPLICATE_RECORDS_OPTION]: updateDuplicateRecordsOption,
  [UPDATE_EXPORT_CHART_OF_ACCOUNTS_DETAIL]: updateExportChartOfAccountsDetail,
};

const dataImportExportReducer = createReducer(getDefaultState(), handlers);

export default dataImportExportReducer;
