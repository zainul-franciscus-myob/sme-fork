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

const getFinancialYear = state => state.export.chartOfAccounts.financialYear;
const getAccountBalanceTransaction = state => (
  state.export.chartOfAccounts.accountBalanceTransaction
);
export const getExportChartOfAccountsQueryParams = createStructuredSelector({
  financialYear: getFinancialYear,
  accountBalanceTransaction: getAccountBalanceTransaction,
});
