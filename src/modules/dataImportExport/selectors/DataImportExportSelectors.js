import { createSelector, createStructuredSelector } from 'reselect';

import ContactIdentifyBy from '../types/ContactIdentifyBy';
import ImportExportDataType from '../types/ImportExportDataType';

export const getAlert = (state) => state.alert;
export const getModalType = (state) => state.modalType;
export const getLoadingState = (state) => state.loadingState;
export const getIsActionDisabled = (state) => state.isSubmitting;
export const getTab = (state) => state.selectedTab;

export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getLastMonthInFinancialYear = (state) =>
  state.lastMonthInFinancialYear;

const getSettingsVersion = (state) => state.settingsVersion;
const getPeriod = (state) => state.export.companyFile.period;
const getDateFrom = (state) => state.export.companyFile.dateFrom;
const getDateTo = (state) => state.export.companyFile.dateTo;
const getFileType = (state) => state.export.companyFile.fileType;

export const getSettings = createSelector(
  getSettingsVersion,
  getPeriod,
  getDateFrom,
  getDateTo,
  getFileType,
  (settingsVersion, period, dateFrom, dateTo, fileType) => ({
    settingsVersion,
    period,
    dateFrom,
    dateTo,
    fileType,
  })
);

const getValidDataType = (dataType) => {
  const dataTypeValues = Object.values(ImportExportDataType);
  const isValidDataType = dataTypeValues.includes(dataType);

  return isValidDataType ? dataType : dataTypeValues[0];
};

export const getCurrentDataTypeInCurrentTab = createSelector(
  getTab,
  (state) => state,
  (selectedTab, state) => {
    const stateDataTypeForTab = state[selectedTab].selectedDataType;
    return getValidDataType(stateDataTypeForTab);
  }
);

const getImportType = (state) =>
  getValidDataType(state.import.selectedDataType);
const getExportType = (state) =>
  getValidDataType(state.export.selectedDataType);
export const getUrlDataTypeParams = createStructuredSelector({
  importType: getImportType,
  exportType: getExportType,
});

export const getImportFile = (state) => state.import.importFile;
export const getDuplicateRecordsOption = (state) =>
  state.import.duplicateRecordsOption;

export const getDeleteUnusedAccounts = (state) =>
  state.import.deleteUnusedAccounts;

export const getChartOfAccountExportDetail = (state) =>
  state.export.chartOfAccounts;

export const getContactIdentifyBy = (state) => state.import.contacts.identifyBy;
export const getContactType = (state) => state.import.contacts.type;

export const getIsDuplicateRecordsAddShown = createSelector(
  getImportType,
  getContactIdentifyBy,
  (importType, contactIdentifyBy) => {
    const isContacts = importType === ImportExportDataType.CONTACTS;
    const isEmployees = importType === ImportExportDataType.EMPLOYEES;
    const isIdentifyByName = contactIdentifyBy === ContactIdentifyBy.NAME;
    return (isContacts || isEmployees) && isIdentifyByName;
  }
);

export const getIsFileValid = (state) => state.import.isFileValid;
export const getFileValidationError = (state) =>
  state.import.fileValidationError;

const getBusinessName = (state) => state.export.businessName;
const getFinancialYear = (state) => state.export.chartOfAccounts.financialYear;

const getChartOfAccountExportFileType = (state) =>
  state.export.chartOfAccounts.fileType;

const getPascalCaseBusinessName = (businessNameSplit) =>
  businessNameSplit
    ? businessNameSplit
        .map(
          (word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
        )
        .join('')
    : '';

export const getExportChartOfAccountsFileName = createSelector(
  getBusinessName,
  getFinancialYear,
  getChartOfAccountExportFileType,
  (businessName, financialYearDateString, fileType) => {
    const businessNameSplit = businessName.match(/[a-z0-9]+/gi);
    const pascalCaseBusinessName = getPascalCaseBusinessName(businessNameSplit);
    const financialYearDate = new Date(financialYearDateString);

    // Selected FY is the first day of the next Financial Year
    // We subtract a day as we want to display the last day of the current FY
    financialYearDate.setDate(financialYearDate.getDate() - 1);

    return pascalCaseBusinessName
      ? `${pascalCaseBusinessName}-ChartOfAccounts-${financialYearDate.getFullYear()}.${fileType.toLowerCase()}`
      : `ChartOfAccounts-${financialYearDate.getFullYear()}.${fileType.toLowerCase()}`;
  }
);
