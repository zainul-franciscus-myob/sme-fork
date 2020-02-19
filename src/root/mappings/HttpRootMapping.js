import { LOAD_SUBSCRIPTION } from '../rootIntents';

const HttpRootMapping = {
  [LOAD_SUBSCRIPTION]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/subscription/load_subscription`,
  },
};

export default HttpRootMapping;
