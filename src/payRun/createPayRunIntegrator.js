import { LOAD_EMPLOYEE_PAYS, START_NEW_PAY_RUN } from './PayRunIntents';
import { getBusinessId, getStartPayRun } from './selectors/PayRunSelectors';

const createPayRunIntegrator = (store, integration) => ({
  startNewPayRun: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = START_NEW_PAY_RUN;

    const businessId = getBusinessId(state);

    const urlParams = { businessId };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadEmployeePays: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_EMPLOYEE_PAYS;

    const businessId = getBusinessId(state);
    const urlParams = { businessId };

    const params = getStartPayRun(state);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
});

export default createPayRunIntegrator;
