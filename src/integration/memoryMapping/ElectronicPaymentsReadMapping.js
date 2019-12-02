import {
  LOAD_ELECTRONIC_PAYMENT_DETAILS,
} from '../../electronicPayments/electronicPaymentsRead/ElectronicPaymentsReadIntents';
import {
  SORT_AND_FILTER_ELECTRONIC_PAYMENTS,
} from '../../electronicPayments/ElectronicPaymentsIntents';
import filterElectronicPaySummaryList from '../data/electronicPaymentsCreate/filterElectronicPaySummaryList';
import loadElectronicPaymentDetails from '../data/electronicPaymentsRead/loadElectronicPaymentDetails';

const ElectronicPaymentsReadMapping = {
  [LOAD_ELECTRONIC_PAYMENT_DETAILS]:
    ({ onSuccess }) => onSuccess(loadElectronicPaymentDetails),
  [SORT_AND_FILTER_ELECTRONIC_PAYMENTS]:
    ({ onSuccess }) => onSuccess(filterElectronicPaySummaryList),
};

export default ElectronicPaymentsReadMapping;
