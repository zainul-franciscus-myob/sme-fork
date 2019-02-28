import {
  LOAD_BUSINESS_DETAIL, LOAD_BUSINESS_LIST, UPDATE_BUSINESS_DETAIL,
} from '../../business/BusinessIntents';


const BusinessMapping = {
  [LOAD_BUSINESS_LIST]: {
    method: 'GET',
    getPath: () => '/business/load_business_list',
  },
  [LOAD_BUSINESS_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/business/load_business_details`,
  },
  [UPDATE_BUSINESS_DETAIL]: {
    method: 'PUT',
    getPath: ({ businessId }) => `/${businessId}/business/update_business_details`,
  },
};


export default BusinessMapping;
