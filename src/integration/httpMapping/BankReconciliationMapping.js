import {
  CREATE_BANK_RECONCILIATION,
  LOAD_BANK_RECONCILIATION,
  LOAD_BANK_RECONCILIATION_WITH_BANK_ACCOUNT,
  SORT_AND_FILTER_BANK_RECONCILIATION,
  UNDO_BANK_RECONCILIATION,
} from '../../bankReconciliation/BankReconciliationIntents';

const BankReconciliationMapping = {
  [LOAD_BANK_RECONCILIATION]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bankReconciliation/load_bank_reconciliation`,
  },
  [LOAD_BANK_RECONCILIATION_WITH_BANK_ACCOUNT]: {
    method: 'GET',
    getPath: ({ businessId, accountId }) => `/${businessId}/bankReconciliation/load_bank_reconciliation/${accountId}`,
  },
  [SORT_AND_FILTER_BANK_RECONCILIATION]: {
    method: 'GET',
    getPath: ({ businessId, accountId }) => `/${businessId}/bankReconciliation/accounts/${accountId}/filter_bank_reconciliation`,
  },
  [CREATE_BANK_RECONCILIATION]: {
    method: 'POST',
    getPath: ({ businessId, accountId }) => `/${businessId}/bankReconciliation/accounts/${accountId}/create_bank_reconciliation`,
  },
  [UNDO_BANK_RECONCILIATION]: {
    method: 'POST',
    getPath: ({ businessId, accountId }) => `/${businessId}/bankReconciliation/accounts/${accountId}/undo_bank_reconciliation`,
  },
};

export default BankReconciliationMapping;
