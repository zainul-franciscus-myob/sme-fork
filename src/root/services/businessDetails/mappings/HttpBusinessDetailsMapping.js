import {
  LOAD_GLOBAL_BUSINESS_DETAILS,
  UPDATE_GLOBAL_BUSINESS_DETAILS,
} from '../BusinessDetailsIntents';

const HttpBusinessMapping = {
  [LOAD_GLOBAL_BUSINESS_DETAILS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/business/load_business_settings`,
  },
  [UPDATE_GLOBAL_BUSINESS_DETAILS]: {
    method: 'PUT',
    getPath: ({ businessId }) =>
      `/${businessId}/business/update_business_settings`,
  },
};

export default HttpBusinessMapping;
