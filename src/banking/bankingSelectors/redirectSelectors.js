import {
  getBankAccount,
  getBusinessId,
  getRegion,
} from './index';

const getBaseUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}`;
};

const getQueryFromParams = (params = {}) => {
  const encode = encodeURIComponent;
  const query = Object.keys(params)
    .map(key => `${encode(key)}=${encode(params[key])}`)
    .join('&');
  return `?${query}`;
};

// eslint-disable-next-line import/prefer-default-export
export const getBankReconciliationUrl = (state) => {
  const baseUrl = getBaseUrl(state);

  const params = {
    bankAccount: getBankAccount(state),
  };

  const urlParams = getQueryFromParams(params);
  return `${baseUrl}/bankReconciliation${urlParams}`;
};
