import { LOAD_PAY_SUPER_READ, REVERSE_PAY_SUPER } from '../../paySuper/paySuperRead/paySuperReadIntents';

const PaySuperReadMapping = {
  [LOAD_PAY_SUPER_READ]: {
    method: 'GET',
    getPath: ({ businessId, businessEventId }) => `/${businessId}/paySuper/load_pay_super_detail/${businessEventId}`,
  },
  [REVERSE_PAY_SUPER]: {
    method: 'DELETE',
    getPath: ({ businessId, businessEventId }) => `/${businessId}/paySuper/pay_super_reversal/${businessEventId}`,
  },
};

export default PaySuperReadMapping;
