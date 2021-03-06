import {
  CREATE_BANK_RECONCILIATION,
  LOAD_BANK_RECONCILIATION,
  LOAD_BANK_RECONCILIATION_WITH_BANK_ACCOUNT,
  SORT_AND_FILTER_BANK_RECONCILIATION,
  UNDO_BANK_RECONCILIATION,
} from '../BankReconciliationIntents';
import bankReconciliation from './data/loadBankReconciliation';
import sortAndFilterResult from './data/sortAndFilterBankReconsiliation';
import successMessage from './data/success.json';

const loadBankReconciliation = ({ onSuccess }) => onSuccess(bankReconciliation);
const sortAndFilterBankReconciliation = ({ onSuccess }) =>
  onSuccess(sortAndFilterResult);
const createBankReconciliation = ({ onSuccess }) => onSuccess(successMessage);
const undoBankReconciliation = ({ onSuccess }) => onSuccess(successMessage);

const MemoryBankReconciliationMapping = {
  [LOAD_BANK_RECONCILIATION]: loadBankReconciliation,
  [LOAD_BANK_RECONCILIATION_WITH_BANK_ACCOUNT]: loadBankReconciliation,
  [SORT_AND_FILTER_BANK_RECONCILIATION]: sortAndFilterBankReconciliation,
  [CREATE_BANK_RECONCILIATION]: createBankReconciliation,
  [UNDO_BANK_RECONCILIATION]: undoBankReconciliation,
};

export default MemoryBankReconciliationMapping;
