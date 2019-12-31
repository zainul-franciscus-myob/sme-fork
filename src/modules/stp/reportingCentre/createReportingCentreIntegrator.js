import { LOAD_STP_REGISTRATION_STATUS } from './ReportingCentreIntents';
import { getBusinessId } from './ReportingCentreSelectors';

const createReportingCentreIntegrator = (store, integration) => ({
  loadRegistrationStatus: ({ onSuccess, onFailure }) => {
    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };

    integration.read({
      intent: LOAD_STP_REGISTRATION_STATUS,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createReportingCentreIntegrator;
