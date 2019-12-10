import {
  AUTHORISE_WITH_CODE,
  GET_CODE_TO_AUTHORISE,
  LOAD_ACCOUNTS_AND_SUPER_PAYMENTS,
  RECORD_PAY_SUPER,
  SORT_AND_FILTER_SUPER_PAYMENTS,
} from '../../paySuper/paySuperCreate/paySuperCreateIntents';

const PaySuperCreateMapping = {
  [LOAD_ACCOUNTS_AND_SUPER_PAYMENTS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/paySuper/load_accounts_and_super_payments`,
  },
  [SORT_AND_FILTER_SUPER_PAYMENTS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/paySuper/sort_and_filter_super_payments`,
  },
  [RECORD_PAY_SUPER]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/paySuper/record_pay_super`,
  },
  [GET_CODE_TO_AUTHORISE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/paySuper/get_code_to_authorise`,
  },
  [AUTHORISE_WITH_CODE]: {
    method: 'PUT',
    getPath: ({ businessId }) => `/${businessId}/paySuper/authorise_with_code`,
  },
};

export default PaySuperCreateMapping;
