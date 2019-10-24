import AccountMapping from './AccountMapping';
import ApplyToSaleMapping from './ApplyToSaleMapping';
import BankReconciliationMapping from './BankReconciliationMapping';
import BankingMappings from './BankingMapping';
import BankingRuleBillMapping from './BankingRuleBillMapping';
import BankingRuleInvoiceMapping from './BankingRuleInvoiceMapping';
import BankingRuleMapping from './BankingRuleMapping';
import BankingRuleReceiveMoneyMapping from './BankingRuleReceiveMoneyMapping';
import BankingRuleSpendMoneyMapping from './BankingRuleSpendMoneyMapping';
import BillItemMapping from './BillItemMapping';
import BillMapping from './BillMapping';
import BillPaymentMapping from './BillPaymentMapping';
import BillServiceMapping from './BillServiceMapping';
import BusinessMapping from './BusinessMapping';
import ContactMapping from './ContactMapping';
import CustomerReturnMapping from './CustomerReturnMapping';
import DashboardMapping from './DashboardMapping';
import DeductionPayItemMapping from './DeductionPayItemMapping';
import EmployeeMapping from './EmployeeMapping';
import ExpensePayItemMapping from './ExpensePayItemMapping';
import GeneralJournalMapping from './GeneralJournalMapping';
import InTrayMapping from './InTrayMapping';
import IncomeAllocationMapping from './IncomeAllocationMapping';
import InventoryMapping from './InventoryMapping';
import InvoiceMapping from './InvoiceMapping';
import InvoicePaymentMapping from './InvoicePaymentMapping';
import LeavePayItemMapping from './LeavePayItemMapping';
import LinkBillMapping from './LinkBillMapping';
import LinkUserMapping from './LinkUserMapping';
import LinkedAccountsMapping from './LinkedAccountsMapping';
import NavigationMapping from './NavigationMapping';
import PayItemMapping from './PayItemMapping';
import PayRefundMapping from './PayRefundMapping';
import PayRunMapping from './PayRunMapping';
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
  ...BillServiceMapping,
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
  ...BankingRuleSpendMoneyMapping,
  ...BankingRuleReceiveMoneyMapping,
  ...BankingRuleInvoiceMapping,
  ...BankingRuleBillMapping,
  ...PayRunMapping,
  ...LinkBillMapping,
  ...AccountMapping,
  ...LinkUserMapping,
  ...DashboardMapping,
});

export default RootMapping;
