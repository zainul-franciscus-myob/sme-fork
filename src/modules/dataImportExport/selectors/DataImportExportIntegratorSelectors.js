import { createSelector, createStructuredSelector } from 'reselect';

import {
  getBusinessId,
  getContactIdentifyBy,
  getContactType,
  getDuplicateRecordsOption,
  getImportFile,
  getRegion,
} from './DataImportExportSelectors';
import { getExportCompanyFile, getHasClientCode } from './ExportCompanyFileSelectors';

const getImportRegion = createSelector(
  getRegion,
  region => region.toUpperCase(),
);

const getEmail = state => state.email;

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
  getImportRegion,
  getEmail,
  getBusinessId,
  (
    file,
    duplicateRecordsOptionValue,
    type,
    identifyBy,
    region,
    email,
    businessId,
  ) => ({
    File: file,
    DuplicateCheckMode: duplicateRecordsOptionValue,
    Type: type,
    IdentifyBy: identifyBy,
    Region: region,
    Email: email,
    BusinessId: businessId,
  }),
);

export const getImportEmployeesPayload = createSelector(
  getImportFile,
  getDuplicateRecordsOption,
  getContactIdentifyBy,
  getImportRegion,
  getEmail,
  getBusinessId,
  (file, duplicateRecordsOptionValue, identifyBy, region, email, businessId) => ({
    File: file,
    DuplicateCheckMode: duplicateRecordsOptionValue,
    IdentifyBy: identifyBy,
    Region: region,
    Email: email,
    BusinessId: businessId,
  }),
);

export const getImportItemsPayload = createSelector(
  getImportFile,
  getDuplicateRecordsOption,
  getImportRegion,
  getEmail,
  getBusinessId,
  (file, duplicateRecordsOptionValue, region, email, businessId) => ({
    File: file,
    DuplicateCheckMode: duplicateRecordsOptionValue,
    Region: region,
    Email: email,
    BusinessId: businessId,
  }),
);

export const getImportGeneralJournalsPayload = createSelector(
  getImportFile,
  getImportRegion,
  getEmail,
  getBusinessId,
  (file, region, email, businessId) => ({
    File: file,
    Region: region,
    Email: email,
    BusinessId: businessId,
  }),
);

export const getImportTransactionJournalsPayload = createSelector(
  getImportFile,
  getImportRegion,
  getEmail,
  getBusinessId,
  (file, region, email, businessId) => ({
    File: file,
    Region: region,
    Email: email,
    BusinessId: businessId,
  }),
);

export const getImportTimesheetsPayload = createSelector(
  getImportFile,
  getContactIdentifyBy,
  getImportRegion,
  getEmail,
  getBusinessId,
  (file, identifyBy, region, email, businessId) => ({
    File: file,
    IdentifyBy: identifyBy,
    Region: region,
    Email: email,
    BusinessId: businessId,
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

export const getExportCompanyFileQueryParams = (state) => {
  const {
    dateFrom, dateTo, fileType, clientCode,
  } = getExportCompanyFile(state);
  const hasMyobAeMas = getHasClientCode(state);

  return {
    dateFrom,
    dateTo,
    fileType,
    clientCode: hasMyobAeMas ? clientCode : undefined,
  };
};
