import {
  LOAD_MATCH_TRANSACTIONS,
  SAVE_MATCH_TRANSACTION,
  SORT_AND_FILTER_MATCH_TRANSACTIONS,
} from '../MatchTransactionIntents';
import filteredMatchTransactions from './data/sortAndFilterMatchTransactions';
import matchAllocatedTransactions from './data/loadMatchAllocatedTransactions';
import matchTransactions from './data/loadMatchTransactions';
import savedMatchTransaction from './data/saveMatchTransaction';

const loadMatchTransactions = ({ params, onSuccess }) =>
  onSuccess(
    params.allocatedJournalLineId
      ? matchAllocatedTransactions
      : matchTransactions
  );
const sortAndFilterMatchTransactions = ({ onSuccess }) =>
  onSuccess(filteredMatchTransactions);
const saveMatchTransaction = ({ onSuccess }) =>
  onSuccess(savedMatchTransaction);

const MemoryMatchTransactionsMapping = {
  [LOAD_MATCH_TRANSACTIONS]: loadMatchTransactions,
  [SORT_AND_FILTER_MATCH_TRANSACTIONS]: sortAndFilterMatchTransactions,
  [SAVE_MATCH_TRANSACTION]: saveMatchTransaction,
};

export default MemoryMatchTransactionsMapping;
