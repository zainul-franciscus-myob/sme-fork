import {
  CREATE_RECURRING_TRANSACTION,
  LOAD_NEW_RECURRING_TRANSACTION,
} from '../RecurringTransactionModalIntents';
import createRecurringTransactionResponse from './data/createRecurringTransactionResponse';
import loadNewRecurringTransactionResponse from './data/loadNewRecurringTransactionResponse';

const MemoryRecurringTransactionModalMapping = {
  [LOAD_NEW_RECURRING_TRANSACTION]: ({ onSuccess }) =>
    onSuccess(loadNewRecurringTransactionResponse),
  [CREATE_RECURRING_TRANSACTION]: ({ onSuccess }) =>
    onSuccess(createRecurringTransactionResponse),
};

export default MemoryRecurringTransactionModalMapping;
