import {
  DELETE_ELECTRONIC_PAYMENT,
  LOAD_ELECTRONIC_PAYMENT_DETAILS,
} from '../ElectronicPaymentsReadIntents';

const HttpElectronicPaymentsReadMapping = {
  [LOAD_ELECTRONIC_PAYMENT_DETAILS]: {
    method: 'GET',
    getPath: ({ businessId, electronicPaymentId }) =>
      `/${businessId}/electronicPayments/load_electronic_payments/${electronicPaymentId}`,
  },
  [DELETE_ELECTRONIC_PAYMENT]: {
    method: 'DELETE',
    getPath: ({ businessId, electronicPaymentId }) =>
      `/${businessId}/electronicPayments/delete_electronic_payments/${electronicPaymentId}`,
  },
};

export default HttpElectronicPaymentsReadMapping;
