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
import HttpMatchTransactionsMapping from '../tabs/matchTransaction/mappings/HttpMatchTransactionsMapping';

const HttpBankingMapping = {
  [LOAD_BANK_TRANSACTIONS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/banking/load_bank_transactions`,
  },
  [LOAD_BANK_BALANCES]: {
    method: 'GET',
    getPath: ({ businessId, bankAccount }) =>
      `/${businessId}/banking/load_bank_balance/${bankAccount}`,
  },
  [LOAD_BANK_TRANSACTIONS_NEXT_PAGE]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/banking/filter_bank_transactions`,
  },
  [LOAD_ACCOUNT_AFTER_CREATE]: {
    method: 'GET',
    getPath: ({ businessId, accountId }) =>
      `/${businessId}/banking/load_account/${accountId}`,
  },
  [SORT_AND_FILTER_BANK_TRANSACTIONS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/banking/filter_bank_transactions`,
  },
  [ALLOCATE_TRANSACTION]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/banking/allocate_bank_transaction`,
  },
  [BULK_ALLOCATE_TRANSACTIONS]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/banking/bulk_allocate_bank_transactions`,
  },
  [UNALLOCATE_TRANSACTION]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/banking/unallocate_bank_transaction`,
  },
  [BULK_UNALLOCATE_TRANSACTIONS]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/banking/unallocate_bank_transaction`,
  },
  [LOAD_SPLIT_ALLOCATION]: {
    method: 'GET',
    getPath: ({ businessId, type, journalId }) =>
      `/${businessId}/banking/load_split_allocation/${type}/${journalId}`,
  },
  [LOAD_PREFILL_SPLIT_ALLOCATION]: {
    method: 'GET',
    getPath: ({ businessId, bankingRuleId }) =>
      `/${businessId}/banking/load_prefill_split_allocation/${bankingRuleId}`,
  },
  [SAVE_SPLIT_ALLOCATION]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/banking/create_split_allocation`,
  },
  [LOAD_TRANSFER_MONEY]: {
    method: 'GET',
    getPath: ({ businessId, transferMoneyId }) =>
      `/${businessId}/banking/load_transfer_money/${transferMoneyId}`,
  },
  [LOAD_MATCH_TRANSFER_MONEY]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/banking/load_match_transfer_money`,
  },
  [SAVE_TRANSFER_MONEY]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/banking/create_transfer_money`,
  },
  [APPLY_RULE_TO_TRANSACTIONS]: {
    method: 'POST',
    getPath: ({ businessId, bankingRuleId }) =>
      `/${businessId}/banking/apply_banking_rule/${bankingRuleId}`,
  },
  [LOAD_ATTACHMENTS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/banking/load_attachments`,
  },
  [UPLOAD_ATTACHMENT]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/banking/upload_attachment`,
  },
  [OPEN_ATTACHMENT]: {
    method: 'GET',
    getPath: ({ businessId, documentId }) =>
      `/${businessId}/banking/load_attachment_detail/${documentId}`,
  },
  [REMOVE_ATTACHMENT]: {
    method: 'DELETE',
    getPath: ({ businessId, documentId }) =>
      `/${businessId}/banking/delete_attachment/${documentId}`,
  },
  [SAVE_PENDING_NOTE]: {
    method: 'PUT',
    getPath: ({ businessId, transactionId }) =>
      `/${businessId}/banking/update_note/${transactionId}`,
  },
  [LINK_IN_TRAY_DOCUMENT]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/banking/link_in_tray_document`,
  },
  ...HttpMatchTransactionsMapping,
};

export default HttpBankingMapping;
