import {
  DELETE_ELECTRONIC_PAYMENT, LOAD_ELECTRONIC_PAYMENT_DETAILS,
} from '../ElectronicPaymentsReadIntents';
import loadElectronicPaymentDetails from './data/loadElectronicPaymentDetails';

const MemoryElectronicPaymentsReadMapping = {
  [LOAD_ELECTRONIC_PAYMENT_DETAILS]:
    ({ onSuccess }) => onSuccess(loadElectronicPaymentDetails),
  [DELETE_ELECTRONIC_PAYMENT]: ({ onSuccess }) => onSuccess({}),
};

export default MemoryElectronicPaymentsReadMapping;
