import { LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS } from '../PaydayFilingIntents';
import { getBusinessId } from '../PaydayFilingSelectors';

const createEiSubmissionsIntegrator = (store, integration) => ({
  loadInitialEiSubmissionsAndPayrollOptions: ({ onSuccess, onFailure }) => {
    const intent = LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS;
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createEiSubmissionsIntegrator;
