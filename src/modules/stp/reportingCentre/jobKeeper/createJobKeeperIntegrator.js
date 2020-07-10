import {
  FILTER_JOB_KEEPER_EMPLOYEES,
  LOAD_INITIAL_JOB_KEEPER_EMPLOYEES,
  LOAD_JOB_KEEPER_REPORT,
  SORT_JOB_KEEPER_EMPLOYEES,
  UPDATE_JOB_KEEPER_PAYMENTS,
} from './JobKeeperIntents';
import {
  getBusinessId,
  getFilterEmployeesParams,
  getSelectedPayrollYear,
  getUpdateJobKeeperPaymentsContent,
} from './JobKeeperSelector';

const createJobKeeperIntegrator = (store, integration) => ({
  loadInitialEmployeesAndHeaderDetails: ({ onSuccess, onFailure }) => {
    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };

    integration.read({
      intent: LOAD_INITIAL_JOB_KEEPER_EMPLOYEES,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  filterEmployees: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const params = getFilterEmployeesParams(state);

    integration.read({
      intent: FILTER_JOB_KEEPER_EMPLOYEES,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  updateJobKeeperPayments: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const content = getUpdateJobKeeperPaymentsContent(state);

    integration.write({
      intent: UPDATE_JOB_KEEPER_PAYMENTS,
      urlParams,
      content,
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
      intent: SORT_JOB_KEEPER_EMPLOYEES,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  onOpenJobKeeperReport: ({ onSuccess, onFailure, month }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
      month,
    };
    integration.readFile({
      intent: LOAD_JOB_KEEPER_REPORT,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createJobKeeperIntegrator;
