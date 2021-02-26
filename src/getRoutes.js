import getAccountRoutes from './modules/account/getAccountRoutes';
import getApplyToSaleRoutes from './modules/applyToSale/getApplyToSaleRoutes';
import getBankFeedsApplyRoutes from './modules/bankFeeds/bankFeedsApply/getBankFeedsApplyRoutes';
import getBankFeedsRoutes from './modules/bankFeeds/bankFeedsManage/getBankFeedsRoutes';
import getBankReconciliationRoutes from './modules/bankReconciliation/getBankReconciliationRoutes';
import getBankStatementImportRoutes from './modules/bankStatementImport/GetBankStatementImportRoutes';
import getBankingRoutes from './modules/banking/getBankingRoutes';
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
import getEmployeeNzRoutes from './modules/nzPayroll/employee/getEmployeeNzRoutes';
import getEmployeePayNzRoutes from './modules/nzPayroll/employeePay/getEmployeePayNzRoutes';
import getEmployeePayRoutes from './modules/employeePay/getEmployeePayRoutes';
import getEmployeeRoutes from './modules/employee/getEmployeeRoutes';
import getErrorRoutes from './modules/error/getErrorRoutes';
import getFileUnavailableRoutes from './modules/fileUnavailable/getFileUnavailableRoutes';
import getGeneralJournalRoutes from './modules/generalJournal/getGeneralJournalRoutes';
import getInTrayRoutes from './modules/inTray/getInTrayRoutes';
import getIncomeAllocationRoutes from './modules/IncomeAllocation/getIncomeAllocationRoutes';
import getInventoryRoutes from './modules/inventory/getInventoryRoutes';
import getInvoicePaymentRoutes from './modules/invoicePayment/getInvoicePaymentRoutes';
import getInvoiceRoutes from './modules/invoice/getInvoiceRoutes';
import getJobRoutes from './modules/job/getJobRoutes';
import getLinkBillRoutes from './modules/linkBill/getLinkBillRoutes';
import getLinkUserRoutes from './modules/linkUser/getLinkUserRoutes';
import getLinkedAccountsRoutes from './modules/linkedAccounts/getLinkedAccountsRoutes';
import getLogoutRoutes from './modules/logout/getLogoutRoutes';
import getMoveToMYOBRoutes from './modules/moveToMYOB/getMoveToMYOBRoutes';
import getOnboardingRoutes from './modules/onboarding/getOnboardingRoutes';
import getOnlineTaxRoutes from './modules/onlineTax/getOnlineTaxRoutes';
import getPayItemRoutes from './modules/payItem/getPayItemRoutes';
import getPayRefundRoutes from './modules/payRefund/getPayRefundRoutes';
import getPayRunNzRoutes from './modules/nzPayroll/payRun/getPayRunNzRoutes';
import getPayRunRoutes from './modules/payRun/getPayRunRoutes';
import getPaySuperRoutes from './modules/paySuper/getPaySuperRoutes';
import getPaydayFilingRoutes from './modules/nzPayroll/paydayFiling/getPaydayFilingRoutes';
import getPayrollSettingsRoutes from './modules/payrollSettings/getPayrollSettingsRoutes';
import getPermissionDeniedRoutes from './modules/permissionDenied/getPermissionDeniedRoutes';
import getPurchaseOrderRoutes from './modules/purchaseOrder/getPurchaseOrderRoutes';
import getPurchaseSettingsRoutes from './modules/purchaseSettings/getPurchaseSettingsRoutes';
import getQuoteRoutes from './modules/quote/getQuoteRoutes';
import getReceiveMoneyRoutes from './modules/receiveMoney/getReceiveMoneyRoutes';
import getReceiveRefundRoutes from './modules/receiveRefund/getReceiveRefundRoutes';
import getRecurringTransactionRoutes from './modules/recurringTransaction/getRecurringTransactionRoutes';
import getRemittanceAdviceRoutes from './modules/remittanceAdvice/getRemittanceAdviceRoutes';
import getReportsSubscribeNowRoutes from './modules/reportsSubscribeNow/getReportsSubscribeNowRoutes';
import getSalesSettingsRoutes from './modules/salesSettings/getSalesSettingsRoutes';
import getSmartMeSettingsRoutes from './modules/smartMeSettings/getSmartMeSettingsRoutes';
import getSpendMoneyRoutes from './modules/spendMoney/getSpendMoneyRoutes';
import getStpRoutes from './modules/stp/getStpRoutes';
import getSuperFundRoutes from './modules/superFund/getSuperFundRoutes';
import getSupplierPaymentRoutes from './modules/supplierPayment/getSupplierPaymentRoutes';
import getSupplierReturnPurchaseRoutes from './modules/supplierReturnPurchase/getSupplierReturnPurchaseRoutes';
import getSupplierReturnRoutes from './modules/supplierReturn/getSupplierReturnRoutes';
import getTaxRoutes from './modules/tax/getTaxRoutes';
import getTemplateBuilderRoutes from './modules/templateBuilder/getTemplateBuilderRoutes';
import getTemplateRoutes from './modules/template/getTemplateRoutes';
import getTimesheetRoutes from './modules/timesheet/getTimesheetRoutes';
import getTransactionListRoutes from './modules/transactionList/getTransactionListRoutes';
import getTransferMoneyRoutes from './modules/transferMoney/getTransferMoneyRoutes';
import getUserRoutes from './modules/user/getUserRoutes';

/** @type {import('./modules/module-types').RouteConfig} */
const getRoutes = (moduleParams) => [
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
  ...getRemittanceAdviceRoutes(moduleParams),
  ...getSupplierPaymentRoutes(moduleParams),
  ...getTaxRoutes(moduleParams),
  ...getBusinessRoutes(moduleParams),
  ...getInventoryRoutes(moduleParams),
  ...getUserRoutes(moduleParams),
  ...getEmployeeRoutes(),
  ...getBillRoutes(moduleParams),
  ...getPurchaseOrderRoutes(moduleParams),
  ...getCustomerReturnRoutes(moduleParams),
  ...getInvoicePaymentRoutes(moduleParams),
  ...getSalesSettingsRoutes(moduleParams),
  ...getPayrollSettingsRoutes(moduleParams),
  ...getSmartMeSettingsRoutes(moduleParams),
  ...getPurchaseSettingsRoutes(moduleParams),
  ...getSuperFundRoutes(moduleParams),
  ...getSupplierReturnRoutes(moduleParams),
  ...getReceiveRefundRoutes(moduleParams),
  ...getSupplierReturnPurchaseRoutes(moduleParams),
  ...getPayRefundRoutes(moduleParams),
  ...getApplyToSaleRoutes(moduleParams),
  ...getPayItemRoutes(moduleParams),
  ...getOnlineTaxRoutes(moduleParams),
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
  ...getErrorRoutes(moduleParams),
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
  ...getFileUnavailableRoutes(moduleParams),
  ...getTemplateBuilderRoutes(moduleParams),
  ...getJobRoutes(moduleParams),
  ...getEmployeeNzRoutes(moduleParams),
  ...getLogoutRoutes(moduleParams),
  ...getBankFeedsApplyRoutes(moduleParams),
  ...getPayRunNzRoutes(moduleParams),
  ...getReportsSubscribeNowRoutes(moduleParams),
  ...getRecurringTransactionRoutes(moduleParams),
  ...getPaydayFilingRoutes(moduleParams),
  ...getEmployeePayNzRoutes(moduleParams),
  ...getMoveToMYOBRoutes(moduleParams),
  ...getOnboardingRoutes(moduleParams),
];

export default getRoutes;
