import {
  CREATE_INVOICE_DETAIL,
  CREATE_PRE_CONVERSION_INVOICE_DETAIL,
  DELETE_INVOICE_DETAIL,
  DELETE_PRE_CONVERSION_INVOIVE_DETAIL,
  EXPORT_INVOICE_PDF,
  LOAD_ABN_FROM_CUSTOMER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ACCOUNT_OPTIONS,
  LOAD_CUSTOMER,
  LOAD_CUSTOMER_QUOTES,
  LOAD_INVOICE_HISTORY,
  LOAD_ITEM_SELLING_DETAILS,
  LOAD_PAYMENT_SETTINGS,
  LOAD_PAY_DIRECT,
  LOAD_PREFILL_FROM_RECURRING_INVOICE,
  SAVE_EMAIL_SETTINGS,
  SAVE_PAYMENT_OPTIONS,
  SEND_EINVOICE,
  SEND_EMAIL,
  UPDATE_INVOICE_DETAIL,
  UPDATE_PRE_CONVERSION_INVOICE_DETAIL,
  UPLOAD_EMAIL_ATTACHMENT,
} from '../InvoiceIntents';
import {
  getBusinessId,
  getCustomerId,
  getIsCreating,
  getIsTaxInclusive,
} from './selectors/invoiceDetailSelectors';
import {
  getCreateOrUpdateInvoicePayload,
  getCreateOrUpdateInvoiceUrlParams,
  getCreateOrUpdatePreConversionPayload,
  getCreateOrUpdatePreConversionUrlParams,
  getDeleteInvoiceUrlParams,
  getDeletePreConversionInvoiceUrlParams,
  getInvoiceHistoryUrlParams,
  getLoadAbnFromCustomerUrlParams,
  getLoadAddedAccountUrlParams,
  getLoadCustomerUrlParams,
  getLoadInvoiceIntent,
  getLoadInvoiceUrlParams,
  getLoadPayDirectUrlParams,
  getLoadPrefillFromRecurringInvoiceUrlParams,
  getSavePaymentOptionsPayload,
  getSavePaymentOptionsUrlParams,
} from './selectors/integratorSelectors';
import { getExportPdfUrlParams } from './selectors/exportPdfSelectors';
import {
  getSaveEmailSettingsContent,
  getSaveEmailSettingsUrlParams,
  getSendEmailPayload,
  getSendEmailUrlParams,
} from './selectors/emailSelectors';
import {
  getSendEInvoicePayload,
  getSendEInvoiceUrlParams,
} from './selectors/eInvoiceSelectors';

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

  createOrUpdatePreConversionInvoice: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating
      ? CREATE_PRE_CONVERSION_INVOICE_DETAIL
      : UPDATE_PRE_CONVERSION_INVOICE_DETAIL;
    const urlParams = getCreateOrUpdatePreConversionUrlParams(state);
    const content = getCreateOrUpdatePreConversionPayload(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  deletePreConversionInvoice: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = DELETE_PRE_CONVERSION_INVOIVE_DETAIL;
    const urlParams = getDeletePreConversionInvoiceUrlParams(state);

    integration.write({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadCustomer: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_CUSTOMER;
    const urlParams = getLoadCustomerUrlParams(state);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadAbnFromCustomer: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_ABN_FROM_CUSTOMER;
    const urlParams = getLoadAbnFromCustomerUrlParams(state);

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

  saveEmailSettings: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = SAVE_EMAIL_SETTINGS;
    const urlParams = getSaveEmailSettingsUrlParams(state);
    const content = getSaveEmailSettingsContent(state);

    integration.write({
      intent,
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

  sendEInvoice: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = SEND_EINVOICE;
    const urlParams = getSendEInvoiceUrlParams(state);
    const content = getSendEInvoicePayload(state);

    integration.writeFormData({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  uploadEmailAttachment: ({ onSuccess, onFailure, onProgress, file }) => {
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

  exportPdf: ({ template, onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = EXPORT_INVOICE_PDF;
    const urlParams = getExportPdfUrlParams(state);
    const params = {
      formName: template,
    };

    integration.readFile({
      intent,
      urlParams,
      params,
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

  loadCustomerQuotes: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_CUSTOMER_QUOTES;
    const businessId = getBusinessId(state);
    const customerId = getCustomerId(state);
    const dateTo = new Date();

    integration.read({
      intent,
      params: {
        dateTo,
      },
      urlParams: {
        businessId,
        customerId,
      },
      onSuccess,
      onFailure,
    });
  },

  loadPrefillFromRecurringInvoice: ({
    recurringTransactionId,
    onSuccess,
    onFailure,
  }) => {
    const state = store.getState();

    const intent = LOAD_PREFILL_FROM_RECURRING_INVOICE;
    const urlParams = getLoadPrefillFromRecurringInvoiceUrlParams(
      state,
      recurringTransactionId
    );

    integration.read({ intent, urlParams, onSuccess, onFailure });
  },

  loadPaymentSettings: ({ onSuccess, onFailure }) => {
    integration.read({
      intent: LOAD_PAYMENT_SETTINGS,
      urlParams: {
        businessId: getBusinessId(store.getState()),
      },
      onSuccess,
      onFailure,
    });
  },

  savePaymentOptions: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = SAVE_PAYMENT_OPTIONS;
    const content = getSavePaymentOptionsPayload(state);
    const urlParams = getSavePaymentOptionsUrlParams(state);

    integration.write({
      intent,
      content,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createInvoiceDetailIntegrator;
