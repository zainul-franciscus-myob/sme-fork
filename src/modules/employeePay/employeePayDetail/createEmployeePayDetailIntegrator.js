import {
  DELETE_EMPLOYEE_PAY_DETAIL,
  LOAD_EMPLOYEE_PAY_DETAIL,
  LOAD_EMPLOYEE_PAY_REVERSAL_PREVIEW_DETAIL,
  SEND_EMPLOYEE_PAY_REVERSAL_DETAIL,
} from './EmployeePayDetailIntents';
import { getReversalEmployeePayContent, getUrlParams } from './EmployeePayDetailSelectors';

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

  deleteEmployeePayDetail: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = getUrlParams(state);

    integration.write({
      intent: DELETE_EMPLOYEE_PAY_DETAIL,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadEmployeePayReversalPreviewDetail: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = getUrlParams(state);

    integration.read({
      intent: LOAD_EMPLOYEE_PAY_REVERSAL_PREVIEW_DETAIL,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  sendReversalEmployeePay: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = { businessId: state.businessId };
    const content = getReversalEmployeePayContent(state);

    integration.write({
      intent: SEND_EMPLOYEE_PAY_REVERSAL_DETAIL,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createEmployeePayDetailIntegrator;
