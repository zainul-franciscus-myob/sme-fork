import {
  LOAD_ELECTRONIC_PAYMENT_DETAILS,
} from '../../electronicPayments/electronicPaymentsRead/ElectronicPaymentsReadIntents';
import {
  SORT_AND_FILTER_ELECTRONIC_PAYMENTS,
} from '../../electronicPayments/ElectronicPaymentsIntents';

const ElectronicPaymentsCreateMapping = {
  [LOAD_ELECTRONIC_PAYMENT_DETAILS]: {
    method: 'GET',
    getPath: ({ businessId, electronicPaymentId }) => `/${businessId}/electronicPayments/load_electronic_payments/${electronicPaymentId}`,
  },
  [SORT_AND_FILTER_ELECTRONIC_PAYMENTS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/electronicPayments/sort_and_filter_transactions`,
  },
};

export default ElectronicPaymentsCreateMapping;
