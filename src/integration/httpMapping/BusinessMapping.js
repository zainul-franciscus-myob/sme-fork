import {
  LOAD_BUSINESS_LIST,
} from '../../business/BusinessIntents';

export default {
  [LOAD_BUSINESS_LIST]: {
    method: 'GET',
    getPath: () => '/business/load_business_list',
  },
};
