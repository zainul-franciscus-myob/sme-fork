import {
  DELETE_ELECTRONIC_PAYMENT, LOAD_ELECTRONIC_PAYMENT_DETAILS,
} from '../../electronicPayments/electronicPaymentsRead/ElectronicPaymentsReadIntents';
import loadElectronicPaymentDetails from '../data/electronicPaymentsRead/loadElectronicPaymentDetails';

const ElectronicPaymentsReadMapping = {
  [LOAD_ELECTRONIC_PAYMENT_DETAILS]:
    ({ onSuccess }) => onSuccess(loadElectronicPaymentDetails),
  [DELETE_ELECTRONIC_PAYMENT]: ({ onSuccess }) => onSuccess({}),
};

export default ElectronicPaymentsReadMapping;
