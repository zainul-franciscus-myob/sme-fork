import BankingMappings from './BankingMapping';
import BillItemMapping from './BillItemMapping';
import BillMapping from './BillMapping';
import BillPaymentMapping from './BillPaymentMapping';
import BusinessMapping from './BusinessMapping';
import ContactMapping from './ContactMapping';
import CustomerReturnMapping from './CustomerReturnMapping';
import EmployeeMapping from './EmployeeMapping';
import GeneralJournalMapping from './GeneralJournalMapping';
import IncomeAllocationMapping from './IncomeAllocationMapping';
import InventoryMapping from './InventoryMapping';
import InvoiceItemMapping from './InvoiceItemMapping';
import InvoiceMapping from './InvoiceMapping';
import InvoicePaymentMapping from './InvoicePaymentMapping';
import InvoiceServiceMapping from './InvoiceServiceMapping';
import NavigationMapping from './NavigationMapping';
import QuoteMapping from './QuoteMapping';
import ReceiveMoneyMapping from './ReceiveMoneyMapping';
import SalesSettingsMapping from './SalesSettingsMapping';
import SpendMoneyMapping from './SpendMoneyMapping';
import TaxMapping from './TaxMapping';
import TransactionListMapping from './TransactionListMapping';
import TransferMoneyMapping from './TransferMoneyMapping';
import UserMapping from './UserMapping';

const RootMapping = Object.freeze({
  ...BankingMappings,
  ...BusinessMapping,
  ...ContactMapping,
  ...GeneralJournalMapping,
  ...IncomeAllocationMapping,
  ...InventoryMapping,
  ...NavigationMapping,
  ...QuoteMapping,
  ...InvoiceMapping,
  ...InvoiceItemMapping,
  ...InvoiceServiceMapping,
  ...ReceiveMoneyMapping,
  ...SpendMoneyMapping,
  ...TaxMapping,
  ...TransactionListMapping,
  ...TransferMoneyMapping,
  ...InventoryMapping,
  ...UserMapping,
  ...EmployeeMapping,
  ...InvoicePaymentMapping,
  ...BillPaymentMapping,
  ...BillMapping,
  ...BillItemMapping,
  ...CustomerReturnMapping,
  ...SalesSettingsMapping,
});

export default RootMapping;
