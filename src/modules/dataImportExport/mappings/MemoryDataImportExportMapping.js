import {
  EXPORT_CHART_OF_ACCOUNTS,
  IMPORT_CHART_OF_ACCOUNTS,
  IMPORT_CONTACTS,
  LOAD_DATA_IMPORT_EXPORT,
} from '../DataImportExportIntents';
import loadDataImportExportResponse from './data/loadDataImportExport';
import successMessage from './data/success.json';

const loadDataImportExport = ({ onSuccess }) => onSuccess(loadDataImportExportResponse);
const importChartOfAccounts = ({ onSuccess }) => onSuccess(successMessage);
const importContacts = ({ onSuccess }) => onSuccess(successMessage);
const exportChartOfAccounts = ({ onSuccess }) => onSuccess(new Blob([], { type: 'text/plain' }));

const MemoryDataImportExportMapping = {
  [LOAD_DATA_IMPORT_EXPORT]: loadDataImportExport,
  [IMPORT_CHART_OF_ACCOUNTS]: importChartOfAccounts,
  [EXPORT_CHART_OF_ACCOUNTS]: exportChartOfAccounts,
  [IMPORT_CONTACTS]: importContacts,
};

export default MemoryDataImportExportMapping;
