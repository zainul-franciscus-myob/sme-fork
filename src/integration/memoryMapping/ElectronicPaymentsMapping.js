import {
  LOAD_ACCOUNTS_AND_ELECTRONIC_PAYMENTS,
  RECORD_AND_DOWNLOAD_BANK_FILE,
  SORT_AND_FILTER_ELECTRONIC_PAYMENTS,
} from '../../electronicPayments/ElectronicPaymentsIntents';
import filterElectronicPaySummaryList from '../data/electronicPayments/filterElectronicPaySummaryList';
import loadAccountsAndElectronicPayments from '../data/electronicPayments/loadAccountsAndElectronicPayments';
import successResponse from '../data/success.json';

const ElectronicPaymentsMapping = {
  [LOAD_ACCOUNTS_AND_ELECTRONIC_PAYMENTS]:
    ({ onSuccess }) => onSuccess(loadAccountsAndElectronicPayments),
  [SORT_AND_FILTER_ELECTRONIC_PAYMENTS]:
    ({ onSuccess }) => onSuccess(filterElectronicPaySummaryList),
  [RECORD_AND_DOWNLOAD_BANK_FILE]:
    ({ onSuccess }) => onSuccess(successResponse),
};

export default ElectronicPaymentsMapping;
