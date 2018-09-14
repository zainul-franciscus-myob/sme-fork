import * as BusinessIntents from '../../business/businessIntents';

export default {
  [BusinessIntents.LOAD_BUSINESS_LIST]: {
    method: 'GET',
    getPath: () => '/business/load_business_list',
  },
};
