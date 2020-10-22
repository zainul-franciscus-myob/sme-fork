import {
  DELETE_BILL_PAYMENT,
  EXPORT_PDF,
  LOAD_BILL_LIST,
  LOAD_SUPPLIER_DETAILS,
  SEND_EMAIL,
  UPDATE_REFERENCE_ID,
} from '../BillPaymentIntents';
import {
  getLoadBillPaymentIntent,
  getLoadBillPaymentParams,
  getLoadBillPaymentUrlParams,
  getLoadSupplierDetailsParams,
  getLoadSupplierDetailsUrlParams,
  getRemittanceAdviceDetails,
  getRemittanceAdviceEmailContent,
  getRemittanceAdviceUrlParams,
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
      urlParams: getLoadBillPaymentUrlParams(state),
      content: getSaveBillPaymentPayload(state),
      onSuccess,
      onFailure,
    });
  },
  deleteBillPayment: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.write({
      intent: DELETE_BILL_PAYMENT,
      urlParams: getLoadBillPaymentUrlParams(state),
      onSuccess,
      onFailure,
    });
  },
  sendRemittanceAdviceEmail: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.write({
      intent: SEND_EMAIL,
      urlParams: getRemittanceAdviceUrlParams(state),
      content: getRemittanceAdviceEmailContent(state),
      onSuccess,
      onFailure,
    });
  },
  exportRemittanceAdvicePdf: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.readFile({
      intent: EXPORT_PDF,
      urlParams: getRemittanceAdviceUrlParams(state),
      params: { formName: getRemittanceAdviceDetails(state).templateName },
      onSuccess,
      onFailure,
    });
  },
  loadBillPayment: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    integration.read({
      intent: getLoadBillPaymentIntent(state),
      urlParams: getLoadBillPaymentUrlParams(state),
      params: getLoadBillPaymentParams(state),
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
  loadSupplierDetails: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.read({
      intent: LOAD_SUPPLIER_DETAILS,
      urlParams: getLoadSupplierDetailsUrlParams(state),
      params: getLoadSupplierDetailsParams(state),
      onSuccess,
      onFailure,
    });
  },
  loadBillList: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.read({
      intent: LOAD_BILL_LIST,
      urlParams: getLoadSupplierDetailsUrlParams(state),
      params: getLoadSupplierDetailsParams(state),
      onSuccess,
      onFailure,
    });
  },
});

export default createBillPaymentDetailIntegrator;
