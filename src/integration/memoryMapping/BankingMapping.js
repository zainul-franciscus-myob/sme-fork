import {
  ALLOCATE_TRANSACTION,
  LOAD_BANK_TRANSACTIONS,
  SORT_AND_FILTER_BANK_TRANSACTIONS,
  UNALLOCATE_TRANSACTION,
} from '../../banking/BankingIntents';
import allocatedBankTransaction from '../data/banking/allocatedBankTransaction';
import bankTransactions from '../data/banking/loadBankTransactions';
import filteredBankTransactions from '../data/banking/filterBankTransactions';
import success from '../data/success';

const loadBankTransactions = ({ onSuccess }) => onSuccess(bankTransactions);
const filterBankTransactions = ({ onSuccess }) => onSuccess(filteredBankTransactions);
const allocateBankTransaction = ({ onSuccess }) => onSuccess(allocatedBankTransaction);
const unallocateBankTransaction = ({ onSuccess }) => onSuccess(success);

const BankingMappings = {
  [LOAD_BANK_TRANSACTIONS]: loadBankTransactions,
  [SORT_AND_FILTER_BANK_TRANSACTIONS]: filterBankTransactions,
  [ALLOCATE_TRANSACTION]: allocateBankTransaction,
  [UNALLOCATE_TRANSACTION]: unallocateBankTransaction,
};

export default BankingMappings;
