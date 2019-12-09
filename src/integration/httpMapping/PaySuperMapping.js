import { LOAD_PAY_SUPER_LIST } from '../../paySuper/paySuperList/paySuperIntents';

const PaySuperMapping = {
  [LOAD_PAY_SUPER_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/paySuper/load_pay_super_list`,
  },
};

export default PaySuperMapping;
