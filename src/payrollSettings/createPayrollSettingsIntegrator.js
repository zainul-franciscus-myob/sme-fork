import {
  LOAD_EMPLOYMENT_CLASSIFICATION_LIST,
  LOAD_SUPER_FUND_LIST,
  SORT_AND_FILTER_EMPLOYMENT_CLASSIFICATION_LIST,
  SORT_AND_FILTER_SUPER_FUND_LIST,
} from './PayrollSettingsIntents';
import {
  getAppliedFilterOptions,
  getFilterOptions,
  getOrderBy,
  getSortOrder,
} from './selectors/superFundListSelectors';
import { getBusinessId } from './selectors/payrollSettingsSelectors';
import {
  getEmploymentClassificationAppliedFilterOptions,
  getEmploymentClassificationFilterOptions,
  getEmploymentClassificationOrderBy,
  getEmploymentClassificationSortOrder,
} from './selectors/employmentClassificationListSelectors';

const createPayrollSettingsIntegrator = (store, integration) => ({
  loadSuperFundList: ({ onSuccess, onFailure }) => {
    const intent = LOAD_SUPER_FUND_LIST;

    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };

    integration.read({
      intent, urlParams, onSuccess, onFailure,
    });
  },

  filterSuperFundList: ({ onSuccess, onFailure }) => {
    const intent = SORT_AND_FILTER_SUPER_FUND_LIST;

    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const filterOptions = getFilterOptions(state);
    const sortOrder = getSortOrder(state);
    const orderBy = getOrderBy(state);

    const params = {
      ...filterOptions,
      sortOrder,
      orderBy,
    };

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  sortSuperFundList: ({
    orderBy, sortOrder, onSuccess, onFailure,
  }) => {
    const intent = SORT_AND_FILTER_SUPER_FUND_LIST;

    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const filterOptions = getAppliedFilterOptions(state);

    integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder,
        orderBy,
      },
      onSuccess,
      onFailure,
    });
  },

  loadEmploymentClassificationList: ({ onSuccess, onFailure }) => {
    const intent = LOAD_EMPLOYMENT_CLASSIFICATION_LIST;

    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };

    integration.read({
      intent, urlParams, onSuccess, onFailure,
    });
  },

  filterEmploymentClassificationList: ({ onSuccess, onFailure }) => {
    const intent = SORT_AND_FILTER_EMPLOYMENT_CLASSIFICATION_LIST;

    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const filterOptions = getEmploymentClassificationFilterOptions(state);
    const sortOrder = getEmploymentClassificationSortOrder(state);
    const orderBy = getEmploymentClassificationOrderBy(state);

    const params = {
      ...filterOptions,
      sortOrder,
      orderBy,
    };

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  sortEmploymentClassificationList: ({
    orderBy, sortOrder, onSuccess, onFailure,
  }) => {
    const intent = SORT_AND_FILTER_EMPLOYMENT_CLASSIFICATION_LIST;

    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const filterOptions = getEmploymentClassificationAppliedFilterOptions(state);

    integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder,
        orderBy,
      },
      onSuccess,
      onFailure,
    });
  },
});

export default createPayrollSettingsIntegrator;
