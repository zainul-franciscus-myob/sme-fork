import getAccountRoutes from './modules/account/getAccountRoutes';
import getApplyToSaleRoutes from './modules/applyToSale/getApplyToSaleRoutes';
import getBankFeedsRoutes from './modules/bankFeeds/getBankFeedsRoutes';
import getBankReconciliationRoutes from './modules/bankReconciliation/getBankReconciliationRoutes';
import getBankStatementImportRoutes from './modules/bankStatementImport/GetBankStatementImportRoutes';
import getBankingRoutes from './banking/getBankingRoutes';
import getBankingRuleRoutes from './modules/bankingRules/getBankingRuleRoutes';
import getBillPaymentRoutes from './modules/billPayment/getBillPaymentRoutes';
import getBillRoutes from './modules/bill/getBillRoutes';
import getBusinessListRoutes from './modules/business/getBusinessListRoutes';
import getBusinessRoutes from './modules/business/getBusinessRoutes';
import getContactRoutes from './modules/contact/getContactRoutes';
import getCustomerReturnRoutes from './modules/customerReturn/getCustomerReturnRoutes';
import getCustomerStatementRoutes from './modules/customerStatement/getCustomerStatementRoutes';
import getDashboardRoutes from './modules/dashboard/getDashboardRoutes';
import getDataImportExportRoutes from './modules/dataImportExport/getDataImportExportRoutes';
import getElectronicPaymentsRoutes from './modules/electronicPayments/getElectronicPaymentsRoutes';
import getEmployeePayRoutes from './modules/employeePay/getEmployeePayRoutes';
import getEmployeeRoutes from './modules/employee/getEmployeeRoutes';
import getGeneralJournalRoutes from './modules/generalJournal/getGeneralJournalRoutes';
import getInTrayRoutes from './modules/inTray/getInTrayRoutes';
import getIncomeAllocationRoutes from './modules/IncomeAllocation/getIncomeAllocationRoutes';
import getInventoryRoutes from './modules/inventory/getInventoryRoutes';
import getInvoicePaymentRoutes from './modules/invoicePayment/getInvoicePaymentRoutes';
import getInvoiceRoutes from './modules/invoice/getInvoiceRoutes';
import getLinkBillRoutes from './modules/linkBill/getLinkBillRoutes';
import getLinkUserRoutes from './modules/linkUser/getLinkUserRoutes';
import getLinkedAccountsRoutes from './modules/linkedAccounts/getLinkedAccountsRoutes';
import getLogoutRoute from './modules/logout/getLogoutRoute';
import getPayItemRoutes from './modules/payItem/getPayItemRoutes';
import getPayRefundRoutes from './modules/payRefund/getPayRefundRoutes';
import getPayRunRoutes from './payRun/getPayRunRoutes';
import getPaySuperRoutes from './modules/paySuper/getPaySuperRoutes';
import getPayrollSettingsRoutes from './modules/payrollSettings/getPayrollSettingsRoutes';
import getPermissionDeniedRoutes from './modules/permissionDenied/getPermissionDeniedRoutes';
import getPrepareBasOrIasRoutes from './modules/prepareBasOrIas/getPrepareBasOrIasRoutes';
import getQuoteRoutes from './modules/quote/getQuoteRoutes';
import getReceiveMoneyRoutes from './modules/receiveMoney/getReceiveMoneyRoutes';
import getReceiveRefundRoutes from './modules/receiveRefund/getReceiveRefundRoutes';
import getSalesSettingsRoutes from './modules/salesSettings/getSalesSettingsRoutes';
import getSpendMoneyRoutes from './modules/spendMoney/getSpendMoneyRoutes';
import getStpRoutes from './modules/stp/getStpRoutes';
import getSuperFundRoutes from './modules/superFund/getSuperFundRoutes';
import getSupplierReturnPurchaseRoutes from './modules/supplierReturnPurchase/getSupplierReturnPurchaseRoutes';
import getSupplierReturnRoutes from './modules/supplierReturn/getSupplierReturnRoutes';
import getTaxRoutes from './modules/tax/getTaxRoutes';
import getTemplateRoutes from './modules/template/getTemplateRoutes';
import getTimesheetRoutes from './modules/timesheet/getTimesheetRoutes';
import getTransactionListRoutes from './modules/transactionList/getTransactionListRoutes';
import getTransferMoneyRoutes from './modules/transferMoney/getTransferMoneyRoutes';
import getUserRoutes from './modules/user/getUserRoutes';

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
  ...getTimesheetRoutes(moduleParams),
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
  ...getStpRoutes(moduleParams),
  ...getTemplateRoutes(moduleParams),
  ...getBankStatementImportRoutes(moduleParams),
];

export default getRoutes;
