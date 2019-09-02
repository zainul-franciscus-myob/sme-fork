import { CREATE_INVOICE_ITEM_DETAIL, UPDATE_INVOICE_ITEM_DETAIL } from './InvoiceItemIntents';
import { DELETE_INVOICE_DETAIL, LOAD_CONTACT_ADDRESS, SEND_EMAIL } from '../../InvoiceIntents';
import {
  getBusinessId,
  getCustomerId,
  getEmailInvoicePayload,
  getInvoiceId,
  getInvoicePayload,
  getInvoiceUrlParams,
  getNewInvoiceUrlParams,
} from './invoiceItemSelectors';

const createInvoiceItemIntegrator = (store, integration) => ({

  loadCustomerAddress: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      contactId: getCustomerId(state),
    };

    integration.read({
      intent: LOAD_CONTACT_ADDRESS,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  updateLines: ({
    onSuccess, onFailure, intent, requestPayload,
  }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    integration.write({
      intent,
      urlParams,
      content: requestPayload,
      onSuccess,
      onFailure,
    });
  },

  saveInvoiceItemDetail: ({ isCreating, onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = isCreating ? CREATE_INVOICE_ITEM_DETAIL : UPDATE_INVOICE_ITEM_DETAIL;
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
    const urlParams = {
      businessId: getBusinessId(state),
      invoiceId: getInvoiceId(state),
    };

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
    const urlParams = {
      businessId: getBusinessId(state),
      invoiceId: getInvoiceId(state),
    };
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

export default createInvoiceItemIntegrator;
