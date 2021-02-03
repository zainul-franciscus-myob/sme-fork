import { LOAD_INITIAL_JOB_MAKER_EMPLOYEES } from './JobMakerIntents';
import { getBusinessId } from './JobMakerSelector';

const createJobMakerIntegrator = (store, integration) => ({
  loadInitialEmployeesAndHeaderDetails: ({ onSuccess, onFailure }) => {
    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };

    integration.read({
      intent: LOAD_INITIAL_JOB_MAKER_EMPLOYEES,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createJobMakerIntegrator;
