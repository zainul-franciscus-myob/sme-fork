import BusinessIntents from '../../business/BusinessIntents';

export default {
  [BusinessIntents.LOAD_BUSINESS_LIST]: {
    method: 'GET',
    getPath: () => '/business/load_business_list',
  },
};
