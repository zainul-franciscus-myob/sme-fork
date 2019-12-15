import {
  DELETE_ELECTRONIC_PAYMENT,
  LOAD_ELECTRONIC_PAYMENT_DETAILS,
} from './ElectronicPaymentsReadIntents';
import { getBusinessId, getElectronicPaymentId } from './ElectronicPaymentsReadSelector';

const createElectronicPaymentsReadIntegrator = (store, integration) => ({
  loadElectronicPaymentDetails: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      electronicPaymentId: getElectronicPaymentId(state),
    };

    integration.read({
      intent: LOAD_ELECTRONIC_PAYMENT_DETAILS,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  deleteElectronicPayment: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      electronicPaymentId: getElectronicPaymentId(state),
    };

    integration.write({
      intent: DELETE_ELECTRONIC_PAYMENT,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createElectronicPaymentsReadIntegrator;
