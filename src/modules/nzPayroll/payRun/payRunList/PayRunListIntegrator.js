import { SORT_AND_FILTER_PAY_RUN_LIST } from './PayRunListIntents';
import {
  getBusinessId,
  getFilterOptions,
  getSortOrder,
} from './payRunListSelectors';

const PayRunIntegrator = (store, integration) => ({
  sortAndFilterPayRunList: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = SORT_AND_FILTER_PAY_RUN_LIST;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    integration.read({
      intent,
      urlParams,
      params: {
        ...getFilterOptions(state),
        sortOrder: getSortOrder(state),
        orderBy: 'PaymentDate',
      },
      onSuccess,
      onFailure,
    });
  },
});

export default PayRunIntegrator;
