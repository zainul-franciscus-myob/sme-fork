import {
  LOAD_CREDITS_AND_DEBITS_LIST,
  LOAD_NEXT_PAGE,
  SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST,
} from '../../transactionList/creditAndDebitTransactions/CreditsAndDebitsListIntents';
import creditsAndDebitsListFilterResponse from '../data/creditsAndDebitsList/filterCreditsAndDebitsList.json';
import creditsAndDebitsListLoadResponse from '../data/creditsAndDebitsList/loadCreditsAndDebitsList.json';

const sortAndFilterCreditsAndDebitsList = ({ onSuccess }) => (
  onSuccess(creditsAndDebitsListFilterResponse)
);
const loadCreditsAndDebitsList = ({ onSuccess }) => onSuccess(creditsAndDebitsListLoadResponse);
const loadNextPage = ({ onSuccess }) => (
  onSuccess(creditsAndDebitsListFilterResponse)
);
const TransactionListMapping = {
  [LOAD_NEXT_PAGE]: loadNextPage,
  [SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST]: sortAndFilterCreditsAndDebitsList,
  [LOAD_CREDITS_AND_DEBITS_LIST]: loadCreditsAndDebitsList,
};

export default TransactionListMapping;