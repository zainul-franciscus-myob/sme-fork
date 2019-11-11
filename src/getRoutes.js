import getAccountRoutes from './account/getAccountRoutes';
import getApplyToSaleRoutes from './applyToSale/getApplyToSaleRoutes';
import getBankReconciliationRoutes from './bankReconciliation/getBankReconciliationRoutes';
import getBankingRoutes from './banking/getBankingRoutes';
import getBankingRuleRoutes from './bankingRules/getBankingRuleRoutes';
import getBillPaymentRoutes from './billPayment/getBillPaymentRoutes';
import getBillRoutes from './bill/getBillRoutes';
import getBusinessListRoutes from './business/getBusinessListRoutes';
import getBusinessRoutes from './business/getBusinessRoutes';
import getContactRoutes from './contact/getContactRoutes';
import getCustomerReturnRoutes from './customerReturn/getCustomerReturnRoutes';
import getDashboardRoutes from './dashboard/getDashboardRoutes';
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
import getPayrollSettingsRoutes from './payrollSettings/getPayrollSettingsRoutes';
import getPermissionDeniedRoutes from './permissionDenied/getPermissionDeniedRoutes';
import getPrepareBasOrIasRoutes from './prepareBasOrIas/getPrepareBasOrIasRoutes';
import getQuoteRoutes from './quote/getQuoteRoutes';
import getReceiveMoneyRoutes from './receiveMoney/getReceiveMoneyRoutes';
import getReceiveRefundRoutes from './receiveRefund/getReceiveRefundRoutes';
import getSalesSettingsRoutes from './salesSettings/getSalesSettingsRoutes';
import getSpendMoneyRoutes from './spendMoney/getSpendMoneyRoutes';
import getSuperFundRoutes from './superFund/getSuperFundRoutes';
import getSupplierReturnPurchaseRoutes from './supplierReturnPurchase/getSupplierReturnPurchaseRoutes';
import getSupplierReturnRoutes from './supplierReturn/getSupplierReturnRoutes';
import getTaxRoutes from './tax/getTaxRoutes';
import getTransactionListRoutes from './transactionList/getTransactionListRoutes';
import getTransferMoneyRoutes from './transferMoney/getTransferMoneyRoutes';
import getUserRoutes from './user/getUserRoutes';

