import {
  CREATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  LOAD_EMPLOYEE_DETAIL,
  LOAD_NEW_EMPLOYEE_DETAIL,
  UPDATE_EMPLOYEE,
} from '../EmployeeIntents';
import {
  getBusinessId,
  getEmployeeId,
  getEmployeePayload,
  getIsCreating,
} from './selectors/EmployeeDetailSelectors';

const createEmployeeDetailIntegrator = (store, integration) => ({
  loadEmployeeDetails: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating
      ? LOAD_NEW_EMPLOYEE_DETAIL
      : LOAD_EMPLOYEE_DETAIL;

    const businessId = getBusinessId(state);
    const employeeId = isCreating ? undefined : getEmployeeId(state);

    const urlParams = { businessId, employeeId };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  createOrUpdateEmployee: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating
      ? CREATE_EMPLOYEE
      : UPDATE_EMPLOYEE;

    const businessId = getBusinessId(state);
    const employeeId = isCreating ? undefined : getEmployeeId(state);
    const urlParams = { businessId, employeeId };

    const content = getEmployeePayload(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  deleteEmployee: ({ onSuccess, onFailure }) => {
    const intent = DELETE_EMPLOYEE;

    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      employeeId: getEmployeeId(state),
    };

    integration.write({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createEmployeeDetailIntegrator;
