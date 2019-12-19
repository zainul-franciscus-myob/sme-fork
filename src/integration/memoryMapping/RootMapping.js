import AccountMapping from '../../modules/account/mappings/MemoryAccountMapping';
import ActivityMapping from './ActivityMapping';
import ApplyToSaleMapping from '../../modules/applyToSale/mappings/MemoryApplyToSaleMapping';
import BankFeedsMapping from '../../modules/bankFeeds/mappings/MemoryBankFeedsMapping';
import BankReconciliationMapping from '../../modules/bankReconciliation/mappings/MemoryBankReconciliationMapping';
import BankingMappings from './BankingMapping';
import BankingRuleBillMapping from './BankingRuleBillMapping';
import BankingRuleInvoiceMapping from './BankingRuleInvoiceMapping';
import BankingRuleMapping from './BankingRuleMapping';
import BankingRuleReceiveMoneyMapping from './BankingRuleReceiveMoneyMapping';
import BankingRuleSpendMoneyMapping from './BankingRuleSpendMoneyMapping';
import BillDetailMapping from './BillDetailMapping';
import BillMapping from './BillMapping';
import BillPaymentMapping from '../../modules/billPayment/mappings/MemoryBillPaymentMapping';
import BusinessMapping from '../../modules/business/mappings/MemoryBusinessMapping';
import ContactMapping from '../../modules/contact/mappings/MemoryContactMapping';
import CreditsAndDebitsListMapping from './CreditsAndDebitsListMapping';
import CustomerReturnMapping from '../../modules/customerReturn/mappings/MemoryCustomerReturnMapping';
import CustomerStatementMapping from '../../modules/customerStatement/mappings/MemoryCustomerStatementMapping';
import DashboardMapping from '../../modules/dashboard/mappings/MemoryDashboardMapping';
import DataImportExportMapping from '../../modules/dataImportExport/mappings/MemoryDataImportExportMapping';
import DeductionPayItemMapping from './DeductionPayItemMapping';
import ElectronicPaymentsCreateMapping from './ElectronicPaymentsCreateMapping';
import ElectronicPaymentsReadMapping from './ElectronicPaymentsReadMapping';
import EmployeeMapping from '../../modules/employee/mappings/MemoryEmployeeMapping';
import EmployeePayMapping from '../../modules/employeePay/mappings/MemoryEmployeePayMapping';
import ExpensePayItemMapping from './ExpensePayItemMapping';
import GeneralJournalMapping from './GeneralJournalMapping';
import HelpMapping from './HelpMapping';
import InTrayMapping from './InTrayMapping';
import IncomeAllocationMapping from '../../modules/IncomeAllocation/mappings/MemoryIncomeAllocationMapping';
import InventoryMapping from '../../modules/inventory/mappings/MemoryInventoryMapping';
import InventoryModalMapping from './InventoryModalMapping';
import InvoiceMapping from './InvoiceMapping';
import InvoicePaymentMapping from '../../modules/invoicePayment/mappings/MemoryInvoicePaymentMapping';
import JournalTransactionListMapping from './JournalTransactionListMapping';
import LeavePayItemMapping from './LeavePayItemMapping';
import LinkBillMapping from '../../modules/linkBill/mappings/MemoryLinkBillMapping';
import LinkUserMapping from '../../modules/linkUser/mappings/MemoryLinkUserMapping';
import LinkedAccountsMapping from '../../modules/linkedAccounts/mappings/MemoryLinkedAccountsMapping';
import NavigationMapping from './NavigationMapping';
import PayItemMapping from './PayItemMapping';
import PayRefundMapping from '../../modules/payRefund/mappings/MemoryPayRefundMapping';
import PayRunDetailMapping from './PayRunDetailMapping';
import PayRunListMapping from './PayRunListMapping';
import PayRunMapping from './PayRunMapping';
import PayRunOldDetailMapping from './PayRunDetailOldMapping';
import PayRunOldListMapping from './PayRunListOldMapping';
import PayRunOldMapping from './PayRunOldMapping';
import PaySuperCreateMapping from './PaySuperCreateMapping';
import PaySuperListMapping from './PaySuperListMapping';
import PaySuperReadMapping from './PaySuperReadMapping';
import PayrollSettingsMapping from './PayrollSettingsMapping';
import QuoteMapping from '../../modules/quote/mappings/MemoryQuoteMapping';
import ReceiveMoneyMapping from '../../modules/receiveMoney/mappings/MemoryReceiveMoneyMapping';
import ReceiveRefundMapping from '../../modules/receiveRefund/mappings/MemoryReceiveRefundMapping';
import SalesSettingsMapping from './SalesSettingsMapping';
import SettingMapping from './SettingMapping';
import SpendMoneyMapping from './SpendMoneyMapping';
import SuperFundMapping from '../../modules/superFund/mappings/MemorySuperFundMapping';
import SuperPayItemMapping from './SuperPayItemMapping';
import SupplierReturnMapping from '../../modules/supplierReturn/mappings/MemorySupplierReturnMapping';
import SupplierReturnPurchaseMapping from '../../modules/supplierReturnPurchase/mappings/MemorySupplierReturnPurchaseMapping';
import TaxMapping from '../../modules/tax/mappings/MemoryTaxMapping';
import TransferMoneyMapping from '../../modules/transferMoney/mappings/MemoryTransferMoneyMapping';
import UserMapping from '../../modules/user/mappings/MemoryUserMapping';
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
  ...ActivityMapping,
});

export default RootMapping;
