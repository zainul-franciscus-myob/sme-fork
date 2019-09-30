import { LOAD_DEFAULT_BILL_LAYOUT } from '../BillIntents';

const createBillIntegrator = integration => ({

  loadDefaultBillLayout: ({ businessId, onSuccess, onFailure }) => {
    integration.read({
      intent: LOAD_DEFAULT_BILL_LAYOUT,
      urlParams: { businessId },
      onSuccess,
      onFailure,
    });
  },
});

export default createBillIntegrator;
