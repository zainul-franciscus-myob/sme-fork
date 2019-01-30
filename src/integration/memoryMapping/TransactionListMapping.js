import {
  LOAD_TRANSACTION_LIST,
  SORT_AND_FILTER_TRANSACTION_LIST,
} from '../../transactionList/TransactionListIntents';
import transactionListFilterResponse from '../data/transactionList/filterTransactionList.json';
import transactionListLoadResponse from '../data/transactionList/loadTransactionList.json';

const sortAndFilterTransactionList = ({ onSuccess }) => onSuccess(transactionListFilterResponse);
const loadTransactionList = ({ onSuccess }) => onSuccess(transactionListLoadResponse);

const TransactionListMapping = {
  [SORT_AND_FILTER_TRANSACTION_LIST]: sortAndFilterTransactionList,
  [LOAD_TRANSACTION_LIST]: loadTransactionList,
};

export default TransactionListMapping;
