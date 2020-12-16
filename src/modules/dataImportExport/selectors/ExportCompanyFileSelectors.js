import { createSelector, createStructuredSelector } from 'reselect';

import ExportCompanyFileType from '../types/ExportCompanyFileType';

export const getExportCompanyFile = (state) => state.export.companyFile;
const getDateFrom = (state) => state.export.companyFile.dateFrom;
const getDateTo = (state) => state.export.companyFile.dateTo;
const getFileType = (state) => state.export.companyFile.fileType;
const getClientCode = (state) => state.export.companyFile.clientCode;
const getFileTypeOptions = (state) => state.export.companyFile.fileTypeOptions;
const getPeriod = (state) => state.export.companyFile.period;

export const getTaxCodes = (state) => {
  return state.export.companyFile.taxCodes;
};

export const getHasClientCode = createSelector(
  getFileType,
  (fileType) => fileType === ExportCompanyFileType.MYOB_AE_MAS
);

export const getShouldShowTaxCodeMappingTable = createSelector(
  getFileType,
  (fileType) =>
    fileType === ExportCompanyFileType.RECKON_APS ||
    fileType === ExportCompanyFileType.SAGE_HANDI_LEDGER
);

export const getExportCompanyFileDetail = createStructuredSelector({
  dateFrom: getDateFrom,
  dateTo: getDateTo,
  fileType: getFileType,
  clientCode: getClientCode,
  fileTypeOptions: getFileTypeOptions,
  period: getPeriod,
  shouldShowClientCode: getHasClientCode,
});

export const getExportCompanyFileFileExtension = (state) => {
  const fileType = getFileType(state);

  switch (fileType) {
    case ExportCompanyFileType.MYE:
      return 'mye';
    case ExportCompanyFileType.SAGE_HANDI_LEDGER:
      return 'csv';
    case ExportCompanyFileType.CEE_DATA:
    case ExportCompanyFileType.MYOB_AE_MAS:
    case ExportCompanyFileType.MYOB_AO:
    case ExportCompanyFileType.MYOB_AO_CLASSIC:
    case ExportCompanyFileType.RECKON_APS:
    default:
      return 'txt';
  }
};
