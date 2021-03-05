import {
  DELETE_EMPLOYEE_PAY_DETAILS,
  LOAD_EMPLOYEE_PAY_DETAIL,
} from './EmployeePayDetailIntents';
import {
  getBusinessId,
  getEmployeePay,
  getUrlParams,
} from './EmployeePayDetailSelectors';

const createEmployeePayDetailIntegrator = (store, integration) => ({
  loadEmployeePayDetail: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = getUrlParams(state);

    integration.read({
      intent: LOAD_EMPLOYEE_PAY_DETAIL,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  deleteEmployeePay: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
      payRunId: getEmployeePay(state).payRunId,
      employeePayId: getEmployeePay(state).id,
    };

    integration.write({
      intent: DELETE_EMPLOYEE_PAY_DETAILS,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createEmployeePayDetailIntegrator;
