import {
  EXPORT_CHART_OF_ACCOUNTS,
  IMPORT_CHART_OF_ACCOUNTS,
  IMPORT_CONTACTS,
  IMPORT_EMPLOYEES,
  IMPORT_GENERAL_JOURNALS,
  IMPORT_ITEMS,
  IMPORT_TIMESHEETS,
  IMPORT_TRANSACTION_JOURNALS,
  LOAD_DATA_IMPORT_EXPORT,
} from '../DataImportExportIntents';

const HttpDataImportExportMapping = {
  [LOAD_DATA_IMPORT_EXPORT]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/dataImportExport/load_data_import_export`,
  },
  [IMPORT_CHART_OF_ACCOUNTS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/dataImportExport/import_chart_of_accounts`,
  },
  [EXPORT_CHART_OF_ACCOUNTS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/dataImportExport/export_chart_of_accounts`,
  },
  [IMPORT_CONTACTS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/dataImportExport/import_contacts`,
  },
  [IMPORT_EMPLOYEES]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/dataImportExport/import_employees`,
  },
  [IMPORT_ITEMS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/dataImportExport/import_items`,
  },
  [IMPORT_GENERAL_JOURNALS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/dataImportExport/import_general_journals`,
  },
  [IMPORT_TRANSACTION_JOURNALS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/dataImportExport/import_transaction_journals`,
  },
  [IMPORT_TIMESHEETS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/dataImportExport/import_timesheets`,
  },
};

export default HttpDataImportExportMapping;
