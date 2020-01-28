import {
  CALCULATE_LINE_TOTALS,
  CALCULATE_LINE_TOTALS_ON_AMOUNT_CHANGE,
  CALCULATE_LINE_TOTALS_ON_ITEM_CHANGE,
  CALCULATE_LINE_TOTALS_ON_TAX_INCLUSIVE_CHANGE,
  CREATE_INVOICE_DETAIL,
  DELETE_INVOICE_DETAIL,
  EXPORT_INVOICE_PDF,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ACCOUNT_OPTIONS,
  LOAD_CONTACT_ADDRESS,
  LOAD_CONTACT_AFTER_CREATE,
  LOAD_CONTACT_OPTIONS,
  LOAD_INVOICE_HISTORY,
  LOAD_ITEM_OPTION,
  LOAD_ITEM_OPTIONS,
  LOAD_ITEM_SELLING_DETAILS,
  LOAD_PAY_DIRECT,
  SEND_EMAIL,
  UPDATE_INVOICE_DETAIL,
  UPLOAD_EMAIL_ATTACHMENT,
} from '../InvoiceIntents';
import { getBusinessId, getIsCreating, getIsTaxInclusive } from './selectors/invoiceDetailSelectors';
import {
  getCalculateLineTotalsContent,
  getCalculateLineTotalsOnAmountChangeContent,
  getCalculateLineTotalsOnItemChangeContent,
  getCalculateLineTotalsOnTaxInclusiveChangeContent,
  getCalculateLineTotalsUrlParams,
  getCreateOrUpdateInvoicePayload,
  getCreateOrUpdateInvoiceUrlParams,
  getDeleteInvoiceUrlParams,
  getInvoiceHistoryUrlParams,
  getLoadAddedAccountUrlParams,
  getLoadAddedContactUrlParams,
  getLoadContactAddressUrlParams,
  getLoadInvoiceIntent,
  getLoadInvoiceUrlParams,
  getLoadItemOptionUrlParams,
  getLoadPayDirectUrlParams,
} from './selectors/integratorSelectors';
import { getExportPdfQueryParams, getExportPdfUrlParams } from './selectors/exportPdfSelectors';
import { getSendEmailPayload, getSendEmailUrlParams } from './selectors/emailSelectors';

const createInvoiceDetailIntegrator = (store, integration) => ({
  loadInvoice: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = getLoadInvoiceIntent(state);
    const urlParams = getLoadInvoiceUrlParams(state);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadAccountAfterCreate: ({ id, onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_ACCOUNT_AFTER_CREATE;
    const urlParams = getLoadAddedAccountUrlParams(state, id);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  createOrUpdateInvoice: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating ? CREATE_INVOICE_DETAIL : UPDATE_INVOICE_DETAIL;
    const urlParams = getCreateOrUpdateInvoiceUrlParams(state);
    const content = getCreateOrUpdateInvoicePayload(state);

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
    const urlParams = getDeleteInvoiceUrlParams(state);

    integration.write({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadContactAddress: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_CONTACT_ADDRESS;
    const urlParams = getLoadContactAddressUrlParams(state);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadContactAfterCreate: ({ id, onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_CONTACT_AFTER_CREATE;
    const urlParams = getLoadAddedContactUrlParams(state, id);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadPayDirect: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_PAY_DIRECT;
    const urlParams = getLoadPayDirectUrlParams(state);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  calculateLineTotals: ({
    onSuccess, onFailure,
  }) => {
    const state = store.getState();

    const urlParams = getCalculateLineTotalsUrlParams(state);
    const content = getCalculateLineTotalsContent(state);

    integration.write({
      intent: CALCULATE_LINE_TOTALS,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  calculateLineTotalsOnAmountChange: ({
    onSuccess, onFailure, index, key,
  }) => {
    const state = store.getState();

    const urlParams = getCalculateLineTotalsUrlParams(state);
    const content = getCalculateLineTotalsOnAmountChangeContent(state, {
      index,
      key,
    });

    integration.write({
      intent: CALCULATE_LINE_TOTALS_ON_AMOUNT_CHANGE,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  calculateLineTotalsOnItemChange: ({
    onSuccess, onFailure, index, itemId,
  }) => {
    const state = store.getState();

    const urlParams = getCalculateLineTotalsUrlParams(state);
    const content = getCalculateLineTotalsOnItemChangeContent(state, {
      index,
      itemId,
    });

    integration.write({
      intent: CALCULATE_LINE_TOTALS_ON_ITEM_CHANGE,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  calculateLineTotalsOnTaxInclusiveChange: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = getCalculateLineTotalsUrlParams(state);
    const content = getCalculateLineTotalsOnTaxInclusiveChangeContent(state);

    integration.write({
      intent: CALCULATE_LINE_TOTALS_ON_TAX_INCLUSIVE_CHANGE,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  sendEmail: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = SEND_EMAIL;
    const urlParams = getSendEmailUrlParams(state);
    const content = getSendEmailPayload(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
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
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  loadItemOption: ({ onSuccess, onFailure, itemId }) => {
    const state = store.getState();
    const intent = LOAD_ITEM_OPTION;
    const urlParams = getLoadItemOptionUrlParams(state, { itemId });

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadInvoiceHistory: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_INVOICE_HISTORY;
    const urlParams = getInvoiceHistoryUrlParams(state);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadAccounts: ({ onSuccess, onFailure, keywords }) => {
    const state = store.getState();
    const intent = LOAD_ACCOUNT_OPTIONS;

    integration.read({
      intent,
      params: {
        keywords,
      },
      urlParams: {
        businessId: getBusinessId(state),
      },
      onSuccess,
      onFailure,
    });
  },

  loadItems: ({ onSuccess, onFailure, keywords }) => {
    const state = store.getState();
    const intent = LOAD_ITEM_OPTIONS;

    integration.read({
      intent,
      params: {
        keywords,
      },
      urlParams: {
        businessId: getBusinessId(state),
      },
      onSuccess,
      onFailure,
    });
  },

  loadContacts: ({ onSuccess, onFailure, keywords }) => {
    const state = store.getState();
    const intent = LOAD_CONTACT_OPTIONS;

    integration.read({
      intent,
      params: {
        keywords,
      },
      urlParams: {
        businessId: getBusinessId(state),
      },
      onSuccess,
      onFailure,
    });
  },

  loadItemSellingDetails: ({ onSuccess, onFailure, itemId }) => {
    const state = store.getState();
    const intent = LOAD_ITEM_SELLING_DETAILS;
    const businessId = getBusinessId(state);
    const isTaxInclusive = getIsTaxInclusive(state);

    integration.read({
      intent,
      params: {
        isTaxInclusive,
      },
      urlParams: {
        businessId,
        itemId,
      },
      onSuccess,
      onFailure,
    });
  },
});

export default createInvoiceDetailIntegrator;
