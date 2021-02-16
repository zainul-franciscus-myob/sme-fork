import {
  CREATE_JOB_MAKER_EMPLOYEE_ACTION,
  LOAD_INITIAL_JOB_MAKER_EMPLOYEES,
} from './JobMakerIntents';
import {
  getBusinessId,
  getCreateJobMakerEmployeeActionContent,
} from './JobMakerSelector';

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
  createJobMakerEmployeeAction: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const content = getCreateJobMakerEmployeeActionContent(state);
    integration.write({
      intent: CREATE_JOB_MAKER_EMPLOYEE_ACTION,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createJobMakerIntegrator;
