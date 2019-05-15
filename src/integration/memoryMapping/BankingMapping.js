import {
  ALLOCATE_TRANSACTION,
  LOAD_BANK_TRANSACTIONS,
  LOAD_SPLIT_ALLOCATION,
  SAVE_SPLIT_ALLOCATION,
  SORT_AND_FILTER_BANK_TRANSACTIONS,
  UNALLOCATE_SPLIT_ALLOCATION,
  UNALLOCATE_TRANSACTION,
} from '../../banking/BankingIntents';
import allocatedBankTransaction from '../data/banking/allocatedBankTransaction';
import bankTransactions from '../data/banking/loadBankTransactions';
import filteredBankTransactions from '../data/banking/sortAndFilterBankTransactions';
import loadReceiveMoney from '../data/banking/loadReceiveMoney';
import loadSpendMoney from '../data/banking/loadSpendMoney';
import unallocatedBankTransaction from '../data/banking/unallocatedBankTransaction';

const loadBankTransactions = ({ onSuccess }) => onSuccess(bankTransactions);
const filterBankTransactions = ({ onSuccess }) => onSuccess(filteredBankTransactions);
const allocateBankTransaction = ({ onSuccess }) => onSuccess(allocatedBankTransaction);
const unallocateBankTransaction = ({ onSuccess }) => onSuccess(unallocatedBankTransaction);
const loadSplitAlloation = ({ urlParams, onSuccess }) => onSuccess(
  urlParams.type === 'spend_money' ? loadSpendMoney : loadReceiveMoney,
);
const saveSplitAllocation = ({ onSuccess }) => onSuccess(allocatedBankTransaction);
const unallocateSplitAllocation = ({ onSuccess }) => onSuccess(unallocatedBankTransaction);

const BankingMappings = {
  [LOAD_BANK_TRANSACTIONS]: loadBankTransactions,
  [SORT_AND_FILTER_BANK_TRANSACTIONS]: filterBankTransactions,
  [ALLOCATE_TRANSACTION]: allocateBankTransaction,
  [UNALLOCATE_TRANSACTION]: unallocateBankTransaction,
  [LOAD_SPLIT_ALLOCATION]: loadSplitAlloation,
  [SAVE_SPLIT_ALLOCATION]: saveSplitAllocation,
  [UNALLOCATE_SPLIT_ALLOCATION]: unallocateSplitAllocation,
};

export default BankingMappings;
