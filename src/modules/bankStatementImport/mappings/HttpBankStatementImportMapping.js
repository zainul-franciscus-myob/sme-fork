import {
  DELETE_BANK_STATEMENT,
  IMPORT_BANK_STATEMENT,
  LOAD_BANK_STATEMENT_IMPORT_LIST,
  SORT_AND_FILTER_BANK_STATEMENT_IMPORT_LIST,
} from '../BankStatementImportIntents';

const HttpBankStatementImportMapping = {
  [LOAD_BANK_STATEMENT_IMPORT_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bankStatementImport/load_bank_statement_import_list`,
  },
  [SORT_AND_FILTER_BANK_STATEMENT_IMPORT_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bankStatementImport/filter_bank_statement_import_list`,
  },
  [IMPORT_BANK_STATEMENT]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bankStatementImport/import_bank_statement`,
  },
  [DELETE_BANK_STATEMENT]: {
    method: 'DELETE',
    getPath: ({ businessId, id }) => `/${businessId}/bankStatementImport/delete_bank_statement/${id}`,
  },
};

export default HttpBankStatementImportMapping;
