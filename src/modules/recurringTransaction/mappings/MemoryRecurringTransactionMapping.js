import MemoryRecurringInvoiceMapping from '../recurringInvoice/mappings/MemoryRecurringInvoiceMapping';
import MemoryRecurringTransactionListMapping from '../recurringTransactionList/mappings/MemoryRecurringTransactionListMapping';
import MemoryRecurringTransactionListModalMapping from '../recurringTransactionListModal/mappings/MemoryRecurringTransactionListModalMapping';
import MemoryRecurringTransactionModalMapping from '../recurringTransactionModal/mappings/MemoryRecurringTransactionModalMapping';

const MemoryRecurringTransactionMapping = {
  ...MemoryRecurringTransactionListMapping,
  ...MemoryRecurringTransactionListModalMapping,
  ...MemoryRecurringTransactionModalMapping,
  ...MemoryRecurringInvoiceMapping,
};

export default MemoryRecurringTransactionMapping;
