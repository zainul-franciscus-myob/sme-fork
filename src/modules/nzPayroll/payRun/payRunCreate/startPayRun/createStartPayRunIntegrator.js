import { LOAD_EMPLOYEE_PAYS } from '../PayRunIntents';
import { getBusinessId } from '../PayRunSelectors';
import { getLoadEmployeePaysRequestContent } from './StartPayRunSelectors';
import createPayRunIntegrator from '../createPayRunIntegrator';

const createStartPayRunIntegrator = (store, integration) => ({
  ...createPayRunIntegrator(store, integration),
  loadEmployeePays: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_EMPLOYEE_PAYS;

    const businessId = getBusinessId(state);
    const urlParams = { businessId };

    const content = getLoadEmployeePaysRequestContent(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createStartPayRunIntegrator;
