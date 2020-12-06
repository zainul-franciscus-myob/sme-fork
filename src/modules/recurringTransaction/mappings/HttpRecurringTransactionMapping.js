import HttpRecurringInvoiceMapping from '../recurringInvoice/mappings/HttpRecurringInvoiceMapping';
import HttpRecurringTransactionListMapping from '../recurringTransactionList/mappings/HttpRecurringTransactionListMapping';
import HttpRecurringTransactionListModalMapping from '../recurringTransactionListModal/mappings/HttpRecurringTransactionListModalMapping';

const HttpRecurringTransactionMapping = {
  ...HttpRecurringTransactionListMapping,
  ...HttpRecurringTransactionListModalMapping,
  ...HttpRecurringInvoiceMapping,
};

export default HttpRecurringTransactionMapping;
