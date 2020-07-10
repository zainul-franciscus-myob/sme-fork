import {
  GET_SOFTWARE_ID,
  SUBMIT_STP_REGISTRATION,
} from '../stpNotifyAtoIntents';

const StpNotifyAtoMapping = {
  [GET_SOFTWARE_ID]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/stp/software_id`,
  },
  [SUBMIT_STP_REGISTRATION]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/stp/submit_stp_registration`,
  },
};

export default StpNotifyAtoMapping;
