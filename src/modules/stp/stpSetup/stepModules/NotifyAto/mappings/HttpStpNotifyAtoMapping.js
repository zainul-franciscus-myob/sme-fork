import { GET_BUSINESS_SID } from '../stpNotifyAtoIntents';

const StpNotifyAtoMapping = {
  [GET_BUSINESS_SID]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/stp/software_id`,
  },
};

export default StpNotifyAtoMapping;
