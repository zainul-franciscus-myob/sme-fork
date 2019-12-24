import { RECALCULATE_PAY, VALIDATE_ETP, VALIDATE_PAY_PERIOD_EMPLOYEE_LIMIT } from '../PayRunIntents';
import { getBusinessId } from '../PayRunSelectors';
import {
  getRecalculatePayPayload,
  getSelectedEmployeeIds,
  getValidateEtpContent,
} from './EmployeePayListSelectors';

const createEmployeePayListIntegrator = (store, integration) => ({
  validateEtp: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = VALIDATE_ETP;

    const businessId = getBusinessId(state);
    const urlParams = { businessId };

    const content = getValidateEtpContent(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  validatePayPeriodEmployeeLimit: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const content = {
      employeeIds: getSelectedEmployeeIds(state),
    };

    integration.write({
      intent: VALIDATE_PAY_PERIOD_EMPLOYEE_LIMIT,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  recalculatePay: ({
    employeeId, payItemId, key, onSuccess, onFailure,
  }) => {
    const state = store.getState();
    const intent = RECALCULATE_PAY;
    const businessId = getBusinessId(state);
    const urlParams = {
      businessId,
    };
    const content = getRecalculatePayPayload({
      state, employeeId, payItemId, key,
    });

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createEmployeePayListIntegrator;
