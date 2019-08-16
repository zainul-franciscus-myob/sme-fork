import { CREATE_INVOICE_SERVICE_DETAIL, GET_CALCULATED_INVOICE_DETAIL_TOTALS, UPDATE_INVOICE_SERVICE_DETAIL } from './InvoiceServiceIntents';
import { DELETE_INVOICE_DETAIL, LOAD_CONTACT_ADDRESS, SEND_EMAIL } from '../../InvoiceIntents';
import {
  getBusinessId,
  getCalculatedTotalsPayload,
  getContactUrlParams,
  getEmailInvoicePayload,
  getInvoicePayload,
  getInvoiceUrlParams,
  getNewInvoiceUrlParams,
} from './invoiceServiceSelectors';

const createInvoiceServiceIntegrator = (store, integration) => ({

  getCalculatedTotals: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = GET_CALCULATED_INVOICE_DETAIL_TOTALS;
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const content = getCalculatedTotalsPayload(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  loadContactAddress: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = getContactUrlParams(state);

    integration.read({
      intent: LOAD_CONTACT_ADDRESS,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  saveInvoiceServiceDetail: ({ isCreating, onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = isCreating ? CREATE_INVOICE_SERVICE_DETAIL : UPDATE_INVOICE_SERVICE_DETAIL;
    const urlParams = isCreating
      ? getNewInvoiceUrlParams(state)
      : getInvoiceUrlParams(state);
    const content = getInvoicePayload(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  deleteInvoice: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = DELETE_INVOICE_DETAIL;
    const urlParams = getInvoiceUrlParams(state);

    integration.write({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  sendEmail: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = SEND_EMAIL;
    const urlParams = getInvoiceUrlParams(state);
    const content = getEmailInvoicePayload(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createInvoiceServiceIntegrator;
