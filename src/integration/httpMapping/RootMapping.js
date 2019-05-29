import BankingMapping from './BankingMapping';
import BillMapping from './BillMapping';
import BillPaymentMapping from './BillPaymentMapping';
import BusinessMapping from './BusinessMapping';
import ContactMapping from './ContactMapping';
import EmployeeMapping from './EmployeeMapping';
import GeneralJournalMapping from './GeneralJournalMapping';
import IncomeAllocationMapping from './IncomeAllocationMapping';
import InventoryMapping from './InventoryMapping';
import InvoiceMapping from './InvoiceMapping';
import InvoicePaymentMapping from './InvoicePaymentMapping';
import NavigationMapping from './NavigationMapping';
import QuoteMapping from './QuoteMapping';
import ReceiveMoneyMapping from './ReceiveMoneyMapping';
import SpendMoneyMapping from './SpendMoneyMapping';
import TaxMapping from './TaxMapping';
import TransactionListMapping from './TransactionListMapping';
import TransferMoneyMapping from './TransferMoneyMapping';
import UserMapping from './UserMapping';

const RootMapping = Object.freeze({
  ...BusinessMapping,
  ...ContactMapping,
  ...GeneralJournalMapping,
  ...IncomeAllocationMapping,
  ...NavigationMapping,
  ...QuoteMapping,
  ...InvoiceMapping,
  ...ReceiveMoneyMapping,
  ...SpendMoneyMapping,
  ...TransactionListMapping,
  ...TransferMoneyMapping,
  ...TaxMapping,
  ...BankingMapping,
  ...InventoryMapping,
  ...UserMapping,
  ...EmployeeMapping,
  ...InvoicePaymentMapping,
  ...BillPaymentMapping,
  ...BillMapping,
});

export default RootMapping;
