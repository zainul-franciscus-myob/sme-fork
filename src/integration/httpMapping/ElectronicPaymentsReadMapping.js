import {
  DELETE_ELECTRONIC_PAYMENT,
  LOAD_ELECTRONIC_PAYMENT_DETAILS,
} from '../../modules/electronicPayments/electronicPaymentsRead/ElectronicPaymentsReadIntents';

const ElectronicPaymentsCreateMapping = {
  [LOAD_ELECTRONIC_PAYMENT_DETAILS]: {
    method: 'GET',
    getPath: ({ businessId, electronicPaymentId }) => `/${businessId}/electronicPayments/load_electronic_payments/${electronicPaymentId}`,
  },
  [DELETE_ELECTRONIC_PAYMENT]: {
    method: 'DELETE',
    getPath: ({ businessId, electronicPaymentId }) => `/${businessId}/electronicPayments/delete_electronic_payments/${electronicPaymentId}`,
  },
};

export default ElectronicPaymentsCreateMapping;
