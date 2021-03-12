import {
  LOAD_REMITTANCE_ADVICE_LIST,
  SORT_AND_FILTER_REMITTANCE_ADVICE_LIST,
} from '../RemittanceAdviceIntents';

const HttpRemittanceAdviceMapping = {
  [LOAD_REMITTANCE_ADVICE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/remittanceAdvice/load_remittance_advice_list`,
  },
  [SORT_AND_FILTER_REMITTANCE_ADVICE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/remittanceAdvice/sort_and_filter_remittance_advice_list`,
  },
};

export default HttpRemittanceAdviceMapping;
