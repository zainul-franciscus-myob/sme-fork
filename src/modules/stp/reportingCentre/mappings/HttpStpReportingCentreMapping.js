import { LOAD_STP_REGISTRATION_STATUS } from '../ReportingCentreIntents';

const HttpStpReportingCentreMapping = {
  [LOAD_STP_REGISTRATION_STATUS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/stp/registration_status`,
  },
};

export default HttpStpReportingCentreMapping;
