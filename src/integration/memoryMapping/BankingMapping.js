import {
  ALLOCATE_TRANSACTION,
  APPLY_RULE_TO_TRANSACTIONS,
  BULK_ALLOCATE_TRANSACTIONS,
  BULK_UNALLOCATE_TRANSACTIONS,
  LOAD_BANK_TRANSACTIONS,
  LOAD_MATCH_TRANSACTIONS,
  LOAD_PAYMENT_ALLOCATION,
  LOAD_PAYMENT_ALLOCATION_LINES,
  LOAD_SPLIT_ALLOCATION,
  LOAD_TRANSFER_MONEY,
  SAVE_MATCH_TRANSACTION,
  SAVE_PAYMENT_ALLOCATION,
  SAVE_SPLIT_ALLOCATION,
  SAVE_TRANSFER_MONEY,
  SORT_AND_FILTER_BANK_TRANSACTIONS,
  SORT_AND_FILTER_MATCH_TRANSACTIONS,
  UNALLOCATE_OPEN_ENTRY_TRANSACTION,
  UNALLOCATE_TRANSACTION,
} from '../../banking/BankingIntents';
import {
  CREATE_BANKING_RULE_BILL,
  CREATE_BANKING_RULE_INVOICE,
  CREATE_BANKING_RULE_RECEIVE_MONEY,
  CREATE_BANKING_RULE_SPEND_MONEY,
} from '../../banking/bankingRule/BankingRuleIntents';
import allocatedBankTransaction from '../data/banking/allocatedBankTransaction';
import applyBankingRuleResponse from '../data/banking/applyBankingRuleResponse.json';
import bankTransactions from '../data/banking/loadBankTransactions';
import bulkAllocatedBankTransaction from '../data/banking/bulkAllocatedBankTransaction';
import bulkUnallocatedBankTransaction from '../data/banking/bulkUnallocatedBankTransaction';
import createBankingRuleResponse from '../data/banking/createBankingRuleResponse';
import filteredBankTransactions from '../data/banking/sortAndFilterBankTransactions';
import filteredMatchTransactions from '../data/banking/sortAndFilterMatchTransactions';
import loadReceiveMoney from '../data/banking/loadReceiveMoney';
import loadSpendMoney from '../data/banking/loadSpendMoney';
import matchAllocatedTransactions from '../data/banking/loadMatchAllocatedTransactions';
import matchTransactions from '../data/banking/loadMatchTransactions';
import paymentAllocation from '../data/banking/loadPayment';
import paymentAllocationLines from '../data/banking/loadPaymentLines';
import saveTransferMoneyPayload from '../data/banking/saveTransferMoney';
import savedMatchTransaction from '../data/banking/saveMatchTransaction';
import savedPaymentAllocation from '../data/banking/savePaymentAllocation';
import transferMoneyPayload from '../data/banking/loadTransferMoney';
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
const loadPaymentAllocationLines = ({ onSuccess }) => onSuccess(paymentAllocationLines);
const loadPaymentAllocation = ({ onSuccess }) => onSuccess(paymentAllocation);
const savePaymentAllocation = ({ onSuccess }) => onSuccess(savedPaymentAllocation);
const loadTransferMoney = ({ onSuccess }) => onSuccess(transferMoneyPayload);
const saveTransferMoney = ({ onSuccess }) => onSuccess(saveTransferMoneyPayload);
const saveBulkAllocation = ({ onSuccess }) => onSuccess(bulkAllocatedBankTransaction);
const saveBulkUnallocation = ({ onSuccess }) => onSuccess(bulkUnallocatedBankTransaction);
const createBankingRule = ({ onSuccess }) => onSuccess(createBankingRuleResponse);
const applyBankingRule = ({ onSuccess }) => onSuccess(applyBankingRuleResponse);

const BankingMappings = {
  [LOAD_BANK_TRANSACTIONS]: loadBankTransactions,
  [SORT_AND_FILTER_BANK_TRANSACTIONS]: filterBankTransactions,
  [ALLOCATE_TRANSACTION]: allocateBankTransaction,
  [BULK_ALLOCATE_TRANSACTIONS]: saveBulkAllocation,
  [UNALLOCATE_TRANSACTION]: unallocateBankTransaction,
  [BULK_UNALLOCATE_TRANSACTIONS]: saveBulkUnallocation,
  [UNALLOCATE_OPEN_ENTRY_TRANSACTION]: unallocateBankTransaction,
  [LOAD_SPLIT_ALLOCATION]: loadSplitAlloation,
  [SAVE_SPLIT_ALLOCATION]: saveSplitAllocation,
  [LOAD_MATCH_TRANSACTIONS]: loadMatchTransactions,
  [SORT_AND_FILTER_MATCH_TRANSACTIONS]: sortAndFilterMatchTransactions,
  [SAVE_MATCH_TRANSACTION]: saveMatchTransaction,
  [LOAD_PAYMENT_ALLOCATION_LINES]: loadPaymentAllocationLines,
  [LOAD_PAYMENT_ALLOCATION]: loadPaymentAllocation,
  [SAVE_PAYMENT_ALLOCATION]: savePaymentAllocation,
  [LOAD_TRANSFER_MONEY]: loadTransferMoney,
  [SAVE_TRANSFER_MONEY]: saveTransferMoney,
  [CREATE_BANKING_RULE_SPEND_MONEY]: createBankingRule,
  [CREATE_BANKING_RULE_RECEIVE_MONEY]: createBankingRule,
  [CREATE_BANKING_RULE_INVOICE]: createBankingRule,
  [CREATE_BANKING_RULE_BILL]: createBankingRule,
  [APPLY_RULE_TO_TRANSACTIONS]: applyBankingRule,
};

export default BankingMappings;
