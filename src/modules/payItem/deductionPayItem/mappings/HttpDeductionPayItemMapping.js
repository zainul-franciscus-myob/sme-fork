import {
  CREATE_PAY_ITEM,
  DELETE_PAY_ITEM,
  LOAD_EXISTING_PAY_ITEM,
  LOAD_NEW_PAY_ITEM,
  UPDATE_PAY_ITEM,
} from '../DeductionPayItemIntents';

const HttpDeductionPayItemMapping = {
  [LOAD_NEW_PAY_ITEM]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/deductionPayItem/load_new_deduction_pay_item`,
  },
  [LOAD_EXISTING_PAY_ITEM]: {
    method: 'GET',
    getPath: ({ businessId, payItemId }) => `/${businessId}/deductionPayItem/load_deduction_pay_item/${payItemId}`,
  },
  [CREATE_PAY_ITEM]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/deductionPayItem/create_new_deduction_pay_item`,
  },
  [UPDATE_PAY_ITEM]: {
    method: 'PUT',
    getPath: ({ businessId, payItemId }) => `/${businessId}/deductionPayItem/update_deduction_pay_item/${payItemId}`,
  },
  [DELETE_PAY_ITEM]: {
    method: 'DELETE',
    getPath: ({ businessId, payItemId }) => `/${businessId}/deductionPayItem/delete_deduction_pay_item/${payItemId}`,
  },
};

export default HttpDeductionPayItemMapping;
