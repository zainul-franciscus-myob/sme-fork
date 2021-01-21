import {
  CREATE_RECURRING_SPEND_MONEY,
  DELETE_RECURRING_SPEND_MONEY,
  LOAD_ABN_FROM_CONTACT,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_NEW_RECURRING_SPEND_MONEY,
  LOAD_RECURRING_SPEND_MONEY,
  UPDATE_RECURRING_SPEND_MONEY,
} from '../RecurringSpendMoneyIntents';
import createRecurringSpendMoneyResponse from './data/createRecurringSpendMoneyResponse.json';
import loadAbnResponse from './data/loadAbnResponse.json';
import loadAddedAccountResponse from './data/loadAddedAccountResponse.json';
import loadNewRecurringSpendMoneyResponse from './data/loadNewRecurringSpendMoneyResponse.json';
import loadRecurringSpendMoneyResponse from './data/loadRecurringSpendMoneyResponse.json';
import successResponse from './data/successResponse.json';

const MemoryRecurringSpendMoneyMapping = {
  [LOAD_NEW_RECURRING_SPEND_MONEY]: ({ onSuccess }) =>
    onSuccess(loadNewRecurringSpendMoneyResponse),
  [LOAD_RECURRING_SPEND_MONEY]: ({ onSuccess }) =>
    onSuccess(loadRecurringSpendMoneyResponse),
  [CREATE_RECURRING_SPEND_MONEY]: ({ onSuccess }) =>
    onSuccess(createRecurringSpendMoneyResponse),
  [DELETE_RECURRING_SPEND_MONEY]: ({ onSuccess }) => onSuccess(successResponse),
  [UPDATE_RECURRING_SPEND_MONEY]: ({ onSuccess }) => onSuccess(successResponse),
  [LOAD_ACCOUNT_AFTER_CREATE]: ({ onSuccess }) =>
    onSuccess(loadAddedAccountResponse),
  [LOAD_ABN_FROM_CONTACT]: ({ onSuccess }) => onSuccess(loadAbnResponse),
};

export default MemoryRecurringSpendMoneyMapping;
