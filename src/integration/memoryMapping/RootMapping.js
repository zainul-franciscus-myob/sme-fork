import AccountMapping from './AccountMapping';
import ApplyToSaleMapping from './ApplyToSaleMapping';
import BankFeedsMapping from './BankFeedsMapping';
import BankReconciliationMapping from './BankReconciliationMapping';
import BankingMappings from './BankingMapping';
import BankingRuleBillMapping from './BankingRuleBillMapping';
import BankingRuleInvoiceMapping from './BankingRuleInvoiceMapping';
import BankingRuleMapping from './BankingRuleMapping';
import BankingRuleReceiveMoneyMapping from './BankingRuleReceiveMoneyMapping';
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
import ElectronicPaymentsCreateMapping from './ElectronicPaymentsCreateMapping';
import ElectronicPaymentsReadMapping from './ElectronicPaymentsReadMapping';
import EmployeeMapping from './EmployeeMapping';
import EmployeeTransactionModalMapping from './EmployeeTransactionModalMapping';
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
import LeavePayItemMapping from './LeavePayItemMapping';
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
import SalesSettingsMapping from './SalesSettingsMapping';
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
  ...BankingMappings,
  ...BusinessMapping,
  ...ContactMapping,
  ...GeneralJournalMapping,
  ...IncomeAllocationMapping,
  ...InventoryMapping,
  ...NavigationMapping,
  ...QuoteMapping,
  ...InvoiceMapping,
  ...ReceiveMoneyMapping,
  ...SpendMoneyMapping,
  ...TaxMapping,
  ...JournalTransactionListMapping,
  ...TransferMoneyMapping,
  ...InventoryMapping,
  ...UserMapping,
  ...EmployeeMapping,
  ...InvoicePaymentMapping,
  ...BillPaymentMapping,
  ...BillMapping,
  ...BillDetailMapping,
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
  ...PayRunListMapping,
  ...PayRunDetailMapping,
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
  ...HelpMapping,
  ...BankFeedsMapping,
  ...InventoryModalMapping,
  ...DataImportExportMapping,
  ...ElectronicPaymentsCreateMapping,
  ...ElectronicPaymentsReadMapping,
  ...CustomerStatementMapping,
  ...EmployeeTransactionModalMapping,
  ...CreditsAndDebitsListMapping,
});

export default RootMapping;
