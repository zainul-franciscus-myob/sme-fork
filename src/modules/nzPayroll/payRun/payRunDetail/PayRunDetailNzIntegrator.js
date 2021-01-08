import { LOAD_PAY_RUN_DETAILS } from './payRunDetailNzIntents';
import { getUrlParams } from './payRunDetailNzSelector';

const PayRunDetailNzIntegrator = ({ store, integration }) => ({
  loadPayRunDetail: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_PAY_RUN_DETAILS;
    const urlParams = getUrlParams(state);

    integration.read({
      onSuccess,
      onFailure,
      urlParams,
      intent,
    });
  },
});

export default PayRunDetailNzIntegrator;
