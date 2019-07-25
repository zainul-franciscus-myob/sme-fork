import ApplyToSaleMapping from './ApplyToSaleMapping';
import BankReconciliationMapping from './BankReconciliationMapping';
import BankingMappings from './BankingMapping';
import BankingRuleMapping from './BankingRuleMapping';
import BillItemMapping from './BillItemMapping';
import BillMapping from './BillMapping';
import BillPaymentMapping from './BillPaymentMapping';
import BusinessMapping from './BusinessMapping';
import ContactMapping from './ContactMapping';
import CustomerReturnMapping from './CustomerReturnMapping';
import DeductionPayItemMapping from './DeductionPayItemMapping';
import EmployeeMapping from './EmployeeMapping';
import ExpensePayItemMapping from './ExpensePayItemMapping';
import GeneralJournalMapping from './GeneralJournalMapping';
import InTrayMapping from './InTrayMapping';
import IncomeAllocationMapping from './IncomeAllocationMapping';
import InventoryMapping from './InventoryMapping';
import InvoiceItemMapping from './InvoiceItemMapping';
import InvoiceMapping from './InvoiceMapping';
import InvoicePaymentMapping from './InvoicePaymentMapping';
import InvoiceServiceMapping from './InvoiceServiceMapping';
import LeavePayItemMapping from './LeavePayItemMapping';
import LinkedAccountsMapping from './LinkedAccountsMapping';
import NavigationMapping from './NavigationMapping';
import PayItemMapping from './PayItemMapping';
import PayRefundMapping from './PayRefundMapping';
import PayrollSettingsMapping from './PayrollSettingsMapping';
import QuoteItemMapping from './QuoteItemMapping';
import QuoteMapping from './QuoteMapping';
import QuoteServiceMapping from './QuoteServiceMapping';
import ReceiveMoneyMapping from './ReceiveMoneyMapping';
import ReceiveRefundMapping from './ReceiveRefundMapping';
import SalesSettingsMapping from './SalesSettingsMapping';
import SpendMoneyMapping from './SpendMoneyMapping';
import SuperFundMapping from './SuperFundMapping';
import SuperPayItemMapping from './SuperPayItemMapping';
import SupplierReturnMapping from './SupplierReturnMapping';
import SupplierReturnPurchaseMapping from './SupplierReturnPurchaseMapping';
import TaxMapping from './TaxMapping';
import TransactionListMapping from './TransactionListMapping';
import TransferMoneyMapping from './TransferMoneyMapping';
import UserMapping from './UserMapping';
import WagePayItemMapping from './WagePayItemMapping';

const RootMapping = Object.freeze({
  ...BankingMappings,
  ...BusinessMapping,
  ...ContactMapping,
  ...GeneralJournalMapping,
  ...IncomeAllocationMapping,
  ...InventoryMapping,
  ...NavigationMapping,
  ...QuoteMapping,
  ...QuoteItemMapping,
  ...QuoteServiceMapping,
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
  ...PayrollSettingsMapping,
  ...SuperFundMapping,
  ...SupplierReturnMapping,
  ...ReceiveRefundMapping,
  ...SupplierReturnPurchaseMapping,
  ...PayRefundMapping,
  ...ApplyToSaleMapping,
  ...PayItemMapping,
  ...SuperPayItemMapping,
  ...DeductionPayItemMapping,
  ...ExpensePayItemMapping,
  ...WagePayItemMapping,
  ...LeavePayItemMapping,
  ...InTrayMapping,
  ...LinkedAccountsMapping,
  ...BankingRuleMapping,
  ...BankReconciliationMapping,
});

export default RootMapping;
