import {
  LOAD_PAY_SUPER_LIST,
  LOAD_UPDATED_SUPER_PAYMENT_STATUS_LIST,
} from '../paySuperIntents';

const HttpPaySuperListMapping = {
  [LOAD_PAY_SUPER_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/paySuper/load_pay_super_list`,
  },
  [LOAD_UPDATED_SUPER_PAYMENT_STATUS_LIST]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/paySuper/load_updated_super_payment_status_list`,
  },
};

export default HttpPaySuperListMapping;
