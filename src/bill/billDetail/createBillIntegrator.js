import {
  DELETE_BILL,
  ITEM_CALCULATE_REMOVE_LINE,
  ITEM_CALCULATE_UPDATE_IS_TAX_INCLUSIVE,
  ITEM_CALCULATE_UPDATE_LINE_AMOUNT,
  ITEM_CALCULATE_UPDATE_LINE_ITEM,
  ITEM_CALCULATE_UPDATE_LINE_TAX_CODE,
  LOAD_SUPPLIER_ADDRESS,
  PREFILL_NEW_BILL_FROM_IN_TRAY,
  SERVICE_CALCULATE,
} from './BillIntents';
import {
  getDeleteBillUrlParams,
  getItemCalculateContent,
  getItemCalculateContentForUpdateLineAmount,
  getItemCalculateContentForUpdateLineItem,
  getItemCalculateUrlParams,
  getLoadBillIntent,
  getLoadBillUrlParams,
  getLoadSupplierAddressUrlParams,
  getPrefillNewBillFromInTrayUrlParams,
  getSaveBillContent,
  getSaveBillIntent,
  getSaveBillUrlParams,
  getServiceCalculateContent,
  getServiceCalculateUrlParams,
} from './selectors/BillIntegratorSelectors';

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

  prefillDataFromInTray({ onSuccess, onFailure }) {
    const state = store.getState();
    const urlParams = getPrefillNewBillFromInTrayUrlParams(state);

    integration.read({
      intent: PREFILL_NEW_BILL_FROM_IN_TRAY,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createBillIntegrator;
