import { DELETE_PAY_RUN_DRAFT, LOAD_EMPLOYEE_PAYS } from '../PayRunIntents';
import { getBusinessId } from '../PayRunSelectors';
import { getStartPayRun } from './StartPayRunSelectors';

const createStartPayRunIntegrator = (store, integration) => ({
  loadEmployeePays: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_EMPLOYEE_PAYS;

    const businessId = getBusinessId(state);
    const urlParams = { businessId };

    // TODO: refactor this to come from a selector - Shohre
    const params = getStartPayRun(state).newPayRunDetails;

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
  deleteDraft: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = DELETE_PAY_RUN_DRAFT;

    const businessId = getBusinessId(state);
    const urlParams = { businessId };

    integration.write({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createStartPayRunIntegrator;
