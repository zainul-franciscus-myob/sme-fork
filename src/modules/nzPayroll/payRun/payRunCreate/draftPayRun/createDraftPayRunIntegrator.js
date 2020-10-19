import { UPDATE_EMPLOYEE_PAY } from '../PayRunIntents';
import { getBusinessId, getDraftPayRunId } from '../PayRunSelectors';
import {
  getEmployeePayId,
  getUpdateEmployeePayRequest,
} from './DraftPayRunSelectors';

const createDraftPayRunIntegrator = (store, integration) => ({
  updateEmployeePay: ({ employeeId, onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = UPDATE_EMPLOYEE_PAY;
    const urlParams = {
      businessId: getBusinessId(state),
      draftPayRunId: getDraftPayRunId(state),
      employeePayId: getEmployeePayId({ state, employeeId }),
    };
    const content = getUpdateEmployeePayRequest({
      state,
      employeeId,
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
});

export default createDraftPayRunIntegrator;
