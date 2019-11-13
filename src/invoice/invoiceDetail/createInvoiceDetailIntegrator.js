import {
  CREATE_INVOICE_DETAIL,
  DELETE_INVOICE_DETAIL,
  EXPORT_INVOICE_PDF,
  GET_INVOICE_SERVICE_CALCULATED_TOTALS,
  LOAD_CONTACT_ADDRESS,
  LOAD_CONTACT_AFTER_CREATE,
  LOAD_PAY_DIRECT,
  SEND_EMAIL,
  UPDATE_INVOICE_DETAIL,
  UPLOAD_EMAIL_ATTACHMENT,
} from '../InvoiceIntents';
import { getBusinessId, getIsCreating } from './selectors/invoiceDetailSelectors';
import {
  getCreateOrUpdateInvoicePayload,
  getCreateOrUpdateInvoiceUrlParams,
  getDeleteInvoiceUrlParams,
  getLoadAddedContactUrlParams,
  getLoadContactAddressUrlParams,
  getLoadInvoiceIntent,
  getLoadInvoiceQueryParams,
  getLoadInvoiceUrlParams,
  getLoadPayDirectUrlParams,
} from './selectors/integratorSelectors';
import { getExportPdfQueryParams, getExportPdfUrlParams } from './selectors/exportPdfSelectors';
import { getInvoiceItemCalculatedLinesUrlParams } from './selectors/itemLayoutSelectors';
import {
  getInvoiceServiceCalculatedTotalsPayload,
  getInvoiceServiceCalculatedTotalsUrlParams,
} from './selectors/serviceLayoutSelectors';
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

  loadContactAfterCreate: ({ id, onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_CONTACT_AFTER_CREATE;
    const urlParams = getLoadAddedContactUrlParams(state, id);

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

  uploadEmailAttachment: ({
    onSuccess, onFailure, onProgress, file,
  }) => {
    const state = store.getState();
    integration.writeFormData({
      intent: UPLOAD_EMAIL_ATTACHMENT,
      content: {
        file,
      },
      urlParams: {
        businessId: getBusinessId(state),
      },
      onSuccess,
      onFailure,
      onProgress,
    });
  },

  exportPdf: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = EXPORT_INVOICE_PDF;
    const urlParams = getExportPdfUrlParams(state);
    const params = getExportPdfQueryParams(state);

    integration.readFile({
      intent, urlParams, params, onSuccess, onFailure,
    });
  },
});

export default createInvoiceDetailIntegrator;
