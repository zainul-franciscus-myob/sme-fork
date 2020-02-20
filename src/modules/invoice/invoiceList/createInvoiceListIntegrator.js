import {
  LOAD_INVOICE_LIST,
  LOAD_NEXT_PAGE,
  SORT_AND_FILTER_INVOICE_LIST,
} from '../InvoiceIntents';
import {
  getBusinessId,
  getFilterInvoiceListRequest,
  getLoadInvoiceListRequest,
  getLoadNextPageParams,
  getSortInvoiceListRequest,
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
  sortInvoiceList: ({ orderBy, onSuccess, onFailure }) => {
    integration.read({
      intent: SORT_AND_FILTER_INVOICE_LIST,
      ...getSortInvoiceListRequest(store.getState(), orderBy),
      onSuccess,
      onFailure,
    });
  },
  filterInvoiceList: ({ onSuccess, onFailure }) => {
    integration.read({
      intent: SORT_AND_FILTER_INVOICE_LIST,
      ...getFilterInvoiceListRequest(store.getState()),
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
