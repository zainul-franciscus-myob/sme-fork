import {
  LOAD_RECURRING_TRANSACTION_LIST,
  SORT_AND_FILTER_RECURRING_TRANSACTION_LIST,
} from '../RecurringTransactionIntents';
import MemoryRecurringTransactionListModalMapping from '../recurringTransactionListModal/mappings/MemoryRecurringTransactionListModalMapping';
import loadRecurringTransactionListResponse from './data/recurringTransactionList';
import sortAndFilterRecurringTransactionListResponse from './data/sortedRecurringTransactionList';

const loadRecurringTransactionList = ({ onSuccess }) => {
  onSuccess(loadRecurringTransactionListResponse);
};

const sortAndFilterRecurringTransactionList = ({ onSuccess }) => {
  onSuccess(sortAndFilterRecurringTransactionListResponse);
};

const MemoryRecurringTransactionMapping = {
  [LOAD_RECURRING_TRANSACTION_LIST]: loadRecurringTransactionList,
  [SORT_AND_FILTER_RECURRING_TRANSACTION_LIST]: sortAndFilterRecurringTransactionList,
  ...MemoryRecurringTransactionListModalMapping,
};

export default MemoryRecurringTransactionMapping;
