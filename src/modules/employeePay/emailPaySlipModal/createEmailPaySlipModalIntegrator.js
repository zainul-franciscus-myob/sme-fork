import { SEND_PAY_SLIP_EMAIL } from './EmailPaySlipModalIntents';
import {
  getEmailContentForCurrentEmployee,
  getEmailUrlParams,
} from './EmailPaySlipModalSelectors';

const createEmailPaySlipModalIntegrator = (store, integration) => ({
  sendPaySlipEmail: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = getEmailUrlParams(state);
    const content = getEmailContentForCurrentEmployee(state);

    integration.write({
      intent: SEND_PAY_SLIP_EMAIL,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createEmailPaySlipModalIntegrator;
