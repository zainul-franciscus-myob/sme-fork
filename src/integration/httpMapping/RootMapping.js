import AccountMapping from './AccountMapping';
import ApplyToSaleMapping from './ApplyToSaleMapping';
import BankFeedsMapping from './BankFeedsMapping';
import BankReconciliationMapping from './BankReconciliationMapping';
import BankingMapping from './BankingMapping';
import BankingRuleBillMapping from './BankingRuleBillMapping';
import BankingRuleInvoiceMapping from './BankingRuleInvoiceMapping';
import BankingRuleMapping from './BankingRuleMapping';
import BankingRuleRecieveMoneyMapping from './BankingRuleRecieveMoneyMapping';
import BankingRuleSpendMoneyMapping from './BankingRuleSpendMoneyMapping';
import BillDetailMapping from './BillDetailMapping';
import BillMapping from './BillMapping';
import BillPaymentMapping from './BillPaymentMapping';
import BusinessMapping from './BusinessMapping';
import ContactMapping from './ContactMapping';
import CreditsAndDebitsListMapping from './CreditsAndDebitsListMapping';
import CustomerReturnMapping from './CustomerReturnMapping';
import CustomerStatementMapping from './CustomerStatementMapping';
import DashboardMapping from './DashboardMapping';
import DataImportExportMapping from './DataImportExportMapping';
import DeductionPayItemMapping from './DeductionPayItemMapping';
import ElectronicPaymentsMapping from './ElectronicPaymentsMapping';
import EmployeeMapping from './EmployeeMapping';
import ExpensePayItemMapping from './ExpensePayItemMapping';
import GeneralJournalMapping from './GeneralJournalMapping';
import HelpMapping from './HelpMapping';
import InTrayMapping from './InTrayMapping';
import IncomeAllocationMapping from './IncomeAllocationMapping';
import InventoryMapping from './InventoryMapping';
import InventoryModalMapping from './InventoryModalMapping';
import InvoiceMapping from './InvoiceMapping';
import InvoicePaymentMapping from './InvoicePaymentMapping';
import JournalTransactionListMapping from './JournalTransactionListMapping';
import LeavePayItemMApping from './LeavePayItemMapping';
import LinkBillMapping from './LinkBillMapping';
import LinkUserMapping from './LinkUserMapping';
import LinkedAccountsMapping from './LinkedAccountsMapping';
import NavigationMapping from './NavigationMapping';
import PayItemMapping from './PayItemMapping';
import PayRefundMapping from './PayRefundMapping';
import PayRunDetailMapping from './PayRunDetailMapping';
import PayRunListMapping from './PayRunListMapping';
import PayRunMapping from './PayRunMapping';
import PayrollSettingsMapping from './PayrollSettingsMapping';
import QuoteMapping from './QuoteMapping';
import ReceiveMoneyMapping from './ReceiveMoneyMapping';
import ReceiveRefundMapping from './ReceiveRefundMapping';
import SaleSettingMapping from './SalesSettingsMapping';
import SpendMoneyMapping from './SpendMoneyMapping';
import SuperFundMapping from './SuperFundMapping';
import SuperPayItemMapping from './SuperPayItemMapping';
import SupplierReturnMapping from './SupplierReturnMapping';
import SupplierReturnPurchaseMapping from './SupplierReturnPurchaseMapping';
import TaxMapping from './TaxMapping';
import TransferMoneyMapping from './TransferMoneyMapping';
import UserMapping from './UserMapping';
import WagePayItemMapping from './WagePayItemMapping';

const RootMapping = Object.freeze({
  ...DeductionPayItemMapping,
  ...BusinessMapping,
  ...ContactMapping,
  ...GeneralJournalMapping,
  ...IncomeAllocationMapping,
  ...NavigationMapping,
  ...QuoteMapping,
  ...InvoiceMapping,
  ...ReceiveMoneyMapping,
  ...SpendMoneyMapping,
  ...JournalTransactionListMapping,
  ...TransferMoneyMapping,
  ...TaxMapping,
  ...BankingMapping,
  ...InventoryMapping,
  ...UserMapping,
  ...EmployeeMapping,
  ...InvoicePaymentMapping,
  ...BillPaymentMapping,
  ...BillMapping,
  ...BillDetailMapping,
  ...CustomerReturnMapping,
  ...SaleSettingMapping,
  ...PayrollSettingsMapping,
  ...SupplierReturnMapping,
  ...ReceiveRefundMapping,
  ...SupplierReturnPurchaseMapping,
  ...PayRefundMapping,
  ...ApplyToSaleMapping,
  ...SuperFundMapping,
  ...PayItemMapping,
  ...SuperPayItemMapping,
  ...WagePayItemMapping,
  ...LeavePayItemMApping,
  ...InTrayMapping,
  ...ExpensePayItemMapping,
  ...LinkedAccountsMapping,
  ...BankingRuleMapping,
  ...BankReconciliationMapping,
  ...BankingRuleSpendMoneyMapping,
  ...BankingRuleRecieveMoneyMapping,
  ...BankingRuleInvoiceMapping,
  ...BankingRuleBillMapping,
  ...PayRunMapping,
  ...PayRunListMapping,
  ...AccountMapping,
  ...LinkBillMapping,
  ...LinkUserMapping,
  ...DashboardMapping,
  ...HelpMapping,
  ...InventoryModalMapping,
  ...PayRunDetailMapping,
  ...BankFeedsMapping,
  ...DataImportExportMapping,
  ...ElectronicPaymentsMapping,
  ...CustomerStatementMapping,
  ...CreditsAndDebitsListMapping,
});

export default RootMapping;
