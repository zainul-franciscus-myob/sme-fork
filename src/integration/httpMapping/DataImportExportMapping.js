import { EXPORT_CHART_OF_ACCOUNTS, IMPORT_CHART_OF_ACCOUNTS, LOAD_DATA_IMPORT_EXPORT } from '../../modules/dataImportExport/DataImportExportIntents';

const DataImportExportMapping = {
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
};

export default DataImportExportMapping;
