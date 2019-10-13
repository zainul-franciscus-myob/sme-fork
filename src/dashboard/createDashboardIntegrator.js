import { LOAD_DASHBOARD, LOAD_PURCHASE, LOAD_SALES } from './DashboardIntents';
import { getBusinessId } from './selectors/DashboardSelectors';
import { getLoadPurchaseParams } from './selectors/DashboardPurchaseSelectors';
import { getLoadSalesParams } from './selectors/DashboardSalesSelectors';

const createDashboardIntegrator = (store, integration) => ({
  loadDashboard: ({ onSuccess, onFailure }) => {
    const intent = LOAD_DASHBOARD;

    const state = store.getState();
    const businessId = getBusinessId(state);

    const urlParams = { businessId };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadSales: ({ onSuccess, onFailure }) => {
    const intent = LOAD_SALES;

    const state = store.getState();
    const businessId = getBusinessId(state);

    const urlParams = { businessId };
    const params = getLoadSalesParams(state);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  loadPurchase: ({ onSuccess, onFailure }) => {
    const intent = LOAD_PURCHASE;

    const state = store.getState();
    const businessId = getBusinessId(state);

    const urlParams = { businessId };
    const params = getLoadPurchaseParams(state);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
});

export default createDashboardIntegrator;
