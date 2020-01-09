import { FILTER_PAY_EVENTS, LOAD_PAY_EVENTS } from './ReportsIntents';
import { getBusinessId, getFilterPayEventsParams } from './ReportsSelector';

const createReportsIntegrator = (store, integration) => ({
  loadPayEvents: ({ onSuccess, onFailure }) => {
    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };

    integration.read({
      intent: LOAD_PAY_EVENTS,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  filterPayEvents: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const params = getFilterPayEventsParams(state);

    integration.read({
      intent: FILTER_PAY_EVENTS,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
});

export default createReportsIntegrator;
