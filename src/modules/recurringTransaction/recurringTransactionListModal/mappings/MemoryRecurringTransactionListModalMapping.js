import {
  LOAD_RECURRING_TRANSACTION_LIST,
  SORT_RECURRING_TRANSACTION_LIST,
} from '../RecurringTransactionListModalIntents';
import loadRecurringTransactionListResponse from './data/loadRecurringTransactionListResponse.json';
import sortAndFilterRecurringTransactionListResponse from './data/sortRecurringTransactionListResponse.json';

const loadRecurringTransactionList = ({ onSuccess }) => {
  onSuccess(loadRecurringTransactionListResponse);
};

const sortAndFilterRecurringTransactionList = ({ onSuccess }) => {
  onSuccess(sortAndFilterRecurringTransactionListResponse);
};

const MemoryRecurringTransactionListModalMapping = {
  [LOAD_RECURRING_TRANSACTION_LIST]: loadRecurringTransactionList,
  [SORT_RECURRING_TRANSACTION_LIST]: sortAndFilterRecurringTransactionList,
};

export default MemoryRecurringTransactionListModalMapping;
