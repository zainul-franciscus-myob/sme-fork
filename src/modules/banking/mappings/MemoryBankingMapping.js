import {
  ALLOCATE_TRANSACTION,
  APPLY_RULE_TO_TRANSACTIONS,
  BULK_ALLOCATE_TRANSACTIONS,
  BULK_UNALLOCATE_TRANSACTIONS,
  LOAD_ATTACHMENTS,
  LOAD_BANK_TRANSACTIONS,
  LOAD_MATCH_TRANSACTIONS,
  LOAD_MATCH_TRANSFER_MONEY,
  LOAD_SPLIT_ALLOCATION,
  LOAD_TRANSFER_MONEY,
  REMOVE_ATTACHMENT,
  SAVE_MATCH_TRANSACTION,
  SAVE_PENDING_NOTE,
  SAVE_SPLIT_ALLOCATION,
  SAVE_TRANSFER_MONEY,
  SORT_AND_FILTER_BANK_TRANSACTIONS,
  SORT_AND_FILTER_MATCH_TRANSACTIONS,
  UNALLOCATE_OPEN_ENTRY_TRANSACTION,
  UNALLOCATE_TRANSACTION,
  UNMATCH_TRANSACTION,
  UPLOAD_ATTACHMENT,
} from '../BankingIntents';
import {
  CREATE_BANKING_RULE_BILL,
  CREATE_BANKING_RULE_INVOICE,
  CREATE_BANKING_RULE_RECEIVE_MONEY,
  CREATE_BANKING_RULE_SPEND_MONEY,
} from '../bankingRule/BankingRuleIntents';
import allocatedBankTransaction from './data/allocatedBankTransaction';
import applyBankingRuleResponse from './data/applyBankingRuleResponse.json';
import attachments from './data/loadAttachmentsResponse';
import bankTransactions from './data/loadBankTransactions';
import bulkAllocatedBankTransaction from './data/bulkAllocatedBankTransaction';
import bulkUnallocatedBankTransaction from './data/bulkUnallocatedBankTransaction';
import createBankingRuleResponse from './data/createBankingRuleResponse';
import filteredBankTransactions from './data/sortAndFilterBankTransactions';
import filteredMatchTransactions from './data/sortAndFilterMatchTransactions';
import loadReceiveMoney from './data/loadReceiveMoney';
import loadSpendMoney from './data/loadSpendMoney';
import matchAllocatedTransactions from './data/loadMatchAllocatedTransactions';
import matchTransactions from './data/loadMatchTransactions';
import matchTransferMoneyTransactionsPayload from './data/loadMatchTransferMoneyTransactions';
import saveTransferMoneyPayload from './data/saveTransferMoney';
import savedMatchTransaction from './data/saveMatchTransaction';
import successResponse from './data/success';
import transferMoneyPayload from './data/loadTransferMoney';
import unallocatedBankTransaction from './data/unallocatedBankTransaction';
import updateNoteResponse from './data/updateBankFeedNoteResponse';
import uploadAttachmentResponse from './data/uploadAttachmentResponse';

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
const loadTransferMoney = ({ onSuccess }) => onSuccess(transferMoneyPayload);
const loadMatchTransferMoneyTransactions = ({ onSuccess }) => onSuccess(
  matchTransferMoneyTransactionsPayload,
);
const saveTransferMoney = ({ onSuccess }) => onSuccess(saveTransferMoneyPayload);
const saveBulkAllocation = ({ onSuccess }) => onSuccess(bulkAllocatedBankTransaction);
const saveBulkUnallocation = ({ onSuccess }) => onSuccess(bulkUnallocatedBankTransaction);
const createBankingRule = ({ onSuccess }) => onSuccess(createBankingRuleResponse);
const applyBankingRule = ({ onSuccess }) => onSuccess(applyBankingRuleResponse);
const loadAttachments = ({ onSuccess }) => onSuccess(attachments);
const uploadAttachment = ({ onSuccess }) => onSuccess(uploadAttachmentResponse);
const removeAttachment = ({ onSuccess }) => onSuccess(successResponse);
const unmatchTransaction = ({ onSuccess }) => onSuccess(unallocatedBankTransaction);
const updateNote = ({ onSuccess }) => onSuccess(updateNoteResponse);

const MemoryBankingMapping = {
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
  [UNMATCH_TRANSACTION]: unmatchTransaction,
  [LOAD_TRANSFER_MONEY]: loadTransferMoney,
  [LOAD_MATCH_TRANSFER_MONEY]: loadMatchTransferMoneyTransactions,
  [SAVE_TRANSFER_MONEY]: saveTransferMoney,
  [CREATE_BANKING_RULE_SPEND_MONEY]: createBankingRule,
  [CREATE_BANKING_RULE_RECEIVE_MONEY]: createBankingRule,
  [CREATE_BANKING_RULE_INVOICE]: createBankingRule,
  [CREATE_BANKING_RULE_BILL]: createBankingRule,
  [APPLY_RULE_TO_TRANSACTIONS]: applyBankingRule,
  [LOAD_ATTACHMENTS]: loadAttachments,
  [UPLOAD_ATTACHMENT]: uploadAttachment,
  [REMOVE_ATTACHMENT]: removeAttachment,
  [SAVE_PENDING_NOTE]: updateNote,
};

export default MemoryBankingMapping;