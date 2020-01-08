import { GET_BUSINESS_SID } from '../stpNotifyAtoIntents';

const StpNotifyAtoMapping = {
  [GET_BUSINESS_SID]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/stp/business_sid`,
  },
};

export default StpNotifyAtoMapping;
