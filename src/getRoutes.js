import getAccountRoutes from './account/getAccountRoutes';
import getApplyToSaleRoutes from './applyToSale/getApplyToSaleRoutes';
import getBankFeedsRoutes from './bankFeeds/getBankFeedsRoutes';
import getBankReconciliationRoutes from './bankReconciliation/getBankReconciliationRoutes';
import getBankingRoutes from './banking/getBankingRoutes';
import getBankingRuleRoutes from './bankingRules/getBankingRuleRoutes';
import getBillPaymentRoutes from './billPayment/getBillPaymentRoutes';
import getBillRoutes from './bill/getBillRoutes';
import getBusinessListRoutes from './business/getBusinessListRoutes';
import getBusinessRoutes from './business/getBusinessRoutes';
import getContactRoutes from './contact/getContactRoutes';
import getCustomerReturnRoutes from './customerReturn/getCustomerReturnRoutes';
import getCustomerStatementRoutes from './customerStatement/getCustomerStatementRoutes';
import getDashboardRoutes from './dashboard/getDashboardRoutes';
import getDataImportExportRoutes from './dataImportExport/getDataImportExportRoutes';
import getElectronicPaymentsRoutes from './electronicPayments/getElectronicPaymentsRoutes';
import getEmployeePayRoutes from './employeePay/getEmployeePayRoutes';
import getEmployeeRoutes from './employee/getEmployeeRoutes';
import getGeneralJournalRoutes from './generalJournal/getGeneralJournalRoutes';
import getInTrayRoutes from './inTray/getInTrayRoutes';
import getIncomeAllocationRoutes from './IncomeAllocation/getIncomeAllocationRoutes';
import getInventoryRoutes from './inventory/getInventoryRoutes';
import getInvoicePaymentRoutes from './invoicePayment/getInvoicePaymentRoutes';
import getInvoiceRoutes from './invoice/getInvoiceRoutes';
import getLinkBillRoutes from './linkBill/getLinkBillRoutes';
import getLinkUserRoutes from './linkUser/getLinkUserRoutes';
import getLinkedAccountsRoutes from './linkedAccounts/getLinkedAccountsRoutes';
import getLogoutRoute from './logout/getLogoutRoute';
import getPayItemRoutes from './payItem/getPayItemRoutes';
import getPayRefundRoutes from './payRefund/getPayRefundRoutes';
import getPayRunRoutes from './payRun/getPayRunRoutes';
import getPaySuperRoutes from './paySuper/getPaySuperRoutes';
import getPayrollSettingsRoutes from './payrollSettings/getPayrollSettingsRoutes';
import getPermissionDeniedRoutes from './permissionDenied/getPermissionDeniedRoutes';
import getPrepareBasOrIasRoutes from './prepareBasOrIas/getPrepareBasOrIasRoutes';
import getQuoteRoutes from './quote/getQuoteRoutes';
import getReceiveMoneyRoutes from './receiveMoney/getReceiveMoneyRoutes';
import getReceiveRefundRoutes from './receiveRefund/getReceiveRefundRoutes';
import getSalesSettingsRoutes from './salesSettings/getSalesSettingsRoutes';
import getSettingsRoutes from './settings/getSettingsRoutes';
import getSpendMoneyRoutes from './spendMoney/getSpendMoneyRoutes';
import getSuperFundRoutes from './superFund/getSuperFundRoutes';
import getSupplierReturnPurchaseRoutes from './supplierReturnPurchase/getSupplierReturnPurchaseRoutes';
import getSupplierReturnRoutes from './supplierReturn/getSupplierReturnRoutes';
import getTaxRoutes from './tax/getTaxRoutes';
import getTransactionListRoutes from './transactionList/getTransactionListRoutes';
import getTransferMoneyRoutes from './transferMoney/getTransferMoneyRoutes';
import getUserRoutes from './user/getUserRoutes';

const getRoutes = moduleParams => [
  ...getBusinessListRoutes(moduleParams),
  ...getGeneralJournalRoutes(moduleParams),
  ...getSpendMoneyRoutes(moduleParams),
  ...getTransferMoneyRoutes(moduleParams),
  ...getTransactionListRoutes(moduleParams),
  ...getContactRoutes(moduleParams),
  ...getIncomeAllocationRoutes(moduleParams),
  ...getQuoteRoutes(moduleParams),
  ...getInvoiceRoutes(moduleParams),
  ...getBillPaymentRoutes(moduleParams),
  ...getLogoutRoute(moduleParams),
  ...getTaxRoutes(moduleParams),
  ...getBusinessRoutes(moduleParams),
  ...getInventoryRoutes(moduleParams),
  ...getUserRoutes(moduleParams),
  ...getEmployeeRoutes(moduleParams),
  ...getBillRoutes(moduleParams),
  ...getCustomerReturnRoutes(moduleParams),
  ...getInvoicePaymentRoutes(moduleParams),
  ...getSalesSettingsRoutes(moduleParams),
  ...getSettingsRoutes(moduleParams),
  ...getPayrollSettingsRoutes(moduleParams),
  ...getSuperFundRoutes(moduleParams),
  ...getSupplierReturnRoutes(moduleParams),
  ...getReceiveRefundRoutes(moduleParams),
  ...getSupplierReturnPurchaseRoutes(moduleParams),
  ...getPayRefundRoutes(moduleParams),
  ...getApplyToSaleRoutes(moduleParams),
  ...getPayItemRoutes(moduleParams),
  ...getPrepareBasOrIasRoutes(moduleParams),
  ...getInTrayRoutes(moduleParams),
  ...getLinkedAccountsRoutes(moduleParams),
  ...getBankingRuleRoutes(moduleParams),
  ...getBankReconciliationRoutes(moduleParams),
  ...getPayRunRoutes(moduleParams),
  ...getPaySuperRoutes(moduleParams),
  ...getLinkBillRoutes(moduleParams),
  ...getAccountRoutes(moduleParams),
  ...getLinkUserRoutes(moduleParams),
  ...getPermissionDeniedRoutes(moduleParams),
  ...getDashboardRoutes(moduleParams),
  ...getBankFeedsRoutes(moduleParams),
  ...getDataImportExportRoutes(moduleParams),
  ...getElectronicPaymentsRoutes(moduleParams),
  ...getCustomerStatementRoutes(moduleParams),
  ...getEmployeePayRoutes(moduleParams),
  ...getBankingRoutes(moduleParams),
  ...getReceiveMoneyRoutes(moduleParams),
];

export default getRoutes;
