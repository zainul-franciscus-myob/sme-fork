import { LOG_IN, REFRESH_LOG_IN } from '../StsLoginIntents';

const HttpPaySuperStsLoginMapping = {
  [LOG_IN]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/paySuper/log_in`,
  },
  [REFRESH_LOG_IN]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/paySuper/refresh_login`,
  },
};

export default HttpPaySuperStsLoginMapping;
