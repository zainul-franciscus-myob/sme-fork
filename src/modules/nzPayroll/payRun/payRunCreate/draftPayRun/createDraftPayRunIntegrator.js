import { UPDATE_DRAFT_PAY_RUN, UPDATE_EMPLOYEE_PAY } from '../PayRunIntents';
import { getBusinessId, getDraftPayRunId } from '../PayRunSelectors';
import {
  getEmployeePayId,
  getUpdateDraftPayRunRequest,
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
  updateDraftPayRun: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = UPDATE_DRAFT_PAY_RUN;
    const urlParams = {
      businessId: getBusinessId(state),
      draftPayRunId: getDraftPayRunId(state),
    };
    const content = getUpdateDraftPayRunRequest(state);

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
