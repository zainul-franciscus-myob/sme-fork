import {
  DELETE_BILL,
  DOWNLOAD_IN_TRAY_DOCUMENT,
  EXPORT_BILL_PDF,
  ITEM_CALCULATE_REMOVE_LINE,
  ITEM_CALCULATE_UPDATE_AMOUNT_PAID,
  ITEM_CALCULATE_UPDATE_IS_TAX_INCLUSIVE,
  ITEM_CALCULATE_UPDATE_LINE_AMOUNT,
  ITEM_CALCULATE_UPDATE_LINE_ITEM,
  ITEM_CALCULATE_UPDATE_LINE_TAX_CODE,
  LINK_IN_TRAY_DOCUMENT,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_IN_TRAY_DOCUMENT,
  LOAD_ITEM_OPTION,
  LOAD_SUPPLIER_ADDRESS,
  LOAD_SUPPLIER_AFTER_CREATE,
  PREFILL_BILL_FROM_IN_TRAY,
  SERVICE_CALCULATE,
  UNLINK_IN_TRAY_DOCUMENT,
} from './BillIntents';
import { getBusinessId } from './selectors/billSelectors';
import {
  getDeleteBillUrlParams,
  getInTrayDocumentUrlParams,
  getItemCalculateContent,
  getItemCalculateContentForUpdateLineAmount,
  getItemCalculateContentForUpdateLineItem,
  getItemCalculateUrlParams,
  getLoadAddedAccountUrlParams,
  getLoadBillIntent,
  getLoadBillUrlParams,
  getLoadItemOptionUrlParams,
  getLoadSupplierAddressUrlParams,
  getLoadSupplierUrlParams,
  getSaveBillContent,
  getSaveBillIntent,
  getSaveBillUrlParams,
  getServiceCalculateContent,
  getServiceCalculateUrlParams,
} from './selectors/BillIntegratorSelectors';
import { getExportPdfQueryParams, getExportPdfUrlParams } from './selectors/exportPdfSelectors';

const createBillIntegrator = (store, integration) => ({
  loadBill: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = getLoadBillIntent(state);
    const urlParams = getLoadBillUrlParams(state);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  deleteBill: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = getDeleteBillUrlParams(state);

    integration.write({
      intent: DELETE_BILL,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  saveBill: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = getSaveBillIntent(state);
    const urlParams = getSaveBillUrlParams(state);
    const content = getSaveBillContent(state);

    integration.write({
      intent,
      content,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  serviceCalculate: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = getServiceCalculateUrlParams(state);
    const content = getServiceCalculateContent(state);

    integration.write({
      intent: SERVICE_CALCULATE,
      content,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadSupplierAddress: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = getLoadSupplierAddressUrlParams(state);

    integration.read({
      intent: LOAD_SUPPLIER_ADDRESS,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadSupplierAfterCreate: ({ id, onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_SUPPLIER_AFTER_CREATE;
    const urlParams = getLoadSupplierUrlParams(state, id);

    integration.read({
      intent, urlParams, onSuccess, onFailure,
    });
  },

  itemCalculateUpdateLineItem: ({
    index, itemId, onSuccess, onFailure,
  }) => {
    const state = store.getState();
    const urlParams = getItemCalculateUrlParams(state);
    const content = getItemCalculateContentForUpdateLineItem(state, { index, itemId });

    integration.write({
      intent: ITEM_CALCULATE_UPDATE_LINE_ITEM,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  itemCalculateRemoveLine: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = getItemCalculateUrlParams(state);
    const content = getItemCalculateContent(state);

    integration.write({
      intent: ITEM_CALCULATE_REMOVE_LINE,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  itemCalculateUpdateIsTaxInclusive: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = getItemCalculateUrlParams(state);
    const content = getItemCalculateContent(state);

    integration.write({
      intent: ITEM_CALCULATE_UPDATE_IS_TAX_INCLUSIVE,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  itemCalculateUpdateLineTaxCode: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = getItemCalculateUrlParams(state);
    const content = getItemCalculateContent(state);

    integration.write({
      intent: ITEM_CALCULATE_UPDATE_LINE_TAX_CODE,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  itemCalculateUpdateLineAmount: ({
    onSuccess, onFailure, index, key,
  }) => {
    const state = store.getState();
    const urlParams = getItemCalculateUrlParams(state);
    const content = getItemCalculateContentForUpdateLineAmount(state, { index, key });

    integration.write({
      intent: ITEM_CALCULATE_UPDATE_LINE_AMOUNT,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  itemCalculateUpdateAmountPaid: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = getItemCalculateUrlParams(state);
    const content = getItemCalculateContent(state);

    integration.write({
      intent: ITEM_CALCULATE_UPDATE_AMOUNT_PAID,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  prefillDataFromInTray: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = getInTrayDocumentUrlParams(state);

    integration.read({
      intent: PREFILL_BILL_FROM_IN_TRAY,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  exportPdf: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = EXPORT_BILL_PDF;
    const urlParams = getExportPdfUrlParams(state);
    const params = getExportPdfQueryParams(state);

    integration.readFile({
      intent, urlParams, params, onSuccess, onFailure,
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

  loadAccountAfterCreate: ({ id, onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_ACCOUNT_AFTER_CREATE;
    const urlParams = getLoadAddedAccountUrlParams(state, id);

    integration.read({
      intent, urlParams, onSuccess, onFailure,
    });
  },

  downloadDocument: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.readFile({
      intent: DOWNLOAD_IN_TRAY_DOCUMENT,
      urlParams: getInTrayDocumentUrlParams(state),
      onSuccess,
      onFailure,
    });
  },

  unlinkInTrayDocument: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.write({
      intent: UNLINK_IN_TRAY_DOCUMENT,
      urlParams: getInTrayDocumentUrlParams(state),
      onSuccess,
      onFailure,
    });
  },

  loadInTrayDocument: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.read({
      intent: LOAD_IN_TRAY_DOCUMENT,
      urlParams: getInTrayDocumentUrlParams(state),
      onSuccess,
      onFailure,
    });
  },

  linkInTrayDocument: ({
    onSuccess, onFailure, linkContent,
  }) => {
    const state = store.getState();

    integration.write({
      intent: LINK_IN_TRAY_DOCUMENT,
      content: linkContent,
      urlParams: {
        businessId: getBusinessId(state),
      },
      onSuccess,
      onFailure,
    });
  },
});

export default createBillIntegrator;
