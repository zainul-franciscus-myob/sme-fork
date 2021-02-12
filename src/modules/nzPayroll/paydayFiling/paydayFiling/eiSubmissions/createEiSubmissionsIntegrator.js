import {
  LOAD_FILTERED_EI_SUBMISSIONS,
  LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS,
} from '../PaydayFilingIntents';
import { getBusinessId } from '../PaydayFilingSelectors';
import { getFilterEiSubmissionsParams } from './EiSubmissionsSelector';

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

  loadFilteredEiSubmissions: ({ onSuccess, onFailure }) => {
    const intent = LOAD_FILTERED_EI_SUBMISSIONS;
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const params = getFilterEiSubmissionsParams(state);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
});

export default createEiSubmissionsIntegrator;
