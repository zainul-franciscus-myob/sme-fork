import {
  DELETE_BILL,
  DOWNLOAD_IN_TRAY_DOCUMENT,
  EXPORT_BILL_PDF,
  LINK_IN_TRAY_DOCUMENT,
  LOAD_ABN_FROM_SUPPLIER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ITEM_DETAIL_FOR_LINE,
  LOAD_ITEM_OPTION,
  LOAD_JOB_AFTER_CREATE,
  LOAD_SUPPLIER_AFTER_CREATE,
  LOAD_SUPPLIER_DETAIL,
  PREFILL_BILL_FROM_IN_TRAY,
  UNLINK_IN_TRAY_DOCUMENT,
} from './BillIntents';
import { getBusinessId } from './selectors/billSelectors';
import {
  getCalculateBillItemChangeContent,
  getCalculateBillLinesUrlParams,
  getDeleteBillUrlParams,
  getInTrayDocumentParams,
  getInTrayDocumentUrlParams,
  getLoadAbnFromSupplierUrlParams,
  getLoadAddedAccountUrlParams,
  getLoadAddedJobUrlParams,
  getLoadBillIntent,
  getLoadBillUrlParams,
  getLoadItemOptionUrlParams,
  getLoadSupplierDetailUrlParams,
  getLoadSupplierUrlParams,
  getSaveBillContent,
  getSaveBillIntent,
  getSaveBillUrlParams,
  getUnlinkInTrayDocumentParams,
  getUnlinkInTrayDocumentUrlParams,
} from './selectors/BillIntegratorSelectors';
import {
  getExportPdfQueryParams,
  getExportPdfUrlParams,
} from './selectors/exportPdfSelectors';

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

  loadSupplierAfterCreate: ({ id, onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_SUPPLIER_AFTER_CREATE;
    const urlParams = getLoadSupplierUrlParams(state, id);

    integration.read({
      intent,
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
    const urlParams = getCalculateBillLinesUrlParams(state);
    const content = getCalculateBillItemChangeContent(state, { index, itemId });

    integration.write({
      intent: LOAD_ITEM_DETAIL_FOR_LINE,
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

  downloadDocument: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.readFile({
      intent: DOWNLOAD_IN_TRAY_DOCUMENT,
      urlParams: getInTrayDocumentUrlParams(state),
      params: getInTrayDocumentParams(state),
      onSuccess,
      onFailure,
    });
  },

  unlinkInTrayDocument: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.write({
      intent: UNLINK_IN_TRAY_DOCUMENT,
      urlParams: getUnlinkInTrayDocumentUrlParams(state),
      params: getUnlinkInTrayDocumentParams(state),
      onSuccess,
      onFailure,
    });
  },

  linkInTrayDocument: ({ onSuccess, onFailure, linkContent }) => {
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
