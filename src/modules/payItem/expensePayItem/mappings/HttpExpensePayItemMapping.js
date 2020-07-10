import {
  CREATE_EXPENSE_PAY_ITEM,
  DELETE_EXPENSE_PAY_ITEM,
  LOAD_EXPENSE_PAY_ITEM,
  LOAD_NEW_EXPENSE_PAY_ITEM,
  UPDATE_EXPENSE_PAY_ITEM,
} from '../ExpensePayItemIntents';

const HttpExpensePayItemMapping = {
  [LOAD_NEW_EXPENSE_PAY_ITEM]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/expensePayItem/load_new_expense_pay_item`,
  },
  [LOAD_EXPENSE_PAY_ITEM]: {
    method: 'GET',
    getPath: ({ businessId, expensePayItemId }) =>
      `/${businessId}/expensePayItem/load_expense_pay_item/${expensePayItemId}`,
  },
  [CREATE_EXPENSE_PAY_ITEM]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/expensePayItem/create_expense_pay_item`,
  },
  [UPDATE_EXPENSE_PAY_ITEM]: {
    method: 'PUT',
    getPath: ({ businessId, expensePayItemId }) =>
      `/${businessId}/expensePayItem/update_expense_pay_item/${expensePayItemId}`,
  },
  [DELETE_EXPENSE_PAY_ITEM]: {
    method: 'DELETE',
    getPath: ({ businessId, expensePayItemId }) =>
      `/${businessId}/expensePayItem/delete_expense_pay_item/${expensePayItemId}`,
  },
};

export default HttpExpensePayItemMapping;
