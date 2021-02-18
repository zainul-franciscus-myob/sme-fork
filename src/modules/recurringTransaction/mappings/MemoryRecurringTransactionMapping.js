import MemoryRecurringBillMapping from '../recurringBill/mappings/MemoryRecurringBillMapping';
import MemoryRecurringInvoiceMapping from '../recurringInvoice/mappings/MemoryRecurringInvoiceMapping';
import MemoryRecurringSpendMoneyMapping from '../recurringSpendMoney/mappings/MemoryRecurringSpendMoneyMapping';
import MemoryRecurringTransactionListMapping from '../recurringTransactionList/mappings/MemoryRecurringTransactionListMapping';
import MemoryRecurringTransactionListModalMapping from '../recurringTransactionListModal/mappings/MemoryRecurringTransactionListModalMapping';
import MemoryRecurringTransactionModalMapping from '../recurringTransactionModal/mappings/MemoryRecurringTransactionModalMapping';

const MemoryRecurringTransactionMapping = {
  ...MemoryRecurringTransactionListMapping,
  ...MemoryRecurringTransactionListModalMapping,
  ...MemoryRecurringTransactionModalMapping,
  ...MemoryRecurringBillMapping,
  ...MemoryRecurringInvoiceMapping,
  ...MemoryRecurringSpendMoneyMapping,
};

export default MemoryRecurringTransactionMapping;
