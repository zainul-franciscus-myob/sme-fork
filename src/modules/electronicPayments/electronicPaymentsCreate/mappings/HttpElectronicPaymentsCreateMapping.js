import {
  LOAD_ACCOUNTS_AND_TRANSACTIONS,
  RECORD_AND_DOWNLOAD_BANK_FILE,
  SORT_AND_FILTER_TRANSACTIONS,
} from '../ElectronicPaymentsCreateIntents';

const HttpElectronicPaymentsCreateMapping = {
  [LOAD_ACCOUNTS_AND_TRANSACTIONS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/electronicPayments/load_accounts_and_transactions`,
  },
  [SORT_AND_FILTER_TRANSACTIONS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/electronicPayments/sort_and_filter_transactions`,
  },
  [RECORD_AND_DOWNLOAD_BANK_FILE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/electronicPayments/new`,
  },
};

export default HttpElectronicPaymentsCreateMapping;
