import {
  DELETE_BANK_STATEMENT,
  IMPORT_BANK_STATEMENT,
  LOAD_BANK_STATEMENT_IMPORT_LIST,
  SORT_AND_FILTER_BANK_STATEMENT_IMPORT_LIST,
} from '../BankStatementImportIntents';
import {
  getAppliedFilterOptions,
  getBusinessId,
  getContentForImport,
  getFilterOptions,
  getOrderBy,
  getPendingDeleteId,
  getSortOrder,
} from './BankStatementImportListSelectors';

const CreateBankStatementImportListIntegrator = (store, integration) => ({
  loadBankStatementImportList: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.read({
      intent: LOAD_BANK_STATEMENT_IMPORT_LIST,
      urlParams: {
        businessId: getBusinessId(state),
      },
      params: {
        sortOrder: getSortOrder(state),
        orderBy: getOrderBy(state),
      },
      onSuccess,
      onFailure,
    });
  },

  sortAndFilterBankStatementImportList: ({ onSuccess, onFailure, isSort }) => {
    const state = store.getState();

    const filterOptions = isSort ? getAppliedFilterOptions(state) : getFilterOptions(state);
    const sortOrder = getSortOrder(state);
    const orderBy = getOrderBy(state);
    const params = {
      ...filterOptions,
      sortOrder,
      orderBy,
    };

    integration.read({
      intent: SORT_AND_FILTER_BANK_STATEMENT_IMPORT_LIST,
      urlParams: {
        businessId: getBusinessId(state),
      },
      params,
      onSuccess,
      onFailure,
    });
  },

  importBankStatement: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.writeFormData({
      intent: IMPORT_BANK_STATEMENT,
      content: getContentForImport(state),
      urlParams: {
        businessId: getBusinessId(state),
      },
      onSuccess,
      onFailure,
    });
  },

  deleteBankStatement: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.write({
      intent: DELETE_BANK_STATEMENT,
      urlParams: {
        businessId: getBusinessId(state),
        id: getPendingDeleteId(state),
      },
      onSuccess,
      onFailure,
    });
  },
});

export default CreateBankStatementImportListIntegrator;
