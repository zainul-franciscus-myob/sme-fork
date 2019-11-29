import { createSelector, createStructuredSelector } from 'reselect';

import { getImportChartOfAccountsFile } from './DataImportExportSelectors';
import formatIsoDate from '../../common/valueFormatters/formatDate/formatIsoDate';

export const getLoadDataImportExportParams = () => ({
  currentDate: formatIsoDate(new Date()),
});

const getDuplicateRecordsOptionValue = (state) => {
  const selectedAction = state.import.chartOfAccounts.duplicateRecordsOption;
  return state.import.chartOfAccounts.duplicateRecordsOptions
    .find(action => action.name === selectedAction)
    .value;
};
export const getImportChartOfAccountsPayload = createSelector(
  getImportChartOfAccountsFile,
  getDuplicateRecordsOptionValue,
  (sourceFile, duplicateRecordsOptionValue) => ({
    sourceFile,
    duplicateCheckMode: duplicateRecordsOptionValue,
    source: 'File',
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
