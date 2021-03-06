import {
  ALLOCATE_TRANSACTION,
  APPLY_RULE_TO_TRANSACTIONS,
  BULK_ALLOCATE_TRANSACTIONS,
  BULK_UNALLOCATE_TRANSACTIONS,
  LINK_IN_TRAY_DOCUMENT,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ATTACHMENTS,
  LOAD_BANK_BALANCES,
  LOAD_BANK_TRANSACTIONS,
  LOAD_BANK_TRANSACTIONS_NEXT_PAGE,
  LOAD_MATCH_TRANSFER_MONEY,
  LOAD_PREFILL_SPLIT_ALLOCATION,
  LOAD_SPLIT_ALLOCATION,
  LOAD_TRANSFER_MONEY,
  OPEN_ATTACHMENT,
  REMOVE_ATTACHMENT,
  SAVE_PENDING_NOTE,
  SAVE_SPLIT_ALLOCATION,
  SAVE_TRANSFER_MONEY,
  SORT_AND_FILTER_BANK_TRANSACTIONS,
  UNALLOCATE_TRANSACTION,
  UPLOAD_ATTACHMENT,
} from '../BankingIntents';
import MemoryMatchTransactionsMapping from '../tabs/matchTransaction/mappings/MemoryMatchTransactionsMapping';
import allocatedBankTransaction from './data/allocatedBankTransaction';
import applyBankingRuleResponse from './data/applyBankingRuleResponse.json';
import attachmentDetailResponse from './data/attachmentDetail';
import attachments from './data/loadAttachmentsResponse';
import bankBalances from './data/loadBankBalances';
import bankTransactions from './data/loadBankTransactions';
import bankTransactionsNextPage from './data/loadBankTransactionsNextPage';
import bulkAllocatedBankTransaction from './data/bulkAllocatedBankTransaction';
import bulkUnallocatedBankTransactions from './data/bulkUnallocatedBankTransactions';
import filteredBankTransactions from './data/sortAndFilterBankTransactions';
import linkInTrayDocumentResponse from './data/linkInTrayDocumentResponse';
import loadAddedAccountResponse from './data/loadAddedAccountResponse';
import loadPrefillSplitAllocationResponse from './data/loadPrefillSplitAllocation';
import loadReceiveMoney from './data/loadReceiveMoney';
import loadSpendMoney from './data/loadSpendMoney';
import matchTransferMoneyTransactionsPayload from './data/loadMatchTransferMoneyTransactions';
import saveTransferMoneyPayload from './data/saveTransferMoney';
import successResponse from './data/success';
import transferMoneyPayload from './data/loadTransferMoney';
import unallocatedBankTransaction from './data/unallocatedBankTransaction';
import updateNoteResponse from './data/updateBankFeedNoteResponse';
import uploadAttachmentResponse from './data/uploadAttachmentResponse';

const loadBankTransactions = ({ onSuccess }) => onSuccess(bankTransactions);
const loadBankBalances = ({ onSuccess }) => onSuccess(bankBalances);
const loadBankTransactionsNextPage = ({ onSuccess }) =>
  onSuccess(bankTransactionsNextPage);
const filterBankTransactions = ({ onSuccess }) =>
  onSuccess(filteredBankTransactions);
const allocateBankTransaction = ({ onSuccess }) =>
  onSuccess(allocatedBankTransaction);
const unallocateBankTransaction = ({ onSuccess }) =>
  onSuccess(unallocatedBankTransaction);
const bulkUnallocateBankTransactions = ({ onSuccess }) =>
  onSuccess(bulkUnallocatedBankTransactions);
const loadSplitAlloation = ({ urlParams, onSuccess }) =>
  onSuccess(
    urlParams.type === 'spend_money' ? loadSpendMoney : loadReceiveMoney
  );
const loadPrefillSplitAllocation = ({ onSuccess }) =>
  onSuccess(loadPrefillSplitAllocationResponse);
const saveSplitAllocation = ({ onSuccess }) =>
  onSuccess(allocatedBankTransaction);
const loadTransferMoney = ({ onSuccess }) => onSuccess(transferMoneyPayload);
const loadMatchTransferMoneyTransactions = ({ onSuccess }) =>
  onSuccess(matchTransferMoneyTransactionsPayload);
const saveTransferMoney = ({ onSuccess }) =>
  onSuccess(saveTransferMoneyPayload);
const saveBulkAllocation = ({ onSuccess }) =>
  onSuccess(bulkAllocatedBankTransaction);
const applyBankingRule = ({ onSuccess }) => onSuccess(applyBankingRuleResponse);
const loadAttachments = ({ onSuccess }) => onSuccess(attachments);
const uploadAttachment = ({ onSuccess }) => onSuccess(uploadAttachmentResponse);
const openAttachment = ({ onSuccess }) => onSuccess(attachmentDetailResponse);
const removeAttachment = ({ onSuccess }) => onSuccess(successResponse);
const updateNote = ({ onSuccess }) => onSuccess(updateNoteResponse);
const linkInTrayDocument = ({ onSuccess }) =>
  onSuccess(linkInTrayDocumentResponse);
const loadAddedAccount = ({ onSuccess }) => onSuccess(loadAddedAccountResponse);

const MemoryBankingMapping = {
  [LOAD_BANK_TRANSACTIONS]: loadBankTransactions,
  [LOAD_BANK_BALANCES]: loadBankBalances,
  [LOAD_BANK_TRANSACTIONS_NEXT_PAGE]: loadBankTransactionsNextPage,
  [SORT_AND_FILTER_BANK_TRANSACTIONS]: filterBankTransactions,
  [ALLOCATE_TRANSACTION]: allocateBankTransaction,
  [BULK_ALLOCATE_TRANSACTIONS]: saveBulkAllocation,
  [UNALLOCATE_TRANSACTION]: unallocateBankTransaction,
  [BULK_UNALLOCATE_TRANSACTIONS]: bulkUnallocateBankTransactions,
  [LOAD_SPLIT_ALLOCATION]: loadSplitAlloation,
  [LOAD_PREFILL_SPLIT_ALLOCATION]: loadPrefillSplitAllocation,
  [SAVE_SPLIT_ALLOCATION]: saveSplitAllocation,
  [LOAD_TRANSFER_MONEY]: loadTransferMoney,
  [LOAD_MATCH_TRANSFER_MONEY]: loadMatchTransferMoneyTransactions,
  [SAVE_TRANSFER_MONEY]: saveTransferMoney,
  [APPLY_RULE_TO_TRANSACTIONS]: applyBankingRule,
  [LOAD_ATTACHMENTS]: loadAttachments,
  [UPLOAD_ATTACHMENT]: uploadAttachment,
  [OPEN_ATTACHMENT]: openAttachment,
  [REMOVE_ATTACHMENT]: removeAttachment,
  [SAVE_PENDING_NOTE]: updateNote,
  [LINK_IN_TRAY_DOCUMENT]: linkInTrayDocument,
  [LOAD_ACCOUNT_AFTER_CREATE]: loadAddedAccount,
  ...MemoryMatchTransactionsMapping,
};

export default MemoryBankingMapping;
