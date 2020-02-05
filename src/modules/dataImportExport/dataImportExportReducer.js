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
import ContactIdentifyBy from './types/ContactIdentifyBy';
import ContactType from './types/ContactType';
import DuplicateRecordOption from './types/DuplicateRecordOption';
import ExportCompanyFileType from './types/ExportCompanyFileType';
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
  email: '',
  import: {
    selectedDataType: ImportExportDataType.NONE,
    importFile: undefined,
    isFileValid: false,
    fileValidationError: 'File is required.',
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
    companyFile: {
      dateFrom: '',
      dateTo: '',
      fileType: '',
      clientCode: '',
      fileTypeOptions: [
        { name: 'CeeData', value: ExportCompanyFileType.CEE_DATA },
        { name: 'Mye', value: ExportCompanyFileType.MYE },
        { name: 'MYOB AE MAS', value: ExportCompanyFileType.MYOB_AE_MAS },
        { name: 'MYOB AO', value: ExportCompanyFileType.MYOB_AO },
        { name: 'Reckon APS', value: ExportCompanyFileType.RECKON_APS },
      ],
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
  email: action.email,
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

const exceedsSizeLimit = size => size > 25000000;

const buildImportFileErrorState = (file) => {
  if (!file) {
    return { isFileValid: false, fileValidationError: 'File is required.' };
  }
  if (exceedsSizeLimit(file.size)) {
    return { isFileValid: false, fileValidationError: 'File must be under 25MB.' };
  }
  return { isFileValid: true, fileValidationError: '' };
};

const addImportFile = (state, action) => ({
  ...state,
  import: {
    ...state.import,
    importFile: action.file,
    ...buildImportFileErrorState(action.file),
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

const updateExportCompanyFile = (state, action) => ({
  ...state,
  export: {
    ...state.export,
    companyFile: {
      ...state.export.companyFile,
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
  [UPDATE_EXPORT_DATA_TYPE]: updateExportDataType,
  [UPDATE_IMPORT_DATA_TYPE]: updateImportDataType,
  [ADD_IMPORT_FILE]: addImportFile,
  [UPDATE_DUPLICATE_RECORDS_OPTION]: updateDuplicateRecordsOption,
  [UPDATE_EXPORT_CHART_OF_ACCOUNTS_DETAIL]: updateExportChartOfAccountsDetail,
  [UPDATE_CONTACTS_IDENTIFY_BY]: updateContactsIdentifyBy,
  [UPDATE_CONTACTS_TYPE]: updateContactsType,
  [UPDATE_EXPORT_COMPANY_FILE_DETAIL]: updateExportCompanyFile,
};

const dataImportExportReducer = createReducer(getDefaultState(), handlers);

export default dataImportExportReducer;
