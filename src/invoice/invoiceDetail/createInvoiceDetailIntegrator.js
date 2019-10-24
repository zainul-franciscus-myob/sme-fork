import {
  CREATE_INVOICE_DETAIL,
  DELETE_INVOICE_DETAIL,
  GET_INVOICE_SERVICE_CALCULATED_TOTALS,
  LOAD_CONTACT_ADDRESS,
  LOAD_PAY_DIRECT,
  SEND_EMAIL,
  UPDATE_INVOICE_DETAIL,
} from '../InvoiceIntents';
import {
  getCreateOrUpdateInvoicePayload,
  getCreateOrUpdateInvoiceUrlParams,
  getDeleteInvoiceUrlParams,
  getLoadContactAddressUrlParams,
  getLoadInvoiceIntent,
  getLoadInvoiceQueryParams,
  getLoadInvoiceUrlParams,
  getLoadPayDirectUrlParams,
} from './selectors/integratorSelectors';
import { getInvoiceItemCalculatedLinesUrlParams } from './selectors/itemLayoutSelectors';
import {
  getInvoiceServiceCalculatedTotalsPayload,
  getInvoiceServiceCalculatedTotalsUrlParams,
} from './selectors/serviceLayoutSelectors';
import { getIsCreating } from './selectors/invoiceDetailSelectors';
import { getSendEmailPayload, getSendEmailUrlParams } from './selectors/emailSelectors';

const createInvoiceDetailIntegrator = (store, integration) => ({
  loadInvoice: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = getLoadInvoiceIntent(state);
    const urlParams = getLoadInvoiceUrlParams(state);
    const params = getLoadInvoiceQueryParams(state);

    integration.read({
      intent, urlParams, params, onSuccess, onFailure,
    });
  },

  createOrUpdateInvoice: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating ? CREATE_INVOICE_DETAIL : UPDATE_INVOICE_DETAIL;
    const urlParams = getCreateOrUpdateInvoiceUrlParams(state);
    const content = getCreateOrUpdateInvoicePayload(state);

    integration.write({
      intent, urlParams, content, onSuccess, onFailure,
    });
  },

  deleteInvoice: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = DELETE_INVOICE_DETAIL;
    const urlParams = getDeleteInvoiceUrlParams(state);

    integration.write({
      intent, urlParams, onSuccess, onFailure,
    });
  },

  loadContactAddress: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_CONTACT_ADDRESS;
    const urlParams = getLoadContactAddressUrlParams(state);

    integration.read({
      intent, urlParams, onSuccess, onFailure,
    });
  },

  loadPayDirect: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_PAY_DIRECT;
    const urlParams = getLoadPayDirectUrlParams(state);

    integration.read({
      intent, urlParams, onSuccess, onFailure,
    });
  },

  getInvoiceServiceCalculatedTotals: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = GET_INVOICE_SERVICE_CALCULATED_TOTALS;
    const urlParams = getInvoiceServiceCalculatedTotalsUrlParams(state);
    const content = getInvoiceServiceCalculatedTotalsPayload(state);

    integration.write({
      intent, urlParams, content, onSuccess, onFailure,
    });
  },

  getInvoiceItemCalculatedLines: ({
    onSuccess, onFailure, intent, requestPayload,
  }) => {
    const state = store.getState();

    const urlParams = getInvoiceItemCalculatedLinesUrlParams(state);
    const content = requestPayload;

    integration.write({
      intent, urlParams, content, onSuccess, onFailure,
    });
  },

  sendEmail: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = SEND_EMAIL;
    const urlParams = getSendEmailUrlParams(state);
    const content = getSendEmailPayload(state);

    integration.write({
      intent, urlParams, content, onSuccess, onFailure,
    });
  },
});

export default createInvoiceDetailIntegrator;
