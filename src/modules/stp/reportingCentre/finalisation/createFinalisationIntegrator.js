import {
  LOAD_EMPLOYEES_AND_HEADERS_FOR_YEAR,
  LOAD_INITIAL_EMPLOYEES_AND_HEADERS,
  OPEN_EMPLOYEE_SUMMARY_REPORT,
  OPEN_EOFY_YTD_REPORT,
  SORT_EMPLOYEES,
  SUBMIT_EMPLOYEES_FINALISATION,
  SUBMIT_EMPLOYEES_REMOVE_FINALISATION,
} from './FinalisationIntents';
import {
  getBusinessId,
  getSelectedPayrollYear,
  getSubmitEmployeesFinalisationContent,
  getSubmitEmployeesRemoveFinalisationContent,
} from './FinalisationSelector';

const createFinalisationIntegrator = (store, integration) => ({
  loadInitialEmployeesAndHeaderDetails: ({ onSuccess, onFailure }) => {
    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };

    integration.read({
      intent: LOAD_INITIAL_EMPLOYEES_AND_HEADERS,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadHeadersAndEmployeesForYear: ({ onSuccess, onFailure, year }) => {
    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };

    const params = {
      year,
    };

    integration.read({
      intent: LOAD_EMPLOYEES_AND_HEADERS_FOR_YEAR,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  submitEmployeesFinalisation: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const content = getSubmitEmployeesFinalisationContent(state);

    integration.write({
      intent: SUBMIT_EMPLOYEES_FINALISATION,
      urlParams,
      onSuccess,
      onFailure,
      content,
    });
  },

  submitEmployeesRemoveFinalisation: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const content = getSubmitEmployeesRemoveFinalisationContent(state);

    integration.write({
      intent: SUBMIT_EMPLOYEES_REMOVE_FINALISATION,
      urlParams,
      onSuccess,
      onFailure,
      content,
    });
  },

  openYtdVerificationReport: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const params = {
      year: getSelectedPayrollYear(state),
    };

    integration.readFile({
      intent: OPEN_EOFY_YTD_REPORT,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  openEmployeeSummaryReport: ({ onSuccess, onFailure, employeeId }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
      employeeId,
    };

    const params = {
      year: getSelectedPayrollYear(state),
    };

    integration.readFile({
      intent: OPEN_EMPLOYEE_SUMMARY_REPORT,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  sortEmployees: ({ onSuccess, onFailure, orderBy, sortOrder }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const params = {
      year: getSelectedPayrollYear(state),
      orderBy,
      sortOrder,
    };

    integration.read({
      intent: SORT_EMPLOYEES,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
});

export default createFinalisationIntegrator;
