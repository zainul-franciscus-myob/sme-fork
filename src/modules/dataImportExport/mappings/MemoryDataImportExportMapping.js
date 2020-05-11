import {
  BULK_DELETE_UNUSED_ACCOUNTS,
  EXPORT_CHART_OF_ACCOUNTS,
  EXPORT_COMPANY_FILE,
  EXPORT_COMPANY_FILE_RESULT,
  IMPORT_CHART_OF_ACCOUNTS,
  IMPORT_CONTACTS,
  IMPORT_EMPLOYEES,
  IMPORT_GENERAL_JOURNALS,
  IMPORT_ITEMS,
  IMPORT_TIMESHEETS,
  IMPORT_TRANSACTION_JOURNALS,
  LOAD_DATA_IMPORT_EXPORT,
} from '../DataImportExportIntents';
import bulkDeleteResponseData from './data/bulkDeleteResponse';
import exportCompanyFileResponse from './data/exportCompanyFile';
import exportCompanyFileResultResponse from './data/exportCompanyFileResult';
import loadDataImportExportResponse from './data/loadDataImportExport';
import successMessage from './data/success.json';

const exportCompanyFile = ({ onSuccess }) => onSuccess(exportCompanyFileResponse);
const exportCompanyFileResult = ({ onSuccess }) => onSuccess(exportCompanyFileResultResponse);
const loadDataImportExport = ({ onSuccess }) => onSuccess(loadDataImportExportResponse);
const importEntity = ({ onSuccess }) => onSuccess(successMessage);
const exportEntity = ({ onSuccess }) => onSuccess(new Blob([], { type: 'text/plain' }));
const bulkDeleteResponse = ({ onSuccess }) => onSuccess(bulkDeleteResponseData);

const MemoryDataImportExportMapping = {
  [LOAD_DATA_IMPORT_EXPORT]: loadDataImportExport,
  [IMPORT_CHART_OF_ACCOUNTS]: importEntity,
  [EXPORT_CHART_OF_ACCOUNTS]: exportEntity,
  [EXPORT_COMPANY_FILE]: exportCompanyFile,
  [EXPORT_COMPANY_FILE_RESULT]: exportCompanyFileResult,
  [IMPORT_CONTACTS]: importEntity,
  [IMPORT_EMPLOYEES]: importEntity,
  [IMPORT_ITEMS]: importEntity,
  [IMPORT_GENERAL_JOURNALS]: importEntity,
  [IMPORT_TRANSACTION_JOURNALS]: importEntity,
  [IMPORT_TIMESHEETS]: importEntity,
  [BULK_DELETE_UNUSED_ACCOUNTS]: bulkDeleteResponse,
};

export default MemoryDataImportExportMapping;
