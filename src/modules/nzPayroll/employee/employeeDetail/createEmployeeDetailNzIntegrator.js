import { DELETE_EMPLOYEE, LOAD_EMPLOYEE_DETAIL, UPDATE_EMPLOYEE } from '../EmployeeNzIntents';
import {
  getBusinessId,
  getEmployeeId,
  getEmployeePayload,
} from './EmployeeDetailNzSelectors';

const createEmployeeDetailNzIntegrator = ({ store, integration }) => ({
  loadEmployeeDetails: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_EMPLOYEE_DETAIL;
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

  saveEmployeeDetails: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = UPDATE_EMPLOYEE;
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

export default createEmployeeDetailNzIntegrator;
