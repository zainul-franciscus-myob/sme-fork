import {
  LOAD_ACCOUNTS_AND_TRANSACTIONS,
  RECORD_AND_DOWNLOAD_BANK_FILE,
  SORT_AND_FILTER_TRANSACTIONS,
} from '../ElectronicPaymentsCreateIntents';
import filterElectronicPaySummaryList from './data/filterElectronicPaySummaryList';
import loadAccountsAndElectronicPayments from './data/loadAccountsAndElectronicPayments';
import recordElectronicPaymentsAndDownloadBankFile from './data/recordElectronicPaymentsAndDownloadBankFile';

const MemoryElectronicPaymentsCreateMapping = {
  [LOAD_ACCOUNTS_AND_TRANSACTIONS]: ({ onSuccess }) =>
    onSuccess(loadAccountsAndElectronicPayments),
  [SORT_AND_FILTER_TRANSACTIONS]: ({ onSuccess }) =>
    onSuccess(filterElectronicPaySummaryList),
  [RECORD_AND_DOWNLOAD_BANK_FILE]: ({ onSuccess }) =>
    onSuccess(recordElectronicPaymentsAndDownloadBankFile),
};

export default MemoryElectronicPaymentsCreateMapping;
