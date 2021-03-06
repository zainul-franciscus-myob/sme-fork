import {
  LOAD_ACCOUNTS_AND_SUPER_PAYMENTS,
  RECORD_PAY_SUPER,
  SORT_AND_FILTER_SUPER_PAYMENTS,
} from '../paySuperCreateIntents';

const HttpPaySuperCreateMapping = {
  [LOAD_ACCOUNTS_AND_SUPER_PAYMENTS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/paySuper/load_accounts_and_super_payments`,
  },
  [SORT_AND_FILTER_SUPER_PAYMENTS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/paySuper/sort_and_filter_super_payments`,
  },
  [RECORD_PAY_SUPER]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/paySuper/record_pay_super`,
  },
};

export default HttpPaySuperCreateMapping;
