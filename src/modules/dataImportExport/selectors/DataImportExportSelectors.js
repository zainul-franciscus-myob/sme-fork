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
