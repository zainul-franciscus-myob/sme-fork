import {
  CREATE_EXPENSE_PAY_ITEM,
  DELETE_EXPENSE_PAY_ITEM,
  LOAD_EXPENSE_PAY_ITEM,
  LOAD_NEW_EXPENSE_PAY_ITEM,
  UPDATE_EXPENSE_PAY_ITEM,
} from '../ExpensePayItemIntents';
import loadExpensePayItemResponse from './data/loadExpensePayItemResponse';
import loadNewExpensePayItemResponse from './data/loadNewExpensePayItemResponse';
import successResponse from './data/success';

const MemoryExpensePayItemMapping = {
  [LOAD_NEW_EXPENSE_PAY_ITEM]: ({ onSuccess }) => onSuccess(loadNewExpensePayItemResponse),
  [LOAD_EXPENSE_PAY_ITEM]: ({ onSuccess }) => onSuccess(loadExpensePayItemResponse),
  [CREATE_EXPENSE_PAY_ITEM]: ({ onSuccess }) => onSuccess(successResponse),
  [UPDATE_EXPENSE_PAY_ITEM]: ({ onSuccess }) => onSuccess(successResponse),
  [DELETE_EXPENSE_PAY_ITEM]: ({ onSuccess }) => onSuccess(successResponse),
};

export default MemoryExpensePayItemMapping;
