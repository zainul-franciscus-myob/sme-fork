import AccountMapping from '../../modules/account/mappings/HttpAccountMapping';
import ApplyToSaleMapping from '../../modules/applyToSale/mappings/HttpApplyToSaleMapping';
import BankFeedsMapping from '../../modules/bankFeeds/mappings/HttpBankFeedsMapping';
import BankReconciliationMapping from '../../modules/bankReconciliation/mappings/HttpBankReconciliationMapping';
import BankStatementImportMapping from '../../modules/bankStatementImport/mappings/HttpBankStatementImportMapping';
import BankingMapping from '../../modules/banking/mappings/HttpBankingMapping';
import BankingRuleDetailMapping from '../../modules/bankingRules/bankingRuleDetail/mappings/HttpBankingRuleDetailMapping';
import BankingRuleMapping from '../../modules/bankingRules/bankingRuleList/mappings/HttpBankingRuleMapping';
import BillDetailMapping from '../../modules/bill/billDetail/mappings/HttpBillDetailMapping';
import BillMapping from '../../modules/bill/billList/mappings/HttpBillMapping';
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
import FeatureTogglesMapping from '../../featureToggles/mappings/HttpFeatureTogglesMapping';
import FileUnavailableMapping from '../../modules/fileUnavailable/mappings/HttpFileUnavailableMapping';
import GeneralJournalMapping from '../../modules/generalJournal/mappings/HttpGeneralJournalMapping';
import HelpMapping from './HelpMapping';
import InTrayMapping from '../../modules/inTray/mappings/HttpInTrayMapping';
import IncomeAllocationMapping from '../../modules/IncomeAllocation/mappings/HttpIncomeAllocationMapping';
import InventoryMapping from '../../modules/inventory/mappings/HttpInventoryMapping';
import InventoryModalMapping from './InventoryModalMapping';
import InvoiceMapping from '../../modules/invoice/mappings/HttpInvoiceMapping';
import InvoicePaymentMapping from '../../modules/invoicePayment/mappings/HttpInvoicePaymentMapping';
import JournalTransactionListMapping from '../../modules/transactionList/journalTransaction/mappings/HttpJournalTransactionListMapping';
import LeavePayItemMapping from '../../modules/payItem/leavePayItem/mappings/HttpLeavePayItemMapping';
import LinkBillMapping from '../../modules/linkBill/mappings/HttpLinkBillMapping';
import LinkUserMapping from '../../modules/linkUser/mappings/HttpLinkUserMapping';
import LinkedAccountsMapping from '../../modules/linkedAccounts/mappings/HttpLinkedAccountsMapping';
import NavigationMapping from './NavigationMapping';
import PayItemMapping from '../../modules/payItem/payItemList/mappings/HttpPayItemMapping';
import PayRefundMapping from '../../modules/payRefund/mappings/HttpPayRefundMapping';
import PayRunDetailMapping from '../../modules/payRun/mappings/HttpPayRunDetailMapping';
import PayRunListMapping from '../../modules/payRun/mappings/HttpPayRunListMapping';
import PayRunMapping from '../../modules/payRun/mappings/HttpPayRunMapping';
import PaySuperAuthorisationModalMapping from '../../modules/paySuper/paySuperAuthorisationModal/mappings/HttpPaySuperAuthorisationModalMapping';
import PaySuperCreateMapping from '../../modules/paySuper/paySuperCreate/mappings/HttpPaySuperCreateMapping';
import PaySuperListMapping from '../../modules/paySuper/paySuperList/mappings/HttpPaySuperListMapping';
import PaySuperReadMapping from '../../modules/paySuper/paySuperRead/mappings/HttpPaySuperReadMapping';
import PaySuperStsLoginMapping from '../../modules/paySuper/stsLoginModal/mappings/HttpPaySuperStsLoginMapping';
import PayrollSettingsMapping from '../../modules/payrollSettings/mappings/HttpPayrollSettingsMapping';
import QuoteMapping from '../../modules/quote/mappings/HttpQuoteMapping';
import ReceiveMoneyMapping from '../../modules/receiveMoney/mappings/HttpReceiveMoneyMapping';
import ReceiveRefundMapping from '../../modules/receiveRefund/mappings/HttpReceiveRefundMapping';
import RootBusinessDetailsMapping from '../../root/services/businessDetails/mappings/HttpBusinessDetailsMapping';
import RootModuleMapping from '../../root/mappings/HttpRootMapping';
import SalesSettingsMapping from '../../modules/salesSettings/mappings/HttpSalesSettingsMapping';
import SettingMapping from './SettingMapping';
import SpendMoneyMapping from '../../modules/spendMoney/mappings/HttpSpendMoneyMapping';
import StpDeclarationMapping from '../../modules/stp/stpDeclarationModal/mappings/HttpStpDeclarationMapping';
import StpErrorsMapping from '../../modules/stp/stpErrors/mappings/HttpStpErrorsMapping';
import StpGetStartedMapping from '../../modules/stp/stpGetStarted/mappings/HttpStpGetStartedMapping';
import StpReportingCentreMapping from '../../modules/stp/reportingCentre/mappings/HttpStpReportingCentreMapping';
import StpSetupMapping from '../../modules/stp/stpSetup/mappings/HttpStpSetupMapping';
import SubscriptionMapping from '../../modules/settings/subscription/mappings/HttpSubscriptionMapping';
import SuperFundMapping from '../../modules/superFund/mappings/HttpSuperFundMapping';
import SuperPayItemMapping from '../../modules/payItem/superPayItem/mappings/HttpSuperPayItemMapping';
import SupplierReturnMapping from '../../modules/supplierReturn/mappings/HttpSupplierReturnMapping';
import SupplierReturnPurchaseMapping from '../../modules/supplierReturnPurchase/mappings/HttpSupplierReturnPurchaseMapping';
import TaskMapping from './TaskMapping';
import TaxMapping from '../../modules/tax/mappings/HttpTaxMapping';
import TaxTableCalculationsMapping from '../../modules/employee/employeeDetail/payrollDetails/taxTableCalculationModalModule/mappings/createHttpTaxTableCalculationsMapping';
import TemplateBuilderMapping from '../../modules/templateBuilder/mappings/HttpTemplateBuilderMapping';
import TemplateMapping from '../../modules/template/mappings/HttpTemplateMapping';
import TimesheetMapping from '../../modules/timesheet/mappings/HttpTimesheetMapping';
import TransferMoneyMapping from '../../modules/transferMoney/mappings/HttpTransferMoneyMapping';
import UserMapping from '../../modules/user/mappings/HttpUserMapping';
import WagePayItemMapping from '../../modules/payItem/wagePayItem/mappings/HttpWagePayItemMapping';

const RootMapping = Object.freeze({
  ...FeatureTogglesMapping,
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
  ...TaxTableCalculationsMapping,
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
  ...BankingRuleDetailMapping,
  ...PayRunMapping,
  ...PaySuperListMapping,
  ...PaySuperReadMapping,
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
  ...ElectronicPaymentsCreateMapping,
  ...ElectronicPaymentsReadMapping,
  ...CustomerStatementMapping,
  ...SubscriptionMapping,
  ...EmployeePayMapping,
  ...CreditsAndDebitsListMapping,
  ...SettingMapping,
  ...TaskMapping,
  ...PaySuperCreateMapping,
  ...PaySuperAuthorisationModalMapping,
  ...PaySuperStsLoginMapping,
  ...StpGetStartedMapping,
  ...StpErrorsMapping,
  ...StpDeclarationMapping,
  ...StpReportingCentreMapping,
  ...StpSetupMapping,
  ...TemplateMapping,
  ...TemplateBuilderMapping,
  ...TimesheetMapping,
  ...BankStatementImportMapping,
  ...RootBusinessDetailsMapping,
  ...FileUnavailableMapping,
  ...RootModuleMapping,
});

export default RootMapping;
