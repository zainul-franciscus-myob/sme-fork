import AccountMapping from '../../modules/account/mappings/MemoryAccountMapping';
import ActivityMapping from './ActivityMapping';
import ApplyToSaleMapping from '../../modules/applyToSale/mappings/MemoryApplyToSaleMapping';
import BankFeedsMapping from '../../modules/bankFeeds/mappings/MemoryBankFeedsMapping';
import BankReconciliationMapping from '../../modules/bankReconciliation/mappings/MemoryBankReconciliationMapping';
import BankingMappings from './BankingMapping';
import BankingRuleBillMapping from '../../modules/bankingRules/bankingRuleBill/mappings/MemoryBankingRuleBillMapping';
import BankingRuleInvoiceMapping from '../../modules/bankingRules/bankingRuleInvoice/mappings/MemoryBankingRuleInvoiceMapping';
import BankingRuleMapping from '../../modules/bankingRules/bankingRuleList/mappings/MemoryBankingRuleMapping';
import BankingRuleReceiveMoneyMapping from '../../modules/bankingRules/bankingRuleReceiveMoney/mappings/MemoryBankingRuleReceiveMoneyMapping';
import BankingRuleSpendMoneyMapping from '../../modules/bankingRules/bankingRuleSpendMoney/mappings/MemoryBankingRuleSpendMoneyMapping';
import BillDetailMapping from './BillDetailMapping';
import BillMapping from './BillMapping';
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
import GeneralJournalMapping from '../../modules/generalJournal/mappings/MemoryGeneralJournalMapping';
import HelpMapping from './HelpMapping';
import InTrayMapping from '../../modules/inTray/mappings/MemoryInTrayMapping';
import IncomeAllocationMapping from '../../modules/IncomeAllocation/mappings/MemoryIncomeAllocationMapping';
import InventoryMapping from '../../modules/inventory/mappings/MemoryInventoryMapping';
import InventoryModalMapping from './InventoryModalMapping';
import InvoiceMapping from './InvoiceMapping';
import InvoicePaymentMapping from '../../modules/invoicePayment/mappings/MemoryInvoicePaymentMapping';
import JournalTransactionListMapping from '../../modules/transactionList/journalTransaction/mappings/MemoryJournalTransactionListMapping';
import LeavePayItemMapping from '../../modules/payItem/leavePayItem/mappings/MemoryLeavePayItemMapping';
import LinkBillMapping from '../../modules/linkBill/mappings/MemoryLinkBillMapping';
import LinkUserMapping from '../../modules/linkUser/mappings/MemoryLinkUserMapping';
import LinkedAccountsMapping from '../../modules/linkedAccounts/mappings/MemoryLinkedAccountsMapping';
import NavigationMapping from './NavigationMapping';
import PayItemMapping from '../../modules/payItem/payItemList/mappings/MemoryPayItemMapping';
import PayRefundMapping from '../../modules/payRefund/mappings/MemoryPayRefundMapping';
import PayRunDetailMapping from './PayRunDetailMapping';
import PayRunListMapping from './PayRunListMapping';
import PayRunMapping from './PayRunMapping';
import PayRunOldDetailMapping from './PayRunDetailOldMapping';
import PayRunOldListMapping from './PayRunListOldMapping';
import PayRunOldMapping from './PayRunOldMapping';
import PaySuperAuthorisationModalMapping from './PaySuperAuthorisationModalMapping';
import PaySuperCreateMapping from './PaySuperCreateMapping';
import PaySuperListMapping from './PaySuperListMapping';
import PaySuperReadMapping from './PaySuperReadMapping';
import PayrollSettingsMapping from './PayrollSettingsMapping';
import QuoteMapping from '../../modules/quote/mappings/MemoryQuoteMapping';
import ReceiveMoneyMapping from '../../modules/receiveMoney/mappings/MemoryReceiveMoneyMapping';
import ReceiveRefundMapping from '../../modules/receiveRefund/mappings/MemoryReceiveRefundMapping';
import SalesSettingsMapping from '../../modules/salesSettings/mappings/MemorySalesSettingsMapping';
import SettingMapping from './SettingMapping';
import SpendMoneyMapping from '../../modules/spendMoney/mappings/MemorySpendMoneyMapping';
import StpGetStartedMapping from '../../modules/stp/stpGetStarted/mappings/MemoryStpGetStartedMapping';
import SuperFundMapping from '../../modules/superFund/mappings/MemorySuperFundMapping';
import SuperPayItemMapping from '../../modules/payItem/superPayItem/mappings/MemorySuperPayItemMapping';
import SupplierReturnMapping from '../../modules/supplierReturn/mappings/MemorySupplierReturnMapping';
import SupplierReturnPurchaseMapping from '../../modules/supplierReturnPurchase/mappings/MemorySupplierReturnPurchaseMapping';
import TaxMapping from '../../modules/tax/mappings/MemoryTaxMapping';
import TransferMoneyMapping from '../../modules/transferMoney/mappings/MemoryTransferMoneyMapping';
import UserMapping from '../../modules/user/mappings/MemoryUserMapping';
import WagePayItemMapping from '../../modules/payItem/wagePayItem/mappings/MemoryWagePayItemMapping';

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
  ...PayRunOldListMapping,
  ...PayRunOldDetailMapping,
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
  ...PayRunOldMapping,
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
  ...EmployeePayMapping,
  ...CreditsAndDebitsListMapping,
  ...PaySuperCreateMapping,
  ...SettingMapping,
  ...PaySuperAuthorisationModalMapping,
  ...ActivityMapping,
  ...StpGetStartedMapping,
});

export default RootMapping;
