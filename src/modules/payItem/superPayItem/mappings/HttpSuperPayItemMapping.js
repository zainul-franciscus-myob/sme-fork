import {
  CREATE_SUPER_PAY_ITEM,
  DELETE_SUPER_PAY_ITEM,
  LOAD_NEW_SUPER_PAY_ITEM,
  LOAD_SUPER_PAY_ITEM,
  UPDATE_SUPER_PAY_ITEM,
} from '../SuperPayItemIntents';

const HttpSuperPayItemMapping = {
  [LOAD_NEW_SUPER_PAY_ITEM]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/superPayItem/load_new_super_pay_item_detail`,
  },
  [LOAD_SUPER_PAY_ITEM]: {
    method: 'GET',
    getPath: ({ businessId, superPayItemId }) =>
      `/${businessId}/superPayItem/load_super_pay_item_detail/${superPayItemId}`,
  },
  [CREATE_SUPER_PAY_ITEM]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/superPayItem/create_super_pay_item_detail`,
  },
  [UPDATE_SUPER_PAY_ITEM]: {
    method: 'PUT',
    getPath: ({ businessId, superPayItemId }) =>
      `/${businessId}/superPayItem/update_super_pay_item_detail/${superPayItemId}`,
  },
  [DELETE_SUPER_PAY_ITEM]: {
    method: 'DELETE',
    getPath: ({ businessId, superPayItemId }) =>
      `/${businessId}/superPayItem/delete_super_pay_item_detail/${superPayItemId}`,
  },
};

export default HttpSuperPayItemMapping;
