import MemoryRecurringInvoiceMapping from '../recurringInvoice/mappings/MemoryRecurringInvoiceMapping';
import MemoryRecurringTransactionListMapping from '../recurringTransactionList/mappings/MemoryRecurringTransactionListMapping';
import MemoryRecurringTransactionListModalMapping from '../recurringTransactionListModal/mappings/MemoryRecurringTransactionListModalMapping';

const MemoryRecurringTransactionMapping = {
  ...MemoryRecurringTransactionListMapping,
  ...MemoryRecurringTransactionListModalMapping,
  ...MemoryRecurringInvoiceMapping,
};

export default MemoryRecurringTransactionMapping;
