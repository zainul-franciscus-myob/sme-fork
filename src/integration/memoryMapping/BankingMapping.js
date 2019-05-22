import {
  ALLOCATE_TRANSACTION,
  LOAD_BANK_TRANSACTIONS,
  LOAD_MATCH_TRANSACTIONS,
  LOAD_SPLIT_ALLOCATION,
  SAVE_MATCH_TRANSACTION,
  SAVE_SPLIT_ALLOCATION,
  SORT_AND_FILTER_BANK_TRANSACTIONS,
  SORT_AND_FILTER_MATCH_TRANSACTIONS,
  UNALLOCATE_OPEN_ENTRY_TRANSACTION,
  UNALLOCATE_TRANSACTION,
} from '../../banking/BankingIntents';
import allocatedBankTransaction from '../data/banking/allocatedBankTransaction';
import bankTransactions from '../data/banking/loadBankTransactions';
import filteredBankTransactions from '../data/banking/sortAndFilterBankTransactions';
import filteredMatchTransactions from '../data/banking/sortAndFilterMatchTransactions';
import loadReceiveMoney from '../data/banking/loadReceiveMoney';
import loadSpendMoney from '../data/banking/loadSpendMoney';
import matchAllocatedTransactions from '../data/banking/loadMatchAllocatedTransactions';
import matchTransactions from '../data/banking/loadMatchTransactions';
import savedMatchTransaction from '../data/banking/saveMatchTransaction';
import unallocatedBankTransaction from '../data/banking/unallocatedBankTransaction';

const loadBankTransactions = ({ onSuccess }) => onSuccess(bankTransactions);
const filterBankTransactions = ({ onSuccess }) => onSuccess(filteredBankTransactions);
const allocateBankTransaction = ({ onSuccess }) => onSuccess(allocatedBankTransaction);
const unallocateBankTransaction = ({ onSuccess }) => onSuccess(unallocatedBankTransaction);
const loadSplitAlloation = ({ urlParams, onSuccess }) => onSuccess(
  urlParams.type === 'spend_money' ? loadSpendMoney : loadReceiveMoney,
);
const saveSplitAllocation = ({ onSuccess }) => onSuccess(allocatedBankTransaction);
const loadMatchTransactions = ({ params, onSuccess }) => onSuccess(
  params.allocatedJournalLineId ? matchAllocatedTransactions : matchTransactions,
);
const sortAndFilterMatchTransactions = ({ onSuccess }) => onSuccess(filteredMatchTransactions);
const saveMatchTransaction = ({ onSuccess }) => onSuccess(savedMatchTransaction);

const BankingMappings = {
  [LOAD_BANK_TRANSACTIONS]: loadBankTransactions,
  [SORT_AND_FILTER_BANK_TRANSACTIONS]: filterBankTransactions,
  [ALLOCATE_TRANSACTION]: allocateBankTransaction,
  [UNALLOCATE_TRANSACTION]: unallocateBankTransaction,
  [UNALLOCATE_OPEN_ENTRY_TRANSACTION]: unallocateBankTransaction,
  [LOAD_SPLIT_ALLOCATION]: loadSplitAlloation,
  [SAVE_SPLIT_ALLOCATION]: saveSplitAllocation,
  [LOAD_MATCH_TRANSACTIONS]: loadMatchTransactions,
  [SORT_AND_FILTER_MATCH_TRANSACTIONS]: sortAndFilterMatchTransactions,
  [SAVE_MATCH_TRANSACTION]: saveMatchTransaction,
};

export default BankingMappings;
