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
  UPDATE_EXPORT_DATA_TYPE,
  UPDATE_IMPORT_DATA_TYPE,
} from './DataImportExportIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import ContactIdentifyBy from './types/ContactIdentifyBy';
import ContactType from './types/ContactType';
import DuplicateRecordOption from './types/DuplicateRecordOption';
import ImportExportDataType from './types/ImportExportDataType';
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
    selectedDataType: ImportExportDataType.NONE,
    importFile: undefined,
    duplicateRecordsOption: DuplicateRecordOption.UPDATE_EXISTING,
    contacts: {
      identifyBy: ContactIdentifyBy.NAME,
      type: ContactType.CUSTOMER,
    },
  },
  export: {
    selectedDataType: ImportExportDataType.NONE,
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
  export: {
    ...state.export,
    chartOfAccounts: action.export.chartOfAccounts,
  },
});

const updateExportDataType = (state, action) => ({
  ...state,
  export: {
    ...state.export,
    selectedDataType: action.dataType,
  },
});

const addImportFile = (state, action) => ({
  ...state,
  import: {
    ...state.import,
    importFile: action.file,
  },
});

const updateDuplicateRecordsOption = (state, action) => ({
  ...state,
  import: {
    ...state.import,
    duplicateRecordsOption: action.value,
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

const updateContactsIdentifyBy = (state, action) => {
  const previousDuplicateRecordsOption = state.import.duplicateRecordsOption;
  const isPreviouslyAdd = previousDuplicateRecordsOption === DuplicateRecordOption.ADD;
  const isIdentifyByNotName = action.identifyBy !== ContactIdentifyBy.NAME;
  return {
    ...state,
    import: {
      ...state.import,
      duplicateRecordsOption: isPreviouslyAdd && isIdentifyByNotName
        ? getDefaultState().import.duplicateRecordsOption
        : previousDuplicateRecordsOption,
      contacts: {
        ...state.import.contacts,
        identifyBy: action.identifyBy,
      },
    },
  };
};

const updateContactsType = (state, action) => ({
  ...state,
  import: {
    ...state.import,
    contacts: {
      ...state.import.contacts,
      type: action.type,
    },
  },
});

const updateImportDataType = (state, action) => ({
  ...state,

  import: {
    ...getDefaultState().import,
    selectedDataType: action.dataType,
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
  [UPDATE_EXPORT_DATA_TYPE]: updateExportDataType,
  [UPDATE_IMPORT_DATA_TYPE]: updateImportDataType,
  [ADD_IMPORT_FILE]: addImportFile,
  [UPDATE_DUPLICATE_RECORDS_OPTION]: updateDuplicateRecordsOption,
  [UPDATE_EXPORT_CHART_OF_ACCOUNTS_DETAIL]: updateExportChartOfAccountsDetail,
  [UPDATE_CONTACTS_IDENTIFY_BY]: updateContactsIdentifyBy,
  [UPDATE_CONTACTS_TYPE]: updateContactsType,
};

const dataImportExportReducer = createReducer(getDefaultState(), handlers);

export default dataImportExportReducer;
