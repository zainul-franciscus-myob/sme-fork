import {
  CREATE_BILL,
  UPDATE_BILL,
} from './BillItemIntents';
import {
  DELETE_BILL_DETAIL,
  LOAD_SUPPLIER_ADDRESS,
} from '../../BillIntents';
import {
  getBillId, getBillPayload, getBusinessId, getSupplierId,
} from './billItemSelectors';

const createBillItemIntegrator = (store, integration) => ({
  createBill: ({ onSuccess, onFailure }) => {
    const intent = CREATE_BILL;
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

  updateBill: ({ onSuccess, onFailure }) => {
    const intent = UPDATE_BILL;
    const state = store.getState();
    const content = getBillPayload(state);

    const urlParams = {
      businessId: getBusinessId(state),
      billId: getBillId(state),
    };

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  deleteBill: ({ onSuccess, onFailure }) => {
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

  loadSupplierAddress: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      supplierId: getSupplierId(state),
    };

    integration.read({
      intent: LOAD_SUPPLIER_ADDRESS,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  updateLines: ({
    content, intent, onSuccess, onFailure,
  }) => {
    const state = store.getState();
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
});

export default createBillItemIntegrator;
