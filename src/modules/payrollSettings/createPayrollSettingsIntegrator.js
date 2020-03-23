import {
  CREATE_EMPLOYMENT_CLASSIFICATION,
  DELETE_EMPLOYMENT_CLASSIFICATION,
  LOAD_EMPLOYMENT_CLASSIFICATION_DETAIL,
  LOAD_EMPLOYMENT_CLASSIFICATION_LIST,
  LOAD_GENERAL_PAYROLL_INFORMATION,
  LOAD_NEW_EMPLOYMENT_CLASSIFICATION_DETAIL,
  LOAD_SUPER_FUND_LIST,
  SORT_AND_FILTER_EMPLOYMENT_CLASSIFICATION_LIST,
  SORT_AND_FILTER_SUPER_FUND_LIST,
  UPDATE_EMPLOYMENT_CLASSIFICATION,
  UPDATE_GENERAL_PAYROLL_INFORMATION,
} from './PayrollSettingsIntents';
import {
  getBusinessId,
  getGeneralPayrollInformationUrlParams,
  getUpdateGeneralPayrollInformationContent,
} from './selectors/payrollSettingsSelectors';
import {
  getEmploymentClassificationFilterOptions,
  getEmploymentClassificationOrderBy,
  getEmploymentClassificationSortOrder,
} from './selectors/employmentClassificationListSelectors';
import {
  getEmploymentClassificationUrlParams,
  getNewEmploymentClassificationUrlParams,
  getSaveEmploymentClassificationContent,
} from './selectors/employmentClassificationDetailSelectors';
import { getFilterOptions, getOrderBy, getSortOrder } from './selectors/superFundListSelectors';

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

  sortAndFilterSuperFundList: ({ onSuccess, onFailure }) => {
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

  loadEmploymentClassificationList: ({ onSuccess, onFailure }) => {
    const intent = LOAD_EMPLOYMENT_CLASSIFICATION_LIST;

    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };

    integration.read({
      intent, urlParams, onSuccess, onFailure,
    });
  },

  sortAndFilterEmploymentClassificationList: ({ onSuccess, onFailure }) => {
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

  loadNewEmploymentClassificationDetail: ({
    onSuccess, onFailure,
  }) => {
    const intent = LOAD_NEW_EMPLOYMENT_CLASSIFICATION_DETAIL;

    const state = store.getState();
    const urlParams = getNewEmploymentClassificationUrlParams(state);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadEmploymentClassificationDetail: ({
    onSuccess, onFailure,
  }) => {
    const intent = LOAD_EMPLOYMENT_CLASSIFICATION_DETAIL;

    const state = store.getState();
    const urlParams = getEmploymentClassificationUrlParams(state);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadGeneralPayrollInformation: ({
    onSuccess, onFailure,
  }) => {
    const intent = LOAD_GENERAL_PAYROLL_INFORMATION;

    const state = store.getState();
    const urlParams = getGeneralPayrollInformationUrlParams(state);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  submitGeneralPayrollInformation: ({
    onSuccess, onFailure,
  }) => {
    const intent = UPDATE_GENERAL_PAYROLL_INFORMATION;

    const state = store.getState();
    const urlParams = getGeneralPayrollInformationUrlParams(state);
    const content = getUpdateGeneralPayrollInformationContent(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  createEmploymentClassification: ({
    onSuccess, onFailure,
  }) => {
    const intent = CREATE_EMPLOYMENT_CLASSIFICATION;

    const state = store.getState();
    const urlParams = getNewEmploymentClassificationUrlParams(state);
    const content = getSaveEmploymentClassificationContent(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  updateEmploymentClassification: ({
    onSuccess, onFailure,
  }) => {
    const intent = UPDATE_EMPLOYMENT_CLASSIFICATION;

    const state = store.getState();
    const urlParams = getEmploymentClassificationUrlParams(state);
    const content = getSaveEmploymentClassificationContent(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  deleteEmploymentClassification: ({
    onSuccess, onFailure,
  }) => {
    const intent = DELETE_EMPLOYMENT_CLASSIFICATION;

    const state = store.getState();
    const urlParams = getEmploymentClassificationUrlParams(state);

    integration.write({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createPayrollSettingsIntegrator;
