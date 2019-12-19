import { LOAD_TAX_LIST } from '../TaxIntents';

const HttpTaxMapping = {
  [LOAD_TAX_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/tax/load_tax_list`,
  },
};

export default HttpTaxMapping;
