import {
  COMBINE,
  LOAD_TAX_COMBINE,
  LOAD_TAX_DETAIL,
  LOAD_TAX_LIST,
  SAVE_TAX_DETAIL,
} from '../TaxIntents';

const HttpTaxMapping = {
  [LOAD_TAX_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/tax/load_tax_list`,
  },
  [LOAD_TAX_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, taxCodeId }) => `/${businessId}/tax/${taxCodeId}`,
  },
  [SAVE_TAX_DETAIL]: {
    method: 'PUT',
    getPath: ({ businessId, taxCodeId }) => `/${businessId}/tax/${taxCodeId}`,
  },
  [LOAD_TAX_COMBINE]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/tax/load_tax_combine`,
  },
  [COMBINE]: {
    method: 'PUT',
    getPath: ({ businessId }) => `/${businessId}/tax/combine`,
  },
};

export default HttpTaxMapping;
