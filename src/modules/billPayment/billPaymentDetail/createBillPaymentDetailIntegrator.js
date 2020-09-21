import {
  DELETE_BILL_PAYMENT,
  LOAD_BILL_LIST,
  LOAD_SUPPLIER_STATEMENT_TEXT,
  UPDATE_REFERENCE_ID,
} from '../BillPaymentIntents';
import {
  getBillPaymentUrlParams,
  getLoadBillListParams,
  getLoadBillPaymentIntent,
  getLoadSupplierStatementTextUrlParams,
  getSaveBillPaymentIntent,
  getSaveBillPaymentPayload,
  getUpdateReferenceIdParams,
  getUpdateReferenceIdUrlParams,
} from './BillPaymentDetailSelectors';

const createBillPaymentDetailIntegrator = (store, integration) => ({
  saveBillPayment: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.write({
      intent: getSaveBillPaymentIntent(state),
      urlParams: getBillPaymentUrlParams(state),
      content: getSaveBillPaymentPayload(state),
      onSuccess,
      onFailure,
    });
  },
  deleteBillPayment: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.write({
      intent: DELETE_BILL_PAYMENT,
      urlParams: getBillPaymentUrlParams(state),
      onSuccess,
      onFailure,
    });
  },
  loadBillList: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.read({
      intent: LOAD_BILL_LIST,
      ...getLoadBillListParams(state),
      onSuccess,
      onFailure,
    });
  },
  loadBillPayment: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.read({
      intent: getLoadBillPaymentIntent(state),
      urlParams: getBillPaymentUrlParams(state),
      onSuccess,
      onFailure,
    });
  },
  updateReferenceId: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.read({
      intent: UPDATE_REFERENCE_ID,
      urlParams: getUpdateReferenceIdUrlParams(state),
      params: getUpdateReferenceIdParams(state),
      onSuccess,
      onFailure,
    });
  },
  loadSupplierStatementText: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.read({
      intent: LOAD_SUPPLIER_STATEMENT_TEXT,
      urlParams: getLoadSupplierStatementTextUrlParams(state),
      onSuccess,
      onFailure,
    });
  },
});

export default createBillPaymentDetailIntegrator;
