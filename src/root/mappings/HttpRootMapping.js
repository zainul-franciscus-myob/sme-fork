import { LOAD_SHARED_INFO, LOAD_SUBSCRIPTION } from '../rootIntents';

const HttpRootMapping = {
  [LOAD_SUBSCRIPTION]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/subscription/load_subscription`,
  },
  [LOAD_SHARED_INFO]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/root/load_shared_info`,
  },
};

export default HttpRootMapping;
