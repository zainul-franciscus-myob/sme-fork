import {
  GET_DETAIL_JOB_LIST,
  RECALCULATE_PAY,
  SAVE_DRAFT,
  VALIDATE_ETP,
  VALIDATE_PAY_PERIOD_EMPLOYEE_LIMIT,
} from '../PayRunIntents';
import { getBusinessId, getSaveDraftContent } from '../PayRunSelectors';
import {
  getPayPeriod,
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

  loadDetailJobList: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = GET_DETAIL_JOB_LIST;

    const businessId = getBusinessId(state);
    const urlParams = { businessId };

    integration.read({
      intent,
      urlParams,
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
      ...getPayPeriod(state),
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
    employeeId,
    payItemId,
    key,
    isAllowNegativesInPayRuns,
    onSuccess,
    onFailure,
  }) => {
    const state = store.getState();
    const intent = RECALCULATE_PAY;
    const businessId = getBusinessId(state);
    const urlParams = {
      businessId,
    };
    const content = getRecalculatePayPayload({
      state,
      employeeId,
      payItemId,
      key,
      isAllowNegativesInPayRuns,
    });

    integration.write({
      intent,
      allowParallelRequests: true,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  saveDraft: ({ onSuccess, onFailure, isAllowNegativesInPayRuns }) => {
    const state = store.getState();
    const intent = SAVE_DRAFT;
    const businessId = getBusinessId(state);
    const urlParams = {
      businessId,
    };

    const content = getSaveDraftContent(state, isAllowNegativesInPayRuns);

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
