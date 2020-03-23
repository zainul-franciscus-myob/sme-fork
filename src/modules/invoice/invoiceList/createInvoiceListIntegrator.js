import {
  LOAD_INVOICE_LIST,
  LOAD_NEXT_PAGE,
  SORT_AND_FILTER_INVOICE_LIST,
} from '../InvoiceIntents';
import {
  getBusinessId,
  getLoadInvoiceListRequest,
  getLoadNextPageParams,
  getSortAndFilterInvoiceListRequest,
} from './invoiceListSelectors';

const createInvoiceListIntegrator = (store, integration) => ({
  loadInvoiceList: ({ onSuccess, onFailure }) => {
    integration.read({
      intent: LOAD_INVOICE_LIST,
      ...getLoadInvoiceListRequest(store.getState()),
      onSuccess,
      onFailure,
    });
  },
  sortAndFilterInvoiceList: ({ onSuccess, onFailure }) => {
    integration.read({
      intent: SORT_AND_FILTER_INVOICE_LIST,
      ...getSortAndFilterInvoiceListRequest(store.getState()),
      onSuccess,
      onFailure,
    });
  },
  loadNextPage: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };
    integration.read({
      intent: LOAD_NEXT_PAGE,
      urlParams,
      params: getLoadNextPageParams(state),
      onSuccess,
      onFailure,
    });
  },
});

export default createInvoiceListIntegrator;
