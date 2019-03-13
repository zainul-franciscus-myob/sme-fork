import { LOAD_BANK_TRANSACTIONS, SORT_AND_FILTER_BANK_TRANSACTIONS } from '../../banking/BankingIntents';
import bankTransactions from '../data/banking/loadBankTransactions';
import filteredBankTransactions from '../data/banking/filterBankTransactions';

const loadBankTransactions = ({ onSuccess }) => onSuccess(bankTransactions);
const filterBankTransactions = ({ onSuccess }) => onSuccess(filteredBankTransactions);

const BankingMappings = {
  [LOAD_BANK_TRANSACTIONS]: loadBankTransactions,
  [SORT_AND_FILTER_BANK_TRANSACTIONS]: filterBankTransactions,
};

export default BankingMappings;
