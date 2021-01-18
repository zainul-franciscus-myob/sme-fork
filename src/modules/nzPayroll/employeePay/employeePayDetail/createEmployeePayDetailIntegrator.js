import { LOAD_EMPLOYEE_PAY_DETAIL } from './EmployeePayDetailIntents';
import { getUrlParams } from './EmployeePayDetailSelectors';

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
});

export default createEmployeePayDetailIntegrator;
