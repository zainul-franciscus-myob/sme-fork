import AccountMapping from '../../modules/account/mappings/HttpAccountMapping';
import ActivityMapping from './ActivityMapping';
import ApplyToSaleMapping from '../../modules/applyToSale/mappings/HttpApplyToSaleMapping';
import BankFeedsMapping from '../../modules/bankFeeds/mappings/HttpBankFeedsMapping';
import BankReconciliationMapping from '../../modules/bankReconciliation/mappings/HttpBankReconciliationMapping';
import BankingMapping from './BankingMapping';
import BankingRuleBillMapping from './BankingRuleBillMapping';
import BankingRuleInvoiceMapping from './BankingRuleInvoiceMapping';
import BankingRuleMapping from './BankingRuleMapping';
import BankingRuleRecieveMoneyMapping from './BankingRuleRecieveMoneyMapping';
import BankingRuleSpendMoneyMapping from './BankingRuleSpendMoneyMapping';
import BillDetailMapping from './BillDetailMapping';
import BillMapping from './BillMapping';
import BillPaymentMapping from '../../modules/billPayment/mappings/HttpBillPaymentMapping';
import BusinessMapping from '../../modules/business/mappings/HttpBusinessMapping';
import ContactMapping from '../../modules/contact/mappings/HttpContactMapping';
import CreditsAndDebitsListMapping from './CreditsAndDebitsListMapping';
import CustomerReturnMapping from '../../modules/customerReturn/mappings/HttpCustomerReturnMapping';
import CustomerStatementMapping from '../../modules/customerStatement/mappings/HttpCustomerStatementMapping';
import DashboardMapping from '../../modules/dashboard/mappings/HttpDashboardMapping';
import DataImportExportMapping from '../../modules/dataImportExport/mappings/HttpDataImportExportMapping';
import DeductionPayItemMapping from './DeductionPayItemMapping';
import ElectronicPaymentsCreateMapping from './ElectronicPaymentsCreateMapping';
import ElectronicPaymentsReadMapping from './ElectronicPaymentsReadMapping';
import EmployeeMapping from '../../modules/employee/mappings/HttpEmployeeMapping';
import EmployeePayMapping from '../../modules/employeePay/mappings/HttpEmployeePayMapping';
import ExpensePayItemMapping from './ExpensePayItemMapping';
import GeneralJournalMapping from '../../modules/generalJournal/mappings/HttpGeneralJournalMapping';
import HelpMapping from './HelpMapping';
import InTrayMapping from '../../modules/inTray/mappings/HttpInTrayMapping';
import IncomeAllocationMapping from '../../modules/IncomeAllocation/mappings/HttpIncomeAllocationMapping';
import InventoryMapping from '../../modules/inventory/mappings/HttpInventoryMapping';
import InventoryModalMapping from './InventoryModalMapping';
import InvoiceMapping from './InvoiceMapping';
import InvoicePaymentMapping from '../../modules/invoicePayment/mappings/HttpInvoicePaymentMapping';
import JournalTransactionListMapping from './JournalTransactionListMapping';
import LeavePayItemMApping from './LeavePayItemMapping';
import LinkBillMapping from '../../modules/linkBill/mappings/HttpLinkBillMapping';
import LinkUserMapping from '../../modules/linkUser/mappings/HttpLinkUserMapping';
import LinkedAccountsMapping from '../../modules/linkedAccounts/mappings/HttpLinkedAccountsMapping';
import NavigationMapping from './NavigationMapping';
import PayItemMapping from './PayItemMapping';
import PayRefundMapping from '../../modules/payRefund/mappings/HttpPayRefundMapping';
import PayRunDetailMapping from './PayRunDetailMapping';
import PayRunDetailOldMapping from './PayRunDetailOldMapping';
import PayRunListMapping from './PayRunListMapping';
import PayRunListOldMapping from './PayRunListOldMapping';
import PayRunMapping from './PayRunMapping';
import PayRunOldMapping from './PayRunOldMapping';
import PaySuperAuthorisationModalMapping from './PaySuperAuthorisationModalMapping';
import PaySuperCreateMapping from './PaySuperCreateMapping';
import PaySuperMapping from './PaySuperMapping';
import PaySuperReadMapping from './PaySuperReadMapping';
import PayrollSettingsMapping from './PayrollSettingsMapping';
import QuoteMapping from '../../modules/quote/mappings/HttpQuoteMapping';
import ReceiveMoneyMapping from '../../modules/receiveMoney/mappings/HttpReceiveMoneyMapping';
import ReceiveRefundMapping from '../../modules/receiveRefund/mappings/HttpReceiveRefundMapping';
import SaleSettingMapping from './SalesSettingsMapping';
import SettingMapping from './SettingMapping';
import SpendMoneyMapping from '../../modules/spendMoney/mappings/HttpSpendMoneyMapping';
import SubscriptionMapping from './SubscriptionMapping';
import SuperFundMapping from '../../modules/superFund/mappings/HttpSuperFundMapping';
import SuperPayItemMapping from './SuperPayItemMapping';
import SupplierReturnMapping from '../../modules/supplierReturn/mappings/HttpSupplierReturnMapping';
import SupplierReturnPurchaseMapping from '../../modules/supplierReturnPurchase/mappings/HttpSupplierReturnPurchaseMapping';
import TaxMapping from '../../modules/tax/mappings/HttpTaxMapping';
import TransferMoneyMapping from '../../modules/transferMoney/mappings/HttpTransferMoneyMapping';
import UserMapping from '../../modules/user/mappings/HttpUserMapping';
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
  ...PayRunOldMapping,
  ...PaySuperMapping,
  ...PaySuperReadMapping,
  ...PayRunListMapping,
  ...PayRunListOldMapping,
  ...PayRunDetailOldMapping,
  ...AccountMapping,
  ...LinkBillMapping,
  ...LinkUserMapping,
  ...DashboardMapping,
  ...HelpMapping,
  ...InventoryModalMapping,
  ...PayRunDetailMapping,
  ...BankFeedsMapping,
  ...DataImportExportMapping,
  ...ElectronicPaymentsCreateMapping,
  ...ElectronicPaymentsReadMapping,
  ...CustomerStatementMapping,
  ...SubscriptionMapping,
  ...EmployeePayMapping,
  ...CreditsAndDebitsListMapping,
  ...SettingMapping,
  ...ActivityMapping,
  ...PaySuperCreateMapping,
  ...PaySuperAuthorisationModalMapping,
});

export default RootMapping;
