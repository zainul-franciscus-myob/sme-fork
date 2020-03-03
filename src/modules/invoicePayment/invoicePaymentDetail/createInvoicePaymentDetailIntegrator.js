import {
  CREATE_INVOICE_PAYMENT,
  DELETE_INVOICE_PAYMENT,
  LOAD_INVOICE_LIST,
  LOAD_INVOICE_PAYMENT_DETAIL,
  LOAD_NEW_INVOICE_PAYMENT_DETAIL,
  UPDATE_INVOICE_PAYMENT,
} from '../InvoicePaymentIntent';
import {
  getBusinessId,
  getCustomerId,
  getIsCreating,
  getSaveContent,
  getShowPaidInvoices,
  getUrlParams,
} from './invoicePaymentDetailSelectors';

const createInvoicePaymentDetailIntegrator = (store, integration) => ({
  loadInvoicePayment: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating ? LOAD_NEW_INVOICE_PAYMENT_DETAIL : LOAD_INVOICE_PAYMENT_DETAIL;
    const urlParams = getUrlParams(state);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  createOrUpdateInvoicePayment: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating ? CREATE_INVOICE_PAYMENT : UPDATE_INVOICE_PAYMENT;
    const urlParams = getUrlParams(state);
    const content = getSaveContent(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  deleteInvoicePayment: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = getUrlParams(state);

    integration.write({
      intent: DELETE_INVOICE_PAYMENT,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadInvoiceList: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_INVOICE_LIST;
    const urlParams = {
      businessId: getBusinessId(state),
      customerId: getCustomerId(state),
    };
    const params = {
      showPaidInvoices: getShowPaidInvoices(state),
    };

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
});

export default createInvoicePaymentDetailIntegrator;
