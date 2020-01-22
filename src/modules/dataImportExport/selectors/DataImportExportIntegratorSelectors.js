import { createSelector, createStructuredSelector } from 'reselect';

import {
  getContactIdentifyBy, getContactType, getDuplicateRecordsOption, getImportFile, getRegion,
} from './DataImportExportSelectors';

export const getImportChartOfAccountsPayload = createSelector(
  getImportFile,
  getDuplicateRecordsOption,
  (sourceFile, duplicateRecordsOptionValue) => ({
    sourceFile,
    duplicateCheckMode: duplicateRecordsOptionValue,
    source: 'File',
  }),
);

export const getImportContactsPayload = createSelector(
  getImportFile,
  getDuplicateRecordsOption,
  getContactType,
  getContactIdentifyBy,
  getRegion,
  (file, duplicateRecordsOptionValue, type, identifyBy, region) => ({
    File: file,
    DuplicateCheckMode: duplicateRecordsOptionValue,
    Type: type,
    IdentifyBy: identifyBy,
    Region: region,
  }),
);

export const getImportEmployeesPayload = createSelector(
  getImportFile,
  getDuplicateRecordsOption,
  getContactIdentifyBy,
  getRegion,
  (file, duplicateRecordsOptionValue, identifyBy, region) => ({
    File: file,
    DuplicateCheckMode: duplicateRecordsOptionValue,
    IdentifyBy: identifyBy,
    Region: region,
  }),
);

export const getImportItemsPayload = createSelector(
  getImportFile,
  getDuplicateRecordsOption,
  getRegion,
  (file, duplicateRecordsOptionValue, region) => ({
    File: file,
    DuplicateCheckMode: duplicateRecordsOptionValue,
    Region: region,
  }),
);

export const getImportGeneralJournalsPayload = createSelector(
  getImportFile,
  getRegion,
  (file, region) => ({
    File: file,
    Region: region,
  }),
);

export const getImportTransactionJournalsPayload = createSelector(
  getImportFile,
  getRegion,
  (file, region) => ({
    File: file,
    Region: region,
  }),
);

export const getImportTimesheetsPayload = createSelector(
  getImportFile,
  getContactIdentifyBy,
  getRegion,
  (file, identifyBy, region) => ({
    File: file,
    IdentifyBy: identifyBy,
    Region: region,
  }),
);

const getFinancialYear = state => state.export.chartOfAccounts.financialYear;
const getAccountBalanceTransaction = state => (
  state.export.chartOfAccounts.accountBalanceTransaction
);
export const getExportChartOfAccountsQueryParams = createStructuredSelector({
  financialYear: getFinancialYear,
  accountBalanceTransaction: getAccountBalanceTransaction,
});
