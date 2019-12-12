import {
  CREATE_QUOTE_DETAIL,
  DELETE_QUOTE_DETAIL,
  EXPORT_QUOTE_PDF,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_ADDRESS,
  LOAD_CONTACT_AFTER_CREATE,
  LOAD_ITEM_AFTER_CREATE,
  SEND_EMAIL,
  UPDATE_QUOTE_DETAIL,
  UPLOAD_EMAIL_ATTACHMENT,
} from '../QuoteIntents';
import {
  getCreateOrUpdateQuotePayload,
  getCreateOrUpdateQuoteUrlParams,
  getDeleteQuoteUrlParams,
  getExportPdfQuoteParams,
  getExportPdfQuoteUrlParams,
  getLoadAccountAfterCreateUrlParams,
  getLoadContactAddressUrlParams,
  getLoadContactAfterCreateUrlParams,
  getLoadItemAfterCreateUrlParams,
  getLoadQuoteIntent,
  getLoadQuoteQueryParams,
  getLoadQuoteUrlParams,
  getQuoteItemCalculatedLinesUrlParams,
  getSendEmailPayload,
  getSendEmailUrlParams,
  getUploadEmailAttachmentUrlParams,
} from './selectors/IntegratorSelectors';
import { getIsCreating } from './selectors/QuoteDetailSelectors';

const createQuoteDetailIntegrator = (store, integration) => ({
  loadQuote: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = getLoadQuoteIntent(state);
    const urlParams = getLoadQuoteUrlParams(state);
    const params = getLoadQuoteQueryParams(state);

    integration.read({
      intent, urlParams, params, onSuccess, onFailure,
    });
  },

  createOrUpdateQuote: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating ? CREATE_QUOTE_DETAIL : UPDATE_QUOTE_DETAIL;
    const urlParams = getCreateOrUpdateQuoteUrlParams(state);
    const content = getCreateOrUpdateQuotePayload(state);

    integration.write({
      intent, urlParams, content, onSuccess, onFailure,
    });
  },

  deleteQuote: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = DELETE_QUOTE_DETAIL;
    const urlParams = getDeleteQuoteUrlParams(state);

    integration.write({
      intent, urlParams, onSuccess, onFailure,
    });
  },

  getQuoteCalculatedLines: ({
    intent, content, onSuccess, onFailure,
  }) => {
    const state = store.getState();
    const urlParams = getQuoteItemCalculatedLinesUrlParams(state);

    integration.write({
      intent, urlParams, content, onSuccess, onFailure,
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
    const urlParams = getLoadContactAfterCreateUrlParams(state, id);

    integration.read({
      intent, urlParams, onSuccess, onFailure,
    });
  },

  loadAccountAfterCreate: ({ id, onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_ACCOUNT_AFTER_CREATE;
    const urlParams = getLoadAccountAfterCreateUrlParams(state, id);

    integration.read({
      intent, urlParams, onSuccess, onFailure,
    });
  },

  loadItemAfterCreate: ({ id, onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_ITEM_AFTER_CREATE;
    const urlParams = getLoadItemAfterCreateUrlParams(state, id);

    integration.read({
      intent, urlParams, onSuccess, onFailure,
    });
  },

  sentEmail: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = SEND_EMAIL;
    const urlParams = getSendEmailUrlParams(state);
    const content = getSendEmailPayload(state);

    integration.write({
      intent, urlParams, content, onSuccess, onFailure,
    });
  },

  uploadEmailAttachment: ({
    file, onSuccess, onFailure, onProgress,
  }) => {
    const state = store.getState();

    const intent = UPLOAD_EMAIL_ATTACHMENT;
    const urlParams = getUploadEmailAttachmentUrlParams(state);
    const content = { file };

    integration.writeFormData({
      intent, content, urlParams, onSuccess, onFailure, onProgress,
    });
  },

  exportQuotePdf: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = getExportPdfQuoteUrlParams(state);
    const params = getExportPdfQuoteParams(state);

    integration.readFile({
      intent: EXPORT_QUOTE_PDF,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
});

export default createQuoteDetailIntegrator;
