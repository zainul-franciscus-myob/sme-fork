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
} from './DataImportExportIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import ContactIdentifyBy from './types/ContactIdentifyBy';
import ContactType from './types/ContactType';
import DuplicateRecordOption from './types/DuplicateRecordOption';
import ExportCompanyFileType from './types/ExportCompanyFileType';
import ImportExportDataType from './types/ImportExportDataType';
import ImportExportFileType from './types/ImportExportFileType';
import LoadingState from '../../components/PageView/LoadingState';
import Periods from '../../components/PeriodPicker/Periods';
import TabItem from './types/TabItem';
import createReducer from '../../store/createReducer';
import getDateRangeByPeriodAndRegion from '../../components/PeriodPicker/getDateRangeByPeriodAndRegion';

const getDefaultState = () => ({
  settingsVersion: '2e182c2a-d781-11ea-87d0-0242ac130003',
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
    deleteUnusedAccounts: false,
    contacts: {
      identifyBy: ContactIdentifyBy.NAME,
      type: ContactType.CUSTOMER,
    },
  },
  export: {
    businessName: '',
    selectedDataType: ImportExportDataType.NONE,
    chartOfAccounts: {
      financialYears: [],
      financialYear: '',
      accountBalanceTransactionOptions: [],
      accountBalanceTransaction: '',
      fileTypeOptions: [
        { name: '.txt', value: ImportExportFileType.TXT },
        { name: '.csv', value: ImportExportFileType.CSV },
      ],
      fileType: ImportExportFileType.TXT,
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
        {
          name: 'Sage Handiledger',
          value: ExportCompanyFileType.SAGE_HANDI_LEDGER,
        },
      ],
      period: Periods.lastMonth,
    },
  },
});

const resetState = () => getDefaultState();

const setInitialStateWithSettings = (settings, initialState) => ({
  ...initialState,
  export: {
    ...initialState.export,
    companyFile: {
      ...initialState.export.companyFile,
      period: settings.period || Periods.custom,
      dateFrom: settings.dateFrom,
      dateTo: settings.dateTo,
      fileType: settings.fileType,
    },
  },
});

const shouldSetInitialStateWithSettings = (settings, initialState) =>
  settings.settingsVersion === initialState.settingsVersion;

const setInitialState = (state, { context, settings = {} }) => {
  const { period } = state.export.companyFile;
  const exportDates =
    period !== Periods.custom
      ? getDateRangeByPeriodAndRegion(context.region, new Date(), period)
      : {};

  const initialState = {
    ...state,
    businessId: context.businessId,
    region: context.region,
    import: {
      ...state.import,
      selectedDataType: context.importType
        ? context.importType
        : state.import.selectedDataType,
    },
    export: {
      ...state.export,
      companyFile: {
        ...state.export.companyFile,
        ...exportDates,
      },
      selectedDataType: context.exportType
        ? context.exportType
        : state.export.selectedDataType,
    },
  };

  if (shouldSetInitialStateWithSettings(settings, initialState)) {
    return setInitialStateWithSettings(settings, initialState);
  }

  return initialState;
};

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
    businessName: action.export.businessName,
    chartOfAccounts: {
      ...state.export.chartOfAccounts,
      ...action.export.chartOfAccounts,
    },
    companyFile: {
      ...state.export.companyFile,
      ...action.export.companyFile,
    },
  },
});

const updateExportDataType = (state, action) => ({
  ...state,
  export: {
    ...state.export,
    selectedDataType: action.dataType,
  },
});

const exceedsSizeLimit = (size) => size > 25000000;

const buildImportFileErrorState = (file) => {
  if (!file) {
    return { isFileValid: false, fileValidationError: 'File is required.' };
  }
  if (exceedsSizeLimit(file.size)) {
    return {
      isFileValid: false,
      fileValidationError: 'File must be under 25MB.',
    };
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

const updateDeleteUnusedAccounts = (state, action) => ({
  ...state,
  import: {
    ...state.import,
    deleteUnusedAccounts: action.value,
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
  const isPreviouslyAdd =
    previousDuplicateRecordsOption === DuplicateRecordOption.ADD;
  const isIdentifyByNotName = action.identifyBy !== ContactIdentifyBy.NAME;
  return {
    ...state,
    import: {
      ...state.import,
      duplicateRecordsOption:
        isPreviouslyAdd && isIdentifyByNotName
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

const updatePeriodDateRange = (state, { period, dateFrom, dateTo }) => ({
  ...state,
  export: {
    ...state.export,
    companyFile: {
      ...state.export.companyFile,
      period,
      dateFrom,
      dateTo,
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
  [UPDATE_DELETE_UNUSED_ACCOUNTS_VALUE]: updateDeleteUnusedAccounts,
  [UPDATE_EXPORT_CHART_OF_ACCOUNTS_DETAIL]: updateExportChartOfAccountsDetail,
  [UPDATE_CONTACTS_IDENTIFY_BY]: updateContactsIdentifyBy,
  [UPDATE_CONTACTS_TYPE]: updateContactsType,
  [UPDATE_EXPORT_COMPANY_FILE_DETAIL]: updateExportCompanyFile,
  [UPDATE_PERIOD_DATE_RANGE]: updatePeriodDateRange,
};

const dataImportExportReducer = createReducer(getDefaultState(), handlers);

export default dataImportExportReducer;
