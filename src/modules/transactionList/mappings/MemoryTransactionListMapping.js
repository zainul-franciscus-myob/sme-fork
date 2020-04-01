import {
  LOAD_CREDITS_AND_DEBITS_LIST,
  LOAD_CREDITS_AND_DEBITS_NEXT_PAGE,
  LOAD_TRANSACTION_NEXT_PAGE,
  SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST,
  SORT_AND_FILTER_TRANSACTION_LIST,
} from '../TransactionListIntents';
import creditsAndDebitsListFilterResponse from './data/filterCreditsAndDebitsList.json';
import creditsAndDebitsListLoadResponse from './data/loadCreditsAndDebitsList.json';
import transactionListFilterResponse from './data/filterTransactionList.json';

const sortAndFilterCreditsAndDebitsList = ({ onSuccess }) => (
  onSuccess(creditsAndDebitsListFilterResponse)
);
const loadCreditsAndDebitsList = ({ onSuccess }) => onSuccess(creditsAndDebitsListLoadResponse);
const loadNextPageForCreditsAndDebits = ({ onSuccess }) => (
  onSuccess(creditsAndDebitsListFilterResponse)
);

const sortAndFilterTransactionList = ({ onSuccess }) => onSuccess(transactionListFilterResponse);
const loadNextPageForJournalTransactions = ({ onSuccess }) => (
  onSuccess(transactionListFilterResponse)
);

const MemoryTransactionListMapping = {
  [LOAD_CREDITS_AND_DEBITS_NEXT_PAGE]: loadNextPageForCreditsAndDebits,
  [SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST]: sortAndFilterCreditsAndDebitsList,
  [LOAD_CREDITS_AND_DEBITS_LIST]: loadCreditsAndDebitsList,
  [LOAD_TRANSACTION_NEXT_PAGE]: loadNextPageForJournalTransactions,
  [SORT_AND_FILTER_TRANSACTION_LIST]: sortAndFilterTransactionList,
};

export default MemoryTransactionListMapping;
