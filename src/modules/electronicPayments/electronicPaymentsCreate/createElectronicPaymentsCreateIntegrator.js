import {
  LOAD_ACCOUNTS_AND_TRANSACTIONS,
  RECORD_AND_DOWNLOAD_BANK_FILE,
  SORT_AND_FILTER_TRANSACTIONS,
} from './ElectronicPaymentsCreateIntents';
import {
  getBusinessId,
  getFilterOptions,
  getOrderBy,
  getRecordAndDownloadBankFileContent,
  getSortOrder,
} from './ElectronicPaymentsCreateSelector';

const createElectronicPaymentsCreateIntegrator = (store, integration) => ({
  loadAccountsAndElectronicPayments: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const params = {
      ...getFilterOptions(state),
      sortOrder: getSortOrder(state),
      orderBy: getOrderBy(state),
    };

    integration.read({
      intent: LOAD_ACCOUNTS_AND_TRANSACTIONS,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  fetchElectronicPayments: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const filterOptions = getFilterOptions(state);
    const params = {
      ...filterOptions,
      sortOrder: getSortOrder(state),
      orderBy: getOrderBy(state),
    };

    integration.read({
      intent: SORT_AND_FILTER_TRANSACTIONS,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  recordAndDownloadBankFile: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const content = getRecordAndDownloadBankFileContent(state);
    const urlParams = {
      businessId: getBusinessId(state),
    };

    integration.write({
      intent: RECORD_AND_DOWNLOAD_BANK_FILE,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createElectronicPaymentsCreateIntegrator;
