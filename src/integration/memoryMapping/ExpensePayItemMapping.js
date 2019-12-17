import {
  CREATE_EXPENSE_PAY_ITEM,
  DELETE_EXPENSE_PAY_ITEM,
  LOAD_EXPENSE_PAY_ITEM,
  LOAD_NEW_EXPENSE_PAY_ITEM,
  UPDATE_EXPENSE_PAY_ITEM,
} from '../../modules/payItem/expensePayItem/ExpensePayItemIntents';
import loadExpensePayItemResponse
  from '../data/payItem/expense/loadExpensePayItemResponse';
import loadNewExpensePayItemResponse from '../data/payItem/expense/loadNewExpensePayItemResponse';
import successResponse from '../data/success';

const ExpensePayItemMapping = {
  [LOAD_NEW_EXPENSE_PAY_ITEM]: ({ onSuccess }) => onSuccess(loadNewExpensePayItemResponse),
  [LOAD_EXPENSE_PAY_ITEM]: ({ onSuccess }) => onSuccess(loadExpensePayItemResponse),
  [CREATE_EXPENSE_PAY_ITEM]: ({ onSuccess }) => onSuccess(successResponse),
  [UPDATE_EXPENSE_PAY_ITEM]: ({ onSuccess }) => onSuccess(successResponse),
  [DELETE_EXPENSE_PAY_ITEM]: ({ onSuccess }) => onSuccess(successResponse),
};

export default ExpensePayItemMapping;
