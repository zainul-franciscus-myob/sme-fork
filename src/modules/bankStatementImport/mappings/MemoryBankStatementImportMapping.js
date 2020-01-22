import {
  DELETE_BANK_STATEMENT,
  IMPORT_BANK_STATEMENT,
  LOAD_BANK_STATEMENT_IMPORT_LIST,
  SORT_AND_FILTER_BANK_STATEMENT_IMPORT_LIST,
} from '../BankStatementImportIntents';
import filterBankStatementImportListResponse from './data/filterBankStatementImportList';
import loadBankStatementImportListResponse from './data/loadBankStatementImportList';
import success from './data/success';

const loadBankStatementImportList = ({ onSuccess }) => {
  onSuccess(loadBankStatementImportListResponse);
};
const filterBankStatementImportList = ({ onSuccess }) => {
  onSuccess(filterBankStatementImportListResponse);
};
const importBankStatement = ({ onSuccess }) => {
  onSuccess(success);
};
const deleteBankStatement = ({ onSuccess }) => {
  onSuccess(success);
};

const MemoryBankStatementImportMapping = {
  [LOAD_BANK_STATEMENT_IMPORT_LIST]: loadBankStatementImportList,
  [SORT_AND_FILTER_BANK_STATEMENT_IMPORT_LIST]: filterBankStatementImportList,
  [IMPORT_BANK_STATEMENT]: importBankStatement,
  [DELETE_BANK_STATEMENT]: deleteBankStatement,
};

export default MemoryBankStatementImportMapping;
