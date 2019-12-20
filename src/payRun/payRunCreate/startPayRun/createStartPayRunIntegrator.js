import { LOAD_EMPLOYEE_PAYS } from '../PayRunIntents';
import { getBusinessId } from '../PayRunSelectors';
import { getStartPayRun } from './StartPayRunSelectors';

const createStartPayRunIntegrator = (store, integration) => ({
  loadEmployeePays: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_EMPLOYEE_PAYS;

    const businessId = getBusinessId(state);
    const urlParams = { businessId };

    const params = getStartPayRun(state).newPayRunDetails;

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
});

export default createStartPayRunIntegrator;
