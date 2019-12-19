import {
  CREATE_SUPER_FUND,
  DELETE_SUPER_FUND,
  LOAD_ABN_DETAIL,
  LOAD_NEW_SUPER_FUND,
  LOAD_SUPER_FUND,
  UPDATE_SUPER_FUND,
} from '../SuperFundIntents';

const HttpSuperFundMapping = {
  [LOAD_NEW_SUPER_FUND]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/superFund/load_new_super_fund`,
  },
  [LOAD_SUPER_FUND]: {
    method: 'GET',
    getPath: ({ businessId, superFundId }) => `/${businessId}/superFund/load_super_fund/${superFundId}`,
  },
  [LOAD_ABN_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, abn }) => `/${businessId}/superFund/load_abn/${abn}`,
  },
  [CREATE_SUPER_FUND]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/superFund/create_super_fund`,
  },
  [UPDATE_SUPER_FUND]: {
    method: 'PUT',
    getPath: ({ businessId, superFundId }) => `/${businessId}/superFund/update_super_fund/${superFundId}`,
  },
  [DELETE_SUPER_FUND]: {
    method: 'DELETE',
    getPath: ({ businessId, superFundId }) => `/${businessId}/superFund/delete_super_fund/${superFundId}`,
  },
};

export default HttpSuperFundMapping;
