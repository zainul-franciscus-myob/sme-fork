import AccountMapping from '../../modules/account/mappings/HttpAccountMapping';
import ActivityMapping from './ActivityMapping';
import ApplyToSaleMapping from '../../modules/applyToSale/mappings/HttpApplyToSaleMapping';
import BankFeedsMapping from '../../modules/bankFeeds/mappings/HttpBankFeedsMapping';
import BankReconciliationMapping from '../../modules/bankReconciliation/mappings/HttpBankReconciliationMapping';
import BankingMapping from './BankingMapping';
import BankingRuleBillMapping from '../../modules/bankingRules/bankingRuleBill/mappings/HttpBankingRuleBillMapping';
import BankingRuleInvoiceMapping from '../../modules/bankingRules/bankingRuleInvoice/mappings/HttpBankingRuleInvoiceMapping';
import BankingRuleMapping from '../../modules/bankingRules/bankingRuleList/mappings/HttpBankingRuleMapping';
import BankingRuleReceiveMoneyMapping from '../../modules/bankingRules/bankingRuleReceiveMoney/mappings/HttpBankingRuleReceiveMoneyMapping';
import BankingRuleSpendMoneyMapping from '../../modules/bankingRules/bankingRuleSpendMoney/mappings/HttpBankingRuleSpendMoneyMapping';
import BillDetailMapping from './BillDetailMapping';
import BillMapping from './BillMapping';
import BillPaymentMapping from '../../modules/billPayment/mappings/HttpBillPaymentMapping';
import BusinessMapping from '../../modules/business/mappings/HttpBusinessMapping';
import ContactMapping from '../../modules/contact/mappings/HttpContactMapping';
import CreditsAndDebitsListMapping from '../../modules/transactionList/creditAndDebitTransactions/mappings/HttpCreditsAndDebitsListMapping';
import CustomerReturnMapping from '../../modules/customerReturn/mappings/HttpCustomerReturnMapping';
import CustomerStatementMapping from '../../modules/customerStatement/mappings/HttpCustomerStatementMapping';
import DashboardMapping from '../../modules/dashboard/mappings/HttpDashboardMapping';
import DataImportExportMapping from '../../modules/dataImportExport/mappings/HttpDataImportExportMapping';
import DeductionPayItemMapping from '../../modules/payItem/deductionPayItem/mappings/HttpDeductionPayItemMapping';
import ElectronicPaymentsCreateMapping from '../../modules/electronicPayments/electronicPaymentsCreate/mappings/HttpElectronicPaymentsCreateMapping';
import ElectronicPaymentsReadMapping from '../../modules/electronicPayments/electronicPaymentsRead/mappings/HttpElectronicPaymentsReadMapping';
import EmployeeMapping from '../../modules/employee/mappings/HttpEmployeeMapping';
import EmployeePayMapping from '../../modules/employeePay/mappings/HttpEmployeePayMapping';
import ExpensePayItemMapping from '../../modules/payItem/expensePayItem/mappings/HttpExpensePayItemMapping';
import GeneralJournalMapping from '../../modules/generalJournal/mappings/HttpGeneralJournalMapping';
import HelpMapping from './HelpMapping';
import InTrayMapping from '../../modules/inTray/mappings/HttpInTrayMapping';
import IncomeAllocationMapping from '../../modules/IncomeAllocation/mappings/HttpIncomeAllocationMapping';
import InventoryMapping from '../../modules/inventory/mappings/HttpInventoryMapping';
import InventoryModalMapping from './InventoryModalMapping';
import InvoiceMapping from './InvoiceMapping';
import InvoicePaymentMapping from '../../modules/invoicePayment/mappings/HttpInvoicePaymentMapping';
import JournalTransactionListMapping from '../../modules/transactionList/journalTransaction/mappings/HttpJournalTransactionListMapping';
import LeavePayItemMapping from '../../modules/payItem/leavePayItem/mappings/HttpLeavePayItemMapping';
import LinkBillMapping from '../../modules/linkBill/mappings/HttpLinkBillMapping';
import LinkUserMapping from '../../modules/linkUser/mappings/HttpLinkUserMapping';
import LinkedAccountsMapping from '../../modules/linkedAccounts/mappings/HttpLinkedAccountsMapping';
import NavigationMapping from './NavigationMapping';
import PayItemMapping from '../../modules/payItem/payItemList/mappings/HttpPayItemMapping';
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
import SalesSettingsMapping from '../../modules/salesSettings/mappings/HttpSalesSettingsMapping';
import SettingMapping from './SettingMapping';
import SpendMoneyMapping from '../../modules/spendMoney/mappings/HttpSpendMoneyMapping';
import StpGetStartedMapping from '../../modules/stp/stpGetStarted/mappings/HttpStpGetStartedMapping';
import SubscriptionMapping from './SubscriptionMapping';
import SuperFundMapping from '../../modules/superFund/mappings/HttpSuperFundMapping';
import SuperPayItemMapping from '../../modules/payItem/superPayItem/mappings/HttpSuperPayItemMapping';
import SupplierReturnMapping from '../../modules/supplierReturn/mappings/HttpSupplierReturnMapping';
import SupplierReturnPurchaseMapping from '../../modules/supplierReturnPurchase/mappings/HttpSupplierReturnPurchaseMapping';
import TaxMapping from '../../modules/tax/mappings/HttpTaxMapping';
import TransferMoneyMapping from '../../modules/transferMoney/mappings/HttpTransferMoneyMapping';
import UserMapping from '../../modules/user/mappings/HttpUserMapping';
import WagePayItemMapping from '../../modules/payItem/wagePayItem/mappings/HttpWagePayItemMapping';

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
  ...SalesSettingsMapping,
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
  ...LeavePayItemMapping,
  ...InTrayMapping,
  ...ExpensePayItemMapping,
  ...LinkedAccountsMapping,
  ...BankingRuleMapping,
  ...BankReconciliationMapping,
  ...BankingRuleSpendMoneyMapping,
  ...BankingRuleReceiveMoneyMapping,
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
  ...StpGetStartedMapping,
});

export default RootMapping;
