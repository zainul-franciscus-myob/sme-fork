import {
  LOAD_ACCOUNTS_AND_TRANSACTIONS,
  RECORD_AND_DOWNLOAD_BANK_FILE,
  SORT_AND_FILTER_TRANSACTIONS,
} from '../../modules/electronicPayments/electronicPaymentsCreate/ElectronicPaymentsCreateIntents';
import filterElectronicPaySummaryList from '../data/electronicPaymentsCreate/filterElectronicPaySummaryList';
import loadAccountsAndElectronicPayments from '../data/electronicPaymentsCreate/loadAccountsAndElectronicPayments';
import recordElectronicPaymentsAndDownloadBankFile from '../data/electronicPayments/recordElectronicPaymentsAndDownloadBankFile';

const ElectronicPaymentsCreateMapping = {
  [LOAD_ACCOUNTS_AND_TRANSACTIONS]:
    ({ onSuccess }) => onSuccess(loadAccountsAndElectronicPayments),
  [SORT_AND_FILTER_TRANSACTIONS]:
    ({ onSuccess }) => onSuccess(filterElectronicPaySummaryList),
  [RECORD_AND_DOWNLOAD_BANK_FILE]:
    ({ onSuccess }) => onSuccess(recordElectronicPaymentsAndDownloadBankFile),
};

export default ElectronicPaymentsCreateMapping;
