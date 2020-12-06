import {
  LOAD_RECURRING_TRANSACTION_LIST,
  SORT_AND_FILTER_RECURRING_TRANSACTION_LIST,
} from '../RecurringTransactionListIntents';
import loadRecurringTransactionListResponse from './data/recurringTransactionList';
import sortAndFilterRecurringTransactionListResponse from './data/sortedRecurringTransactionList';

const loadRecurringTransactionList = ({ onSuccess }) => {
  onSuccess(loadRecurringTransactionListResponse);
};

const sortAndFilterRecurringTransactionList = ({ onSuccess }) => {
  onSuccess(sortAndFilterRecurringTransactionListResponse);
};

const MemoryRecurringTransactionListMapping = {
  [LOAD_RECURRING_TRANSACTION_LIST]: loadRecurringTransactionList,
  [SORT_AND_FILTER_RECURRING_TRANSACTION_LIST]: sortAndFilterRecurringTransactionList,
};

export default MemoryRecurringTransactionListMapping;
