import {
  LOAD_FILTERED_EI_SUBMISSIONS,
  LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS,
  LOAD_PAYRUN_PDF_REPORT,
} from '../PaydayFilingIntents';
import { getBusinessId } from '../PaydayFilingSelectors';
import {
  getFilterEiSubmissionsParams,
  getSelectedPayRunId,
} from './EiSubmissionsSelector';

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

  loadPayRunPdfReport: ({ onSuccess, onFailure }) => {
    const intent = LOAD_PAYRUN_PDF_REPORT;
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      payRunId: getSelectedPayRunId(state),
    };

    integration.readFile({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createEiSubmissionsIntegrator;
