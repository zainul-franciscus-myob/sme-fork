import { createSelector, createStructuredSelector } from 'reselect';

import ImportExportDataType from '../types/ImportExportDataType';

export const getAlert = state => state.alert;
export const getModalType = state => state.modalType;
export const getIsLoading = state => state.isLoading;
export const getIsSubmitting = state => state.isSubmitting;
export const getIsActionDisabled = state => state.isSubmitting;
export const getTab = state => state.selectedTab;

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;

const getValidDataType = (dataType) => {
  const dataTypeValues = Object.values(ImportExportDataType);
  const isValidDataType = dataTypeValues.includes(dataType);

  return isValidDataType ? dataType : dataTypeValues[0];
};

export const getCurrentDataTypeInCurrentTab = createSelector(
  getTab,
  state => state,
  (selectedTab, state) => {
    const stateDataTypeForTab = state[selectedTab].selectedDataType;
    return getValidDataType(stateDataTypeForTab);
  },
);

const getImportType = state => getValidDataType(state.import.selectedDataType);
const getExportType = state => getValidDataType(state.export.selectedDataType);
export const getUrlDataTypeParams = createStructuredSelector({
  importType: getImportType,
  exportType: getExportType,
});

export const getImportDataTypes = state => state.import.dataTypes;
export const getImportChartOfAccountsFile = state => state.import.chartOfAccounts.importFile;
export const getDuplicateRecordsOption = state => (
  state.import.chartOfAccounts.duplicateRecordsOption
);
export const getDuplicateRecordsOptionNames = state => (
  state.import.chartOfAccounts.duplicateRecordsOptions.map(
    action => action.name,
  )
);
export const getCanImportChartOfAccounts = state => (
  state.import.chartOfAccounts.importFile !== undefined
  && state.import.chartOfAccounts.duplicateRecordsOption !== ''
);

export const getExportDataTypes = state => state.export.dataTypes;

export const getChartOfAccountExportDetail = state => state.export.chartOfAccounts;
