import { LOAD_ONLINETAX_CONFIG } from '../onlineTaxIntent';

const HttpOnlineTaxMapping = {
  [LOAD_ONLINETAX_CONFIG]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/onlineTax/load_onlineTax_config`,
  },
};

export default HttpOnlineTaxMapping;
