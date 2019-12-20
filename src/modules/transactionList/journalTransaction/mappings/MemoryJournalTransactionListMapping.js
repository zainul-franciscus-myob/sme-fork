import {
  LOAD_TRANSACTION_LIST,
  LOAD_TRANSACTION_LIST_NEXT_PAGE,
  SORT_AND_FILTER_TRANSACTION_LIST,
} from '../JournalTransactionListIntents';
import transactionListFilterResponse from './data/filterTransactionList.json';
import transactionListLoadResponse from './data/loadTransactionList.json';

const sortAndFilterTransactionList = ({ onSuccess }) => onSuccess(transactionListFilterResponse);
const loadTransactionList = ({ onSuccess }) => onSuccess(transactionListLoadResponse);
const loadNextPage = ({ onSuccess }) => (
  onSuccess(transactionListFilterResponse)
);
const MemoryJournalTransactionListMapping = {
  [LOAD_TRANSACTION_LIST_NEXT_PAGE]: loadNextPage,
  [SORT_AND_FILTER_TRANSACTION_LIST]: sortAndFilterTransactionList,
  [LOAD_TRANSACTION_LIST]: loadTransactionList,
};

export default MemoryJournalTransactionListMapping;
