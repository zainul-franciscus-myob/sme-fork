import { RECALCULATE_PAY } from '../PayRunIntents';
import { getBusinessId } from '../PayRunSelectors';
import { getRecalculatePayPayload } from './EmployeePayListSelectors';

const createEmployeePayListIntegrator = (store, integration) => ({
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
