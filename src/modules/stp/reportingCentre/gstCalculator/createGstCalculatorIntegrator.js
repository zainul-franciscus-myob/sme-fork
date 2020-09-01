import { CALCULATE_TURNOVER } from './GstCalculatorIntents';
import { getBusinessId, getFormData } from './GstCalculatorSelector';

const createGstCalculatorIntegrator = (store, integration) => ({
  calculateTurnover: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const content = getFormData(state);

    integration.write({
      intent: CALCULATE_TURNOVER,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createGstCalculatorIntegrator;
