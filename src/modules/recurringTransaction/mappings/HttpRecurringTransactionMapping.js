import HttpRecurringInvoiceMapping from '../recurringInvoice/mappings/HttpRecurringInvoiceMapping';
import HttpRecurringSpendMoneyMapping from '../recurringSpendMoney/mappings/HttpRecurringSpendMoneyMapping';
import HttpRecurringTransactionListMapping from '../recurringTransactionList/mappings/HttpRecurringTransactionListMapping';
import HttpRecurringTransactionListModalMapping from '../recurringTransactionListModal/mappings/HttpRecurringTransactionListModalMapping';
import HttpRecurringTransactionModalMapping from '../recurringTransactionModal/mappings/HttpRecurringTransactionModalMapping';

const HttpRecurringTransactionMapping = {
  ...HttpRecurringTransactionListMapping,
  ...HttpRecurringTransactionListModalMapping,
  ...HttpRecurringTransactionModalMapping,
  ...HttpRecurringInvoiceMapping,
  ...HttpRecurringSpendMoneyMapping,
};

export default HttpRecurringTransactionMapping;
