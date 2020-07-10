import {
  ALLOCATE_TRANSACTION,
  APPLY_RULE_TO_TRANSACTIONS,
  BULK_ALLOCATE_TRANSACTIONS,
  LINK_IN_TRAY_DOCUMENT,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ATTACHMENTS,
  LOAD_BANK_TRANSACTIONS,
  LOAD_BANK_TRANSACTIONS_NEXT_PAGE,
  LOAD_JOB_AFTER_CREATE,
  LOAD_MATCH_TRANSACTIONS,
  LOAD_MATCH_TRANSFER_MONEY,
  LOAD_SPLIT_ALLOCATION,
  LOAD_TRANSFER_MONEY,
  OPEN_ATTACHMENT,
  REMOVE_ATTACHMENT,
  SAVE_MATCH_TRANSACTION,
  SAVE_PENDING_NOTE,
  SAVE_SPLIT_ALLOCATION,
  SAVE_TRANSFER_MONEY,
  SORT_AND_FILTER_BANK_TRANSACTIONS,
  SORT_AND_FILTER_MATCH_TRANSACTIONS,
  UNALLOCATE_TRANSACTION,
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
import attachmentDetailResponse from './data/attachmentDetail';
import attachments from './data/loadAttachmentsResponse';
import bankTransactions from './data/loadBankTransactions';
import bankTransactionsNextPage from './data/loadBankTransactionsNextPage';
import bulkAllocatedBankTransaction from './data/bulkAllocatedBankTransaction';
import createBankingRuleResponse from './data/createBankingRuleResponse';
import filteredBankTransactions from './data/sortAndFilterBankTransactions';
import filteredMatchTransactions from './data/sortAndFilterMatchTransactions';
import linkInTrayDocumentResponse from './data/linkInTrayDocumentResponse';
import loadAddedAccountResponse from './data/loadAddedAccountResponse';
import loadAddedJobResponse from './data/loadAddedJobResponse';
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
const loadBankTransactionsNextPage = ({ onSuccess }) =>
  onSuccess(bankTransactionsNextPage);
const filterBankTransactions = ({ onSuccess }) =>
  onSuccess(filteredBankTransactions);
const allocateBankTransaction = ({ onSuccess }) =>
  onSuccess(allocatedBankTransaction);
const unallocateBankTransaction = ({ onSuccess }) =>
  onSuccess(unallocatedBankTransaction);
const loadSplitAlloation = ({ urlParams, onSuccess }) =>
  onSuccess(
    urlParams.type === 'spend_money' ? loadSpendMoney : loadReceiveMoney
  );
const saveSplitAllocation = ({ onSuccess }) =>
  onSuccess(allocatedBankTransaction);
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
const loadTransferMoney = ({ onSuccess }) => onSuccess(transferMoneyPayload);
const loadMatchTransferMoneyTransactions = ({ onSuccess }) =>
  onSuccess(matchTransferMoneyTransactionsPayload);
const saveTransferMoney = ({ onSuccess }) =>
  onSuccess(saveTransferMoneyPayload);
const saveBulkAllocation = ({ onSuccess }) =>
  onSuccess(bulkAllocatedBankTransaction);
const createBankingRule = ({ onSuccess }) =>
  onSuccess(createBankingRuleResponse);
const applyBankingRule = ({ onSuccess }) => onSuccess(applyBankingRuleResponse);
const loadAttachments = ({ onSuccess }) => onSuccess(attachments);
const uploadAttachment = ({ onSuccess }) => onSuccess(uploadAttachmentResponse);
const openAttachment = ({ onSuccess }) => onSuccess(attachmentDetailResponse);
const removeAttachment = ({ onSuccess }) => onSuccess(successResponse);
const updateNote = ({ onSuccess }) => onSuccess(updateNoteResponse);
const linkInTrayDocument = ({ onSuccess }) =>
  onSuccess(linkInTrayDocumentResponse);
const loadAddedAccount = ({ onSuccess }) => onSuccess(loadAddedAccountResponse);
const loadAddedJob = ({ onSuccess }) => onSuccess(loadAddedJobResponse);

const MemoryBankingMapping = {
  [LOAD_BANK_TRANSACTIONS]: loadBankTransactions,
  [LOAD_BANK_TRANSACTIONS_NEXT_PAGE]: loadBankTransactionsNextPage,
  [SORT_AND_FILTER_BANK_TRANSACTIONS]: filterBankTransactions,
  [ALLOCATE_TRANSACTION]: allocateBankTransaction,
  [BULK_ALLOCATE_TRANSACTIONS]: saveBulkAllocation,
  [UNALLOCATE_TRANSACTION]: unallocateBankTransaction,
  [LOAD_SPLIT_ALLOCATION]: loadSplitAlloation,
  [SAVE_SPLIT_ALLOCATION]: saveSplitAllocation,
  [LOAD_MATCH_TRANSACTIONS]: loadMatchTransactions,
  [SORT_AND_FILTER_MATCH_TRANSACTIONS]: sortAndFilterMatchTransactions,
  [SAVE_MATCH_TRANSACTION]: saveMatchTransaction,
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
  [OPEN_ATTACHMENT]: openAttachment,
  [REMOVE_ATTACHMENT]: removeAttachment,
  [SAVE_PENDING_NOTE]: updateNote,
  [LINK_IN_TRAY_DOCUMENT]: linkInTrayDocument,
  [LOAD_ACCOUNT_AFTER_CREATE]: loadAddedAccount,
  [LOAD_JOB_AFTER_CREATE]: loadAddedJob,
};

export default MemoryBankingMapping;
