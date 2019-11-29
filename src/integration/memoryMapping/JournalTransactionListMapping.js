import {
  LOAD_TRANSACTION_LIST,
  LOAD_TRANSACTION_LIST_NEXT_PAGE,
  SORT_AND_FILTER_TRANSACTION_LIST,
} from '../../transactionList/journalTransaction/JournalTransactionListIntents';
import transactionListFilterResponse from '../data/transactionList/filterTransactionList.json';
import transactionListLoadResponse from '../data/transactionList/loadTransactionList.json';

const sortAndFilterTransactionList = ({ onSuccess }) => onSuccess(transactionListFilterResponse);
const loadTransactionList = ({ onSuccess }) => onSuccess(transactionListLoadResponse);
const loadNextPage = ({ onSuccess }) => (
  onSuccess(transactionListFilterResponse)
);
const TransactionListMapping = {
  [LOAD_TRANSACTION_LIST_NEXT_PAGE]: loadNextPage,
  [SORT_AND_FILTER_TRANSACTION_LIST]: sortAndFilterTransactionList,
  [LOAD_TRANSACTION_LIST]: loadTransactionList,
};

export default TransactionListMapping;
