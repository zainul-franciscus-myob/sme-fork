import {
  DELETE_PURCHASE_ORDER,
  EXPORT_PURCHASE_ORDER_PDF,
  LOAD_ABN_FROM_SUPPLIER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ITEM_DETAIL_FOR_LINE,
  LOAD_JOB_AFTER_CREATE,
  LOAD_SUPPLIER_DETAIL,
  SAVE_EMAIL_SETTINGS,
  SEND_EMAIL,
  UPLOAD_EMAIL_ATTACHMENT,
} from './PurchaseOrderIntents';
import { getBusinessId } from './selectors/purchaseOrderSelectors';
import {
  getCalculatePurchaseOrderItemChangeContent,
  getCalculatePurchaseOrderLinesUrlParams,
  getDeletePurchaseOrderUrlParams,
  getLoadAbnFromSupplierUrlParams,
  getLoadAddedAccountUrlParams,
  getLoadAddedJobUrlParams,
  getLoadPurchaseOrderIntent,
  getLoadPurchaseOrderUrlParams,
  getLoadSupplierDetailUrlParams,
  getSaveEmailSettingsContent,
  getSaveEmailSettingsUrlParams,
  getSavePurchaseOrderContent,
  getSavePurchaseOrderIntent,
  getSavePurchaseOrderUrlParams,
  getSendEmailPayload,
  getSendEmailUrlParams,
} from './selectors/PurchaseOrderIntegratorSelectors';
import {
  getExportPdfQueryParams,
  getExportPdfUrlParams,
} from './selectors/exportPdfSelectors';

const createPurchaseOrderIntegrator = (store, integration) => ({
  loadPurchaseOrder: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = getLoadPurchaseOrderIntent(state);
    const urlParams = getLoadPurchaseOrderUrlParams(state);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  deletePurchaseOrder: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = getDeletePurchaseOrderUrlParams(state);

    integration.write({
      intent: DELETE_PURCHASE_ORDER,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  savePurchaseOrder: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = getSavePurchaseOrderIntent(state);
    const urlParams = getSavePurchaseOrderUrlParams(state);
    const content = getSavePurchaseOrderContent(state);

    integration.write({
      intent,
      content,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadSupplierDetail: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = getLoadSupplierDetailUrlParams(state);

    integration.read({
      intent: LOAD_SUPPLIER_DETAIL,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadAbnFromSupplier: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_ABN_FROM_SUPPLIER;
    const urlParams = getLoadAbnFromSupplierUrlParams(state);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadItemDetailForLine: ({ index, itemId, onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = getCalculatePurchaseOrderLinesUrlParams(state);
    const content = getCalculatePurchaseOrderItemChangeContent(state, {
      index,
      itemId,
    });

    integration.write({
      intent: LOAD_ITEM_DETAIL_FOR_LINE,
      urlParams,
      content,
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

  exportPdf: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = EXPORT_PURCHASE_ORDER_PDF;
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

  loadJobAfterCreate: ({ id, onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_JOB_AFTER_CREATE;
    const urlParams = getLoadAddedJobUrlParams(state, id);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createPurchaseOrderIntegrator;
