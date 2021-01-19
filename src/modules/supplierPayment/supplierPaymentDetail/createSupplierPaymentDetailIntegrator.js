import {
  DELETE_SUPPLIER_PAYMENT,
  EXPORT_PDF,
  LOAD_PURCHASE_LIST,
  LOAD_SUPPLIER_PURCHASE_LIST,
  SEND_EMAIL,
  UPDATE_REFERENCE_ID,
} from '../SupplierPaymentIntents';
import {
  getLoadSupplierDetailsParams,
  getLoadSupplierDetailsUrlParams,
  getLoadSupplierPaymentIntent,
  getLoadSupplierPaymentParams,
  getLoadSupplierPaymentUrlParams,
  getRemittanceAdviceDetails,
  getRemittanceAdviceEmailContent,
  getRemittanceAdviceUrlParams,
  getSaveSupplierPaymentIntent,
  getSaveSupplierPaymentPayload,
  getUpdateReferenceIdParams,
  getUpdateReferenceIdUrlParams,
} from './SupplierPaymentDetailSelectors';

const createSupplierPaymentDetailIntegrator = (store, integration) => ({
  saveSupplierPayment: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.write({
      intent: getSaveSupplierPaymentIntent(state),
      urlParams: getLoadSupplierPaymentUrlParams(state),
      content: getSaveSupplierPaymentPayload(state),
      onSuccess,
      onFailure,
    });
  },
  deleteSupplierPayment: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.write({
      intent: DELETE_SUPPLIER_PAYMENT,
      urlParams: getLoadSupplierPaymentUrlParams(state),
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
  loadSupplierPayment: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    integration.read({
      intent: getLoadSupplierPaymentIntent(state),
      urlParams: getLoadSupplierPaymentUrlParams(state),
      params: getLoadSupplierPaymentParams(state),
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
  loadSupplierPurchaseList: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.read({
      intent: LOAD_SUPPLIER_PURCHASE_LIST,
      urlParams: getLoadSupplierDetailsUrlParams(state),
      params: getLoadSupplierDetailsParams(state),
      onSuccess,
      onFailure,
    });
  },
  loadPurchaseList: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.read({
      intent: LOAD_PURCHASE_LIST,
      urlParams: getLoadSupplierDetailsUrlParams(state),
      params: getLoadSupplierDetailsParams(state),
      onSuccess,
      onFailure,
    });
  },
});

export default createSupplierPaymentDetailIntegrator;
