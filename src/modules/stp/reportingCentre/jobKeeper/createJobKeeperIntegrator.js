import { LOAD_INITIAL_JOB_KEEPER_EMPLOYEES } from './JobKeeperIntents';
import { getBusinessId } from './JobKeeperSelector';

const createJobKeeperIntegrator = (store, integration) => ({
  loadInitialEmployeesAndHeaderDetails: ({ onSuccess, onFailure }) => {
    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };

    integration.read({
      intent: LOAD_INITIAL_JOB_KEEPER_EMPLOYEES,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createJobKeeperIntegrator;
