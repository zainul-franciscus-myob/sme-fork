import {
  LOAD_EMPLOYEE_DETAIL,
} from '../EmployeeNzIntents';
import {
  getBusinessId,
  getEmployeeId,
} from './EmployeeDetailNzSelectors';

const createEmployeeDetailNzIntegrator = ({ store, integration }) => ({
  loadEmployeeDetails: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_EMPLOYEE_DETAIL;

    const businessId = getBusinessId(state);
    const employeeId = getEmployeeId(state);

    const urlParams = { businessId, employeeId };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createEmployeeDetailNzIntegrator;
