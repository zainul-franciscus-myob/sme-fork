import HttpRecurringInvoiceMapping from '../recurringInvoice/mappings/HttpRecurringInvoiceMapping';
import HttpRecurringTransactionListMapping from '../recurringTransactionList/mappings/HttpRecurringTransactionListMapping';
import HttpRecurringTransactionListModalMapping from '../recurringTransactionListModal/mappings/HttpRecurringTransactionListModalMapping';
import HttpRecurringTransactionModalMapping from '../recurringTransactionModal/mappings/HttpRecurringTransactionModalMapping';

const HttpRecurringTransactionMapping = {
  ...HttpRecurringTransactionListMapping,
  ...HttpRecurringTransactionListModalMapping,
  ...HttpRecurringTransactionModalMapping,
  ...HttpRecurringInvoiceMapping,
};

export default HttpRecurringTransactionMapping;
