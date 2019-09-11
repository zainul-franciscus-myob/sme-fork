import ApplyToSaleMapping from './ApplyToSaleMapping';
import BankReconciliationMapping from './BankReconciliationMapping';
import BankingMapping from './BankingMapping';
import BankingRuleBillMapping from './BankingRuleBillMapping';
import BankingRuleInvoiceMapping from './BankingRuleInvoiceMapping';
import BankingRuleMapping from './BankingRuleMapping';
import BankingRuleRecieveMoneyMapping from './BankingRuleRecieveMoneyMapping';
import BankingRuleSpendMoneyMapping from './BankingRuleSpendMoneyMapping';
import BillItemMapping from './BillItemMapping';
import BillMapping from './BillMapping';
import BillPaymentMapping from './BillPaymentMapping';
import BillServiceMapping from './BillServiceMapping';
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
import LeavePayItemMApping from './LeavePayItemMapping';
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
import SaleSettingMapping from './SalesSettingsMapping';
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
  ...DeductionPayItemMapping,
  ...BusinessMapping,
  ...ContactMapping,
  ...GeneralJournalMapping,
  ...IncomeAllocationMapping,
  ...NavigationMapping,
  ...QuoteMapping,
  ...QuoteServiceMapping,
  ...QuoteItemMapping,
  ...InvoiceMapping,
  ...InvoiceServiceMapping,
  ...InvoiceItemMapping,
  ...ReceiveMoneyMapping,
  ...SpendMoneyMapping,
  ...TransactionListMapping,
  ...TransferMoneyMapping,
  ...TaxMapping,
  ...BankingMapping,
  ...InventoryMapping,
  ...UserMapping,
  ...EmployeeMapping,
  ...InvoicePaymentMapping,
  ...BillPaymentMapping,
  ...BillMapping,
  ...BillItemMapping,
  ...BillServiceMapping,
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
});

export default RootMapping;
