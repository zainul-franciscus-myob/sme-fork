import AccountMapping from '../../modules/account/mappings/MemoryAccountMapping';
import ApplyToSaleMapping from '../../modules/applyToSale/mappings/MemoryApplyToSaleMapping';
import BankFeedsMapping from '../../modules/bankFeeds/mappings/MemoryBankFeedsMapping';
import BankReconciliationMapping from '../../modules/bankReconciliation/mappings/MemoryBankReconciliationMapping';
import BankStatementImportMapping from '../../modules/bankStatementImport/mappings/MemoryBankStatementImportMapping';
import BankingMapping from '../../modules/banking/mappings/MemoryBankingMapping';
import BankingRuleDetailMapping from '../../modules/bankingRules/bankingRuleDetail/mappings/MemoryBankingRuleDetailMapping';
import BankingRuleMapping from '../../modules/bankingRules/bankingRuleList/mappings/MemoryBankingRuleMapping';
import BillDetailMapping from '../../modules/bill/billDetail/mappings/MemoryBillDetailMapping';
import BillMapping from '../../modules/bill/billList/mappings/MemoryBillMapping';
import BillPaymentMapping from '../../modules/billPayment/mappings/MemoryBillPaymentMapping';
import BusinessMapping from '../../modules/business/mappings/MemoryBusinessMapping';
import ContactMapping from '../../modules/contact/mappings/MemoryContactMapping';
import CreditsAndDebitsListMapping from '../../modules/transactionList/creditAndDebitTransactions/mappings/MemoryCreditsAndDebitsListMapping';
import CustomerReturnMapping from '../../modules/customerReturn/mappings/MemoryCustomerReturnMapping';
import CustomerStatementMapping from '../../modules/customerStatement/mappings/MemoryCustomerStatementMapping';
import DashboardMapping from '../../modules/dashboard/mappings/MemoryDashboardMapping';
import DataImportExportMapping from '../../modules/dataImportExport/mappings/MemoryDataImportExportMapping';
import DeductionPayItemMapping from '../../modules/payItem/deductionPayItem/mappings/MemoryDeductionPayItemMapping';
import ElectronicPaymentsCreateMapping from '../../modules/electronicPayments/electronicPaymentsCreate/mappings/MemoryElectronicPaymentsCreateMapping';
import ElectronicPaymentsReadMapping from '../../modules/electronicPayments/electronicPaymentsRead/mappings/MemoryElectronicPaymentsReadMapping';
import EmployeeMapping from '../../modules/employee/mappings/MemoryEmployeeMapping';
import EmployeePayMapping from '../../modules/employeePay/mappings/MemoryEmployeePayMapping';
import ExpensePayItemMapping from '../../modules/payItem/expensePayItem/mappings/MemoryExpensePayItemMapping';
import FileUnavailableMapping from '../../modules/fileUnavailable/mappings/MemoryFileUnavailableMapping';
import GeneralJournalMapping from '../../modules/generalJournal/mappings/MemoryGeneralJournalMapping';
import GlobalBusinessDetailsMapping from '../../root/services/businessDetails/mappings/MemoryBusinessDetailsMapping';
import HelpMapping from './HelpMapping';
import InTrayMapping from '../../modules/inTray/mappings/MemoryInTrayMapping';
import IncomeAllocationMapping from '../../modules/IncomeAllocation/mappings/MemoryIncomeAllocationMapping';
import InventoryMapping from '../../modules/inventory/mappings/MemoryInventoryMapping';
import InventoryModalMapping from './InventoryModalMapping';
import InvoiceMapping from '../../modules/invoice/mappings/MemoryInvoiceMapping';
import InvoicePaymentMapping from '../../modules/invoicePayment/mappings/MemoryInvoicePaymentMapping';
import JournalTransactionListMapping from '../../modules/transactionList/journalTransaction/mappings/MemoryJournalTransactionListMapping';
import LeavePayItemMapping from '../../modules/payItem/leavePayItem/mappings/MemoryLeavePayItemMapping';
import LinkBillMapping from '../../modules/linkBill/mappings/MemoryLinkBillMapping';
import LinkUserMapping from '../../modules/linkUser/mappings/MemoryLinkUserMapping';
import LinkedAccountsMapping from '../../modules/linkedAccounts/mappings/MemoryLinkedAccountsMapping';
import NavigationMapping from './NavigationMapping';
import PayItemMapping from '../../modules/payItem/payItemList/mappings/MemoryPayItemMapping';
import PayRefundMapping from '../../modules/payRefund/mappings/MemoryPayRefundMapping';
import PayRunDetailMapping from '../../modules/payRun/mappings/MemoryPayRunDetailMapping';
import PayRunListMapping from '../../modules/payRun/mappings/MemoryPayRunListMapping';
import PayRunMapping from '../../modules/payRun/mappings/MemoryPayRunMapping';
import PaySuperAuthorisationModalMapping from '../../modules/paySuper/paySuperAuthorisationModal/mappings/MemoryPaySuperAuthorisationModalMapping';
import PaySuperCreateMapping from '../../modules/paySuper/paySuperCreate/mappings/MemoryPaySuperCreateMapping';
import PaySuperListMapping from '../../modules/paySuper/paySuperList/mappings/MemoryPaySuperListMapping';
import PaySuperReadMapping from '../../modules/paySuper/paySuperRead/mappings/MemoryPaySuperReadMapping';
import PaySuperStsLoginMapping from '../../modules/paySuper/stsLoginModal/mappings/MemoryPaySuperStsLoginMapping';
import PayrollSettingsMapping from '../../modules/payrollSettings/mappings/MemoryPayrollSettingsMapping';
import QuoteMapping from '../../modules/quote/mappings/MemoryQuoteMapping';
import ReceiveMoneyMapping from '../../modules/receiveMoney/mappings/MemoryReceiveMoneyMapping';
import ReceiveRefundMapping from '../../modules/receiveRefund/mappings/MemoryReceiveRefundMapping';
import SalesSettingsMapping from '../../modules/salesSettings/mappings/MemorySalesSettingsMapping';
import SettingMapping from './SettingMapping';
import SpendMoneyMapping from '../../modules/spendMoney/mappings/MemorySpendMoneyMapping';
import StpDeclarationMapping from '../../modules/stp/stpDeclarationModal/mappings/MemoryStpDeclarationMapping';
import StpErrorsMapping from '../../modules/stp/stpErrors/mappings/MemoryStpErrorsMapping';
import StpGetStartedMapping from '../../modules/stp/stpGetStarted/mappings/MemoryStpGetStartedMapping';
import StpReportingCentreMapping from '../../modules/stp/reportingCentre/mappings/MemoryStpReportingCentreMapping';
import StpSetupMapping from '../../modules/stp/stpSetup/mappings/MemoryStpSetupMapping';
import SubscriptionMapping from '../../modules/settings/subscription/mappings/MemorySubscriptionMapping';
import SuperFundMapping from '../../modules/superFund/mappings/MemorySuperFundMapping';
import SuperPayItemMapping from '../../modules/payItem/superPayItem/mappings/MemorySuperPayItemMapping';
import SupplierReturnMapping from '../../modules/supplierReturn/mappings/MemorySupplierReturnMapping';
import SupplierReturnPurchaseMapping from '../../modules/supplierReturnPurchase/mappings/MemorySupplierReturnPurchaseMapping';
import TaskMapping from './TaskMapping';
import TaxMapping from '../../modules/tax/mappings/MemoryTaxMapping';
import TemplateMapping from '../../modules/template/mappings/MemoryTemplateMapping';
import TimesheetMapping from '../../modules/timesheet/mappings/MemoryTimesheetMapping';
import TransferMoneyMapping from '../../modules/transferMoney/mappings/MemoryTransferMoneyMapping';
import UserMapping from '../../modules/user/mappings/MemoryUserMapping';
import WagePayItemMapping from '../../modules/payItem/wagePayItem/mappings/MemoryWagePayItemMapping';

const RootMapping = Object.freeze({
  ...BankingMapping,
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
  ...TimesheetMapping,
  ...SuperPayItemMapping,
  ...DeductionPayItemMapping,
  ...ExpensePayItemMapping,
  ...WagePayItemMapping,
  ...LeavePayItemMapping,
  ...InTrayMapping,
  ...LinkedAccountsMapping,
  ...BankingRuleMapping,
  ...BankReconciliationMapping,
  ...BankingRuleDetailMapping,
  ...PayRunMapping,
  ...PaySuperListMapping,
  ...PaySuperReadMapping,
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
  ...SubscriptionMapping,
  ...EmployeePayMapping,
  ...CreditsAndDebitsListMapping,
  ...PaySuperCreateMapping,
  ...SettingMapping,
  ...PaySuperAuthorisationModalMapping,
  ...PaySuperStsLoginMapping,
  ...TaskMapping,
  ...StpGetStartedMapping,
  ...StpErrorsMapping,
  ...StpDeclarationMapping,
  ...StpReportingCentreMapping,
  ...StpSetupMapping,
  ...TemplateMapping,
  ...BankStatementImportMapping,
  ...GlobalBusinessDetailsMapping,
  ...FileUnavailableMapping,
});

export default RootMapping;
