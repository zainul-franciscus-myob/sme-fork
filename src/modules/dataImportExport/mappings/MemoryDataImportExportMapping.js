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
import loadDataImportExportResponse from './data/loadDataImportExport';
import successMessage from './data/success.json';

const loadDataImportExport = ({ onSuccess }) => onSuccess(loadDataImportExportResponse);
const importEntity = ({ onSuccess }) => onSuccess(successMessage);
const exportChartOfAccounts = ({ onSuccess }) => onSuccess(new Blob([], { type: 'text/plain' }));

const MemoryDataImportExportMapping = {
  [LOAD_DATA_IMPORT_EXPORT]: loadDataImportExport,
  [IMPORT_CHART_OF_ACCOUNTS]: importEntity,
  [EXPORT_CHART_OF_ACCOUNTS]: exportChartOfAccounts,
  [IMPORT_CONTACTS]: importEntity,
  [IMPORT_EMPLOYEES]: importEntity,
  [IMPORT_ITEMS]: importEntity,
  [IMPORT_GENERAL_JOURNALS]: importEntity,
  [IMPORT_TRANSACTION_JOURNALS]: importEntity,
  [IMPORT_TIMESHEETS]: importEntity,
};

export default MemoryDataImportExportMapping;
