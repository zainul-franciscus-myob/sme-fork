import { DELETE_EMPLOYEE_PAY_MODAL, LOAD_EMPLOYEE_PAY_MODAL, LOAD_EMPLOYEE_PAY_REVERSAL_PREVIEW_MODAL } from './EmployeePayModalIntents';
import { getUrlParams } from './EmployeePayModalSelectors';

const createEmployeePayModalIntegrator = (store, integration) => ({
  loadEmployeePayModal: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = getUrlParams(state);

    integration.read({
      intent: LOAD_EMPLOYEE_PAY_MODAL,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  deleteEmployeePayModal: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = getUrlParams(state);

    integration.read({
      intent: DELETE_EMPLOYEE_PAY_MODAL,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadReversalEmployeePayModal: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = getUrlParams(state);

    integration.read({
      intent: LOAD_EMPLOYEE_PAY_REVERSAL_PREVIEW_MODAL,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createEmployeePayModalIntegrator;
