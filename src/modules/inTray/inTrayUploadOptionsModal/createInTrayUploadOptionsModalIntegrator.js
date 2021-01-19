import { GENERATE_IN_TRAY_EMAIL } from '../InTrayIntents';
import { getBusinessId } from './selectors/inTrayUploadOptionsSelectors';

const createInTrayModalIntegrator = (store, integration) => ({
  generateNewEmail: ({ onSuccess, onFailure }) => {
    const intent = GENERATE_IN_TRAY_EMAIL;
    const businessId = getBusinessId(store.getState());

    integration.write({
      intent,
      urlParams: { businessId },
      onSuccess,
      onFailure,
    });
  },
});

export default createInTrayModalIntegrator;
