import BankingMapping from './BankingMapping';
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
import PayrollSettingsMapping from './PayrollSettingsMapping';
import QuoteMapping from './QuoteMapping';
import QuoteServiceMapping from './QuoteServiceMapping';
import ReceiveMoneyMapping from './ReceiveMoneyMapping';
import ReceiveRefundMapping from './ReceiveRefundMapping';
import SaleSettingMapping from './SalesSettingsMapping';
import SpendMoneyMapping from './SpendMoneyMapping';
import SupplierReturnMapping from './SupplierReturnMapping';
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
  ...QuoteServiceMapping,
  ...InvoiceMapping,
  ...InvoiceServiceMapping,
  ...InvoiceItemMapping,
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
  ...BillItemMapping,
  ...CustomerReturnMapping,
  ...SaleSettingMapping,
  ...PayrollSettingsMapping,
  ...SupplierReturnMapping,
  ...ReceiveRefundMapping,
});

export default RootMapping;
