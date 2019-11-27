import { EXPORT_CHART_OF_ACCOUNTS, IMPORT_CHART_OF_ACCOUNTS, LOAD_DATA_IMPORT_EXPORT } from '../../dataImportExport/DataImportExportIntents';
import loadDataImportExportResponse from '../data/dataImportExport/loadDataImportExport';
import successMessage from '../data/success.json';

const loadDataImportExport = ({ onSuccess }) => onSuccess(loadDataImportExportResponse);
const importChartOfAccounts = ({ onSuccess }) => onSuccess(successMessage);
const exportChartOfAccounts = ({ onSuccess }) => onSuccess(new Blob([], { type: 'text/plain' }));

const DataImportExportMapping = {
  [LOAD_DATA_IMPORT_EXPORT]: loadDataImportExport,
  [IMPORT_CHART_OF_ACCOUNTS]: importChartOfAccounts,
  [EXPORT_CHART_OF_ACCOUNTS]: exportChartOfAccounts,
};

export default DataImportExportMapping;
