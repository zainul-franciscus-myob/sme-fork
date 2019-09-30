import {
  CREATE_BILL_SERVICE_DETAIL,
  GET_CALCULATED_BILL_DETAIL_TOTALS,
  PREFILL_NEW_BILL_SERVICE_FROM_IN_TRAY,
  UPDATE_BILL_SERVICE_DETAIL,
} from './BillServiceIntents';
import {
  DELETE_BILL_DETAIL,
  LOAD_SUPPLIER_ADDRESS,
} from '../../BillIntents';
import {
  getBillId, getBillPayload, getBusinessId, getCalculatedTotalsPayload, getContactId,
  getInTrayDocumentId,
} from './billServiceSelectors';

const createBillServiceIntegrator = (store, integration) => ({
  getCalculatedTotals: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = GET_CALCULATED_BILL_DETAIL_TOTALS;

    integration.write({
      intent,
      urlParams: { businessId: getBusinessId(state) },
      content: getCalculatedTotalsPayload(state),
      onSuccess,
      onFailure,
    });
  },

  loadSupplierAddress: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      supplierId: getContactId(state),
    };

    integration.read({
      intent: LOAD_SUPPLIER_ADDRESS,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  prefillDataFromInTray({ onSuccess, onFailure }) {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      inTrayDocumentId: getInTrayDocumentId(state),
    };

    integration.read({
      intent: PREFILL_NEW_BILL_SERVICE_FROM_IN_TRAY,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  deleteBillEntry: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const billId = getBillId(state);
    const urlParams = {
      businessId: getBusinessId(state),
      billId,
    };

    integration.write({
      intent: DELETE_BILL_DETAIL,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  createBillServiceEntry: ({ onSuccess, onFailure }) => {
    const intent = CREATE_BILL_SERVICE_DETAIL;
    const state = store.getState();
    const content = getBillPayload(state);

    const urlParams = {
      businessId: getBusinessId(state),
    };

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  updateBillServiceEntry: ({ onSuccess, onFailure }) => {
    const intent = UPDATE_BILL_SERVICE_DETAIL;
    const state = store.getState();
    const billId = getBillId(state);
    const content = getBillPayload(state);

    const urlParams = {
      businessId: getBusinessId(state),
      billId,
    };

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createBillServiceIntegrator;