const getRoutes = ({
  integration, setRootView, popMessages, pushMessage, replaceURLParams, reload,
}) => [
  {
    name: 'businessList',
    rootPath: '/businesses',
    subRoutes: getBusinessListRoutes({ setRootView, integration }),
  },
  {
    name: 'generalJournal',
    rootPath: '/:region/:businessId/generalJournal',
    subRoutes: getGeneralJournalRoutes({
      integration, setRootView, pushMessage,
    }),
  },
  {
    name: 'spendMoney',
    rootPath: '/:region/:businessId/spendMoney',
    subRoutes: getSpendMoneyRoutes({
      integration, setRootView, pushMessage,
    }),
  },
  {
    name: 'receiveMoney',
    rootPath: '/:region/:businessId/receiveMoney',
    subRoutes: getReceiveMoneyRoutes({
      integration, setRootView, pushMessage,
    }),
  },
  {
    name: 'transferMoney',
    rootPath: '/:region/:businessId/transferMoney',
    subRoutes: getTransferMoneyRoutes({
      integration, setRootView, pushMessage,
    }),
  },
  {
    name: 'transactionList',
    rootPath: '/:region/:businessId/transactionList',
    subRoutes: getTransactionListRoutes({
      integration, setRootView, popMessages, replaceURLParams,
    }),
  },
  {
    name: 'contact',
    rootPath: '/:region/:businessId/contact',
    subRoutes: getContactRoutes({
      integration, setRootView, popMessages, pushMessage,
    }),
  },
  {
    name: 'incomeAllocation',
    rootPath: '/:region/:businessId/incomeAllocation',
    subRoutes: getIncomeAllocationRoutes({
      integration, setRootView,
    }),
  },
  {
    name: 'quote',
    rootPath: '/:region/:businessId/quote',
    subRoutes: getQuoteRoutes({
      integration, setRootView, pushMessage, popMessages, replaceURLParams, reload,
    }),
  },
  {
    name: 'invoice',
    rootPath: '/:region/:businessId/invoice',
    subRoutes: getInvoiceRoutes({
      integration, setRootView, pushMessage, popMessages, replaceURLParams, reload,
    }),
  },
  {
    name: 'billPayment',
    rootPath: '/:region/:businessId/billPayment',
    subRoutes: getBillPaymentRoutes({
      integration, setRootView, pushMessage,
    }),
  },
  {
    name: 'logout',
    rootPath: '/logout',
    subRoutes: getLogoutRoute(),
  },
  {
    name: 'tax',
    rootPath: '/:region/:businessId/tax',
    subRoutes: getTaxRoutes({ setRootView, integration }),
  },
  {
    name: 'business',
    rootPath: '/:region/:businessId',
    subRoutes: getBusinessRoutes({ setRootView, integration }),
  }, {
    name: 'banking',
    rootPath: '/:region/:businessId/banking',
    subRoutes: getBankingRoutes({ integration, setRootView }),
  }, {
    name: 'inventory',
    rootPath: '/:region/:businessId/inventory',
    subRoutes: getInventoryRoutes({
      integration, setRootView, popMessages, pushMessage,
    }),
  },
  {
    name: 'user',
    rootPath: '/:region/:businessId/user',
    subRoutes: getUserRoutes({
      integration, setRootView, popMessages, pushMessage,
    }),
  },
  {
    name: 'employee',
    rootPath: '/:region/:businessId/employee',
    subRoutes: getEmployeeRoutes({
      integration, setRootView, popMessages, pushMessage, replaceURLParams,
    }),
  },
  {
    name: 'bill',
    rootPath: '/:region/:businessId/bill',
    subRoutes: getBillRoutes({
      integration, setRootView, popMessages, pushMessage, replaceURLParams,
    }),
  },
  {
    name: 'customerReturn',
    rootPath: '/:region/:businessId/customerReturn',
    subRoutes: getCustomerReturnRoutes({
      integration, setRootView, popMessages, pushMessage,
    }),
  },
  {
    name: 'invoicePayment',
    rootPath: '/:region/:businessId/invoicePayment',
    subRoutes: getInvoicePaymentRoutes({
      integration, setRootView, pushMessage,
    }),
  },
  {
    name: 'salesSettings',
    rootPath: '/:region/:businessId/salesSettings',
    subRoutes: getSalesSettingsRoutes({
      integration, setRootView,
    }),
  },
  {
    name: 'payrollSettings',
    rootPath: '/:region/:businessId/payrollSettings',
    subRoutes: getPayrollSettingsRoutes({
      integration, setRootView, popMessages, pushMessage, replaceURLParams,
    }),
  },
  {
    name: 'superFund',
    rootPath: '/:region/:businessId/superFund',
    subRoutes: getSuperFundRoutes({
      integration, setRootView, pushMessage,
    }),
  },
  {
    name: 'supplierReturn',
    rootPath: '/:region/:businessId/supplierReturn',
    subRoutes: getSupplierReturnRoutes({
      integration, setRootView, popMessages, pushMessage,
    }),
  },
  {
    name: 'receiveRefund',
    rootPath: '/:region/:businessId/receiveRefund',
    subRoutes: getReceiveRefundRoutes({
      integration, setRootView, pushMessage,
    }),
  },
  {
    name: 'supplierReturnPurchases',
    rootPath: '/:region/:businessId/appliedPurchaseReturn',
    subRoutes: getSupplierReturnPurchaseRoutes({
      integration, setRootView, pushMessage,
    }),
  },
  {
    name: 'payRefund',
    rootPath: '/:region/:businessId/payRefund',
    subRoutes: getPayRefundRoutes({
      integration, setRootView, pushMessage,
    }),
  },
  {
    name: 'applyToSale',
    rootPath: '/:region/:businessId/applyToSale',
    subRoutes: getApplyToSaleRoutes({
      integration, setRootView, pushMessage,
    }),
  },
  {
    name: 'payItem',
    rootPath: '/:region/:businessId/payItem',
    subRoutes: getPayItemRoutes({
      integration, setRootView, popMessages, pushMessage, replaceURLParams,
    }),
  },
  {
    name: 'prepareBasOrIas',
    rootPath: '/:region/:businessId/prepareBasOrIas',
    subRoutes: getPrepareBasOrIasRoutes({
      integration, setRootView,
    }),
  },
  {
    name: 'inTray',
    rootPath: '/:region/:businessId/inTray',
    subRoutes: getInTrayRoutes({
      integration, setRootView, popMessages,
    }),
  },
  {
    name: 'linkedAccounts',
    rootPath: '/:region/:businessId/linkedAccounts',
    subRoutes: getLinkedAccountsRoutes({
      integration, setRootView,
    }),
  },
  {
    name: 'bankingRule',
    rootPath: '/:region/:businessId/bankingRule',
    subRoutes: getBankingRuleRoutes({
      integration, setRootView, popMessages, pushMessage,
    }),
  },
  {
    name: 'bankReconciliation',
    rootPath: '/:region/:businessId/bankReconciliation',
    subRoutes: getBankReconciliationRoutes({
      integration, setRootView,
    }),
  },
  {
    name: 'payRun',
    rootPath: '/:region/:businessId/payRun',
    subRoutes: getPayRunRoutes({
      integration, setRootView, popMessages, pushMessage,
    }),
  },
  {
    name: 'linkBill',
    rootPath: '/:region/:businessId/linkBill',
    subRoutes: getLinkBillRoutes({
      integration, setRootView, pushMessage,
    }),
  },
  {
    name: 'account',
    rootPath: '/:region/:businessId/account',
    subRoutes: getAccountRoutes({
      integration, setRootView, popMessages, pushMessage,
    }),
  },
  {
    name: 'linkUser',
    rootPath: '/:region/:businessId/linkUser',
    subRoutes: getLinkUserRoutes({
      integration, setRootView,
    }),
  },
  {
    name: 'permissionDenied',
    rootPath: '/:region/:businessId/permissionDenied',
    subRoutes: getPermissionDeniedRoutes({
      setRootView,
    }),
  },
  {
    name: 'dashboard',
    rootPath: '/:region/:businessId/dashboard',
    subRoutes: getDashboardRoutes({
      integration, setRootView,
    }),
  },
];

export default getRoutes;
