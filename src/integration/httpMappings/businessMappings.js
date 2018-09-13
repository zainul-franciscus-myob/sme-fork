import * as BusinessIntents from '../../business/businessIntents';

export default {
  [BusinessIntents.LOAD_BUSINESS_LIST]: {
    method: 'GET',
    path: '/business/load_business_list',
  },
};
