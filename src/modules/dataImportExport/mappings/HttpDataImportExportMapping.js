import {
  EXPORT_CHART_OF_ACCOUNTS, IMPORT_CHART_OF_ACCOUNTS, IMPORT_CONTACTS, LOAD_DATA_IMPORT_EXPORT,
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
};

export default HttpDataImportExportMapping;
