import { LOAD_PAY_SUPER_READ } from '../../paySuper/paySuperRead/paySuperReadIntents';

const PaySuperReadMapping = {
  [LOAD_PAY_SUPER_READ]: {
    method: 'GET',
    getPath: ({ businessId, businessEventId }) => `/${businessId}/paySuper/load_pay_super_detail/${businessEventId}`,
  },
};

export default PaySuperReadMapping;
