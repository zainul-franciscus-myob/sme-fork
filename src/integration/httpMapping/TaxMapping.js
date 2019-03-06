import { LOAD_TAX_LIST } from '../../tax/TaxIntents';

const TaxMapping = {
  [LOAD_TAX_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/tax/load_tax_list`,
  },
};

export default TaxMapping;
