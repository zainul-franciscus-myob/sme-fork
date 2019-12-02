import {
  LOAD_ACCOUNTS_AND_ELECTRONIC_PAYMENTS,
  RECORD_AND_DOWNLOAD_BANK_FILE,
  SORT_AND_FILTER_ELECTRONIC_PAYMENTS,
} from '../../electronicPayments/ElectronicPaymentsIntents';

const ElectronicPaymentsCreateMapping = {
  [LOAD_ACCOUNTS_AND_ELECTRONIC_PAYMENTS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/electronicPayments/load_accounts_and_transactions`,
  },
  [SORT_AND_FILTER_ELECTRONIC_PAYMENTS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/electronicPayments/sort_and_filter_transactions`,
  },
  [RECORD_AND_DOWNLOAD_BANK_FILE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/electronicPayments/new`,
  },
};

export default ElectronicPaymentsCreateMapping;
