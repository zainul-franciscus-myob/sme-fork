import {
  LOAD_ACCOUNTS_AND_SUPER_PAYMENTS,
  RECORD_PAY_SUPER,
  SORT_AND_FILTER_SUPER_PAYMENTS,
} from './paySuperCreateIntents';
import {
  getBusinessId,
  getFilterOptions,
  getOrderBy,
  getRecordPaySuperContent,
  getSortOrder,
} from './paySuperCreateSelector';

const createPaySuperCreateIntegrator = (store, integration) => ({
  loadAccountsAndSuperPayments: ({ onSuccess, onFailure }) => {
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
      urlParams,
      params,
      onSuccess,
      onFailure,
      intent: LOAD_ACCOUNTS_AND_SUPER_PAYMENTS,
    });
  },

  fetchSuperPayments: ({ filterOptions, onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    integration.read({
      intent: SORT_AND_FILTER_SUPER_PAYMENTS,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder: getSortOrder(state),
        orderBy: getOrderBy(state),
      },
      onSuccess,
      onFailure,
    });
  },

  recordPaySuper: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const content = getRecordPaySuperContent(state);

    integration.write({
      intent: RECORD_PAY_SUPER,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createPaySuperCreateIntegrator;
