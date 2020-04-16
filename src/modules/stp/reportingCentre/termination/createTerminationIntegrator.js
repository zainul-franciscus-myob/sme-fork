import {
  FILTER_TERMINATION_EMPLOYEES,
  LOAD_TERMINATION_EMPLOYEES,
  SORT_TERMINATION_EMPLOYEES,
} from './TerminationIntents';
import { UPDATE_STP_EMPLOYEES } from '../ReportingCentreIntents';
import {
  getBusinessId,
  getFilterEmployeesParams,
  getSelectedPayrollYear,
  getTerminateEmployeesContent,
  getUnterminateEmployeeContent,
} from './TerminationSelector';

const createTerminationIntegrator = (store, integration) => ({
  loadEmployeesForThisYear: ({ onSuccess, onFailure }) => {
    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };

    integration.read({
      intent: LOAD_TERMINATION_EMPLOYEES,
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
      intent: FILTER_TERMINATION_EMPLOYEES,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  sortEmployees: ({
    onSuccess, onFailure, orderBy, sortOrder,
  }) => {
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
      intent: SORT_TERMINATION_EMPLOYEES,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  terminateEmployee: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const content = getTerminateEmployeesContent(state);

    integration.write({
      intent: UPDATE_STP_EMPLOYEES,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  unterminateEmployee: ({ employee, onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const content = getUnterminateEmployeeContent(state, employee);

    integration.write({
      intent: UPDATE_STP_EMPLOYEES,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createTerminationIntegrator;
