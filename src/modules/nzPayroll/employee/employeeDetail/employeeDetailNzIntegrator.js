import * as intents from '../EmployeeNzIntents';
import {
  getBusinessId,
  getEmployeeId,
  getEmployeePayload,
  getIsCreating,
} from './EmployeeDetailNzSelectors';

const employeeDetailNzIntegrator = ({ store, integration }) => ({
  loadEmployeeDetails: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating
      ? intents.LOAD_NEW_EMPLOYEE_DETAIL
      : intents.LOAD_EMPLOYEE_DETAIL;

    const urlParams = {
      businessId: getBusinessId(state),
      employeeId: getEmployeeId(state),
    };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  createOrSaveEmployeeDetails: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);
    const intent = isCreating
      ? intents.CREATE_EMPLOYEE
      : intents.UPDATE_EMPLOYEE;
    const urlParams = {
      businessId: getBusinessId(state),
      employeeId: getEmployeeId(state),
    };
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
    const intent = intents.DELETE_EMPLOYEE;
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

export default employeeDetailNzIntegrator;
