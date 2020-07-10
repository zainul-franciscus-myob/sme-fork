import {
  CREATE_PAY_ITEM,
  DELETE_PAY_ITEM,
  LOAD_EXISTING_PAY_ITEM,
  LOAD_NEW_PAY_ITEM,
  UPDATE_PAY_ITEM,
} from '../WagePayItemIntents';

const HttpWagePayItemMapping = {
  [LOAD_NEW_PAY_ITEM]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/wagePayItem/load_new_wage_pay_item`,
  },
  [LOAD_EXISTING_PAY_ITEM]: {
    method: 'GET',
    getPath: ({ businessId, payItemId }) =>
      `/${businessId}/wagePayItem/load_wage_pay_item/${payItemId}`,
  },
  [CREATE_PAY_ITEM]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/wagePayItem/create_new_wage_pay_item`,
  },
  [UPDATE_PAY_ITEM]: {
    method: 'PUT',
    getPath: ({ businessId, payItemId }) =>
      `/${businessId}/wagePayItem/update_wage_pay_item/${payItemId}`,
  },
  [DELETE_PAY_ITEM]: {
    method: 'DELETE',
    getPath: ({ businessId, payItemId }) =>
      `/${businessId}/wagePayItem/delete_wage_pay_item/${payItemId}`,
  },
};

export default HttpWagePayItemMapping;
