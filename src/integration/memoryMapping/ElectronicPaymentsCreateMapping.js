import {
  LOAD_ACCOUNTS_AND_ELECTRONIC_PAYMENTS,
  RECORD_AND_DOWNLOAD_BANK_FILE,
  SORT_AND_FILTER_ELECTRONIC_PAYMENTS,
} from '../../electronicPayments/ElectronicPaymentsIntents';
import filterElectronicPaySummaryList from '../data/electronicPaymentsCreate/filterElectronicPaySummaryList';
import loadAccountsAndElectronicPayments from '../data/electronicPaymentsCreate/loadAccountsAndElectronicPayments';
import recordElectronicPaymentsAndDownloadBankFile from '../data/electronicPayments/recordElectronicPaymentsAndDownloadBankFile';

const ElectronicPaymentsCreateMapping = {
  [LOAD_ACCOUNTS_AND_ELECTRONIC_PAYMENTS]:
    ({ onSuccess }) => onSuccess(loadAccountsAndElectronicPayments),
  [SORT_AND_FILTER_ELECTRONIC_PAYMENTS]:
    ({ onSuccess }) => onSuccess(filterElectronicPaySummaryList),
  [RECORD_AND_DOWNLOAD_BANK_FILE]:
    ({ onSuccess }) => onSuccess(recordElectronicPaymentsAndDownloadBankFile),
};

export default ElectronicPaymentsCreateMapping;
