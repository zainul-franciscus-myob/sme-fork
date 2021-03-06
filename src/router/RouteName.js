const RouteName = {
  APP_MARKETPLACE: 'appMarketplace',
  BUSINESS_LIST: 'businessList/businessList',
  GENERAL_JOURNAL_DETAIL: 'generalJournal/generalJournalDetail',
  SPEND_MONEY_DETAIL: 'spendMoney/spendMoneyDetail',
  RECEIVE_MONEY_DETAIL: 'receiveMoney/receiveMoneyDetail',
  TRANSFER_MONEY_DETAIL: 'transferMoney/transferMoneyDetail',
  TRANSACTION_LIST: 'transactionList/transactionList',
  GENERAL_JOURNAL_LIST: 'generalJournal/generalJournalList',
  CONTACT_LIST: 'contact/contactList',
  CONTACT_DETAIL: 'contact/contactDetail',
  INCOME_ALLOCATION: 'incomeAllocation/incomeAllocation',
  QUOTE_LIST: 'quote/quoteList',
  QUOTE_DETAIL: 'quote/quoteDetail',
  INVOICE_LIST: 'invoice/invoiceList',
  INVOICE_DETAIL: 'invoice/invoiceDetail',
  BILL_PAYMENT_DETAIL: 'billPayment/billPaymentDetail',
  SUPPLIER_PAYMENT_DETAIL: 'supplierPayment/supplierPaymentDetail',
  LOGOUT: 'logout/logout',
  TAX_LIST: 'tax/taxList',
  TAX_DETAIL: 'tax/taxDetail',
  TAX_COMBINE: 'tax/taxCombine',
  BUSINESS_SETTINGS: 'business/businessSettings',
  BANKING_TRANSACTION_LIST: 'banking/bankTransactionList',
  INVENTORY_DETAIL: 'inventory/inventoryDetail',
  INVENTORY_LIST: 'inventory/itemList',
  USER_LIST: 'user/userList',
  USER_DETAIL: 'user/userDetail',
  EMPLOYEE_LIST: 'employee/employeeList',
  EMPLOYEE_LIST_NZ: 'employee/employeeListNz',
  EMPLOYEE_DETAIL_NZ: 'employee/employeeDetailNz',
  EMPLOYEE_DETAIL: 'employee/employeeDetail',
  PURCHASE_ORDER_LIST: 'purchaseOrder/purchaseOrderList',
  PURCHASE_ORDER_DETAIL: 'purchaseOrder/purchaseOrderDetail',
  BILL_LIST: 'bill/billList',
  BILL_DETAIL: 'bill/billDetail',
  CUSTOMER_RETURN_LIST: 'customerReturn/customerReturnList',
  CUSTOMER_RETURN_PAY_REFUND: 'customerReturn/customerReturnPayRefund',
  CUSTOMER_RETURN_APPLY_TO_SALE: 'customerReturn/customerReturnApplyToSale',
  INVOICE_PAYMENT_DETAIL: 'invoicePayment/invoicePaymentDetail',
  SALES_SETTINGS: 'salesSettings/salesSettingsDetail',
  PAYROLL_SETTINGS: 'payrollSettings/payrollSettings',
  PURCHASE_SETTINGS: 'purchaseSettings/purchaseSettings',
  SUPER_FUND_DETAIL: 'superFund/superFundDetail',
  SUPPLIER_RETURN_LIST: 'supplierReturn/supplierReturnList',
  SUPPLIER_RETURN_RECEIVE_REFUND: 'supplierReturn/supplierReturnReceiveRefund',
  SUPPLIER_RETURN_PURCHASE: 'supplierReturn/supplierReturnPurchase',
  RECEIVE_REFUND: 'receiveRefund/receiveRefund',
  SUPPLIER_RETURN_PURCHASES: 'supplierReturnPurchases/supplierReturnPurchases',
  PAY_REFUND: 'payRefund/payRefund',
  APPLY_TO_SALE: 'applyToSale/applyToSale',
  PAY_ITEM_LIST: 'payItem/payItemList',
  PAY_ITEM_SUPER: 'payItem/superPayItem',
  PAY_ITEM_DEDUCTION: 'payItem/deductionPayItemDetail',
  PAY_ITEM_EXPENSE: 'payItem/expensePayItem',
  PAY_ITEM_WAGE: 'payItem/wagePayItem',
  PAY_ITEM_LEAVE: 'payItem/leavePayItem',
  ONLINE_TAX: 'onlineTax/onlineTax',
  IN_TRAY: 'inTray/inTray',
  ONBOARDING_LEARN_IN_TRAY: 'inTray/learn',
  ONBOARDING_LEARN_PAYROLL: 'payroll/learn',
  ONBOARDING_LEARN_BANKING: 'banking/learn',
  ONBOARDING_LEARN_EMPLOYEE: 'learn/employee',
  LINKED_ACCOUNTS: 'linkedAccounts/linkedAccounts',
  BANKING_RULE_LIST: 'bankingRule/bankingRuleList',
  BANKING_RULE_DETAIL: 'bankingRule/bankingRuleDetail',
  BANK_RECONCILIATION: 'bankReconciliation/bankReconciliation',
  PAY_RUN_CREATE_NZ: 'payRun/payRunCreateNz',
  PAY_RUN_CREATE: 'payRun/payRunCreate',
  PAY_RUN_LIST_NZ: 'payRun/payRunListNz',
  PAY_RUN_LIST: 'payRun/payRunList',
  PAY_RUN_DETAIL_NZ: 'payRun/payRunDetailNz',
  PAY_RUN_DETAIL: 'payRun/payRunDetail',
  TIMESHEET: 'timesheet',
  PAY_SUPER_LIST: 'paySuper/PaySuperList',
  PAY_SUPER_CREATE: 'paySuper/PaySuperCreate',
  PAY_SUPER_READ: 'paySuper/PaySuperRead',
  LINK_BILL: 'linkBill/linkBill',
  ACCOUNT_LIST: 'account/accountList',
  ACCOUNT_DETAIL: 'account/accountDetail',
  LINK_USER: 'linkUser/linkUser',
  PERMISSION_DENIED: 'permissionDenied/permissionDenied',
  ERROR: 'error/error',
  DASHBOARD: 'dashboard/dashboard',
  BANK_FEEDS: 'bankFeeds/bankFeeds',
  BANK_FEEDS_CREATE: 'bankFeeds/create',
  DATA_IMPORT_EXPORT: 'dataImportExport/dataImportExport',
  ELECTRONIC_PAYMENTS_CREATE: 'electronicPayments/electronicPaymentsCreate',
  ELECTRONIC_PAYMENTS_READ: 'electronicPayments/electronicPaymentsRead',
  CUSTOMER_STATEMENT_LIST: 'customerStatement/customerStatementList',
  EMPLOYEE_PAY_DETAIL: 'employeePay/employeePayDetail',
  EMPLOYEE_PAY_DETAIL_NZ: 'employeePay/employeePayDetailNz',
  REPORTS_STANDARD: 'reportsStandard',
  REPORTS_FAVOURITE: 'reportsFavourite',
  REPORTS_CUSTOM: 'reportsCustom',
  REPORTS_EXCEPTION: 'reportsException',
  REPORTS_PACK_BUILDER: 'reportsPackBuilder',
  REPORTS_PDF_STYLE_TEMPLATES: 'reportsPdfStyleTemplates',
  MYOB_TEAM_LINK: 'myobTeamLink',
  STP_GET_STARTED: 'stp/stpGetStarted',
  STP_ERRORS: 'stp/stpErrors',
  STP_SETUP: 'stp/stpSetup',
  STP_REPORTING_CENTRE: 'stp/reportingCentre',
  STP_EMPLOYEE_ETP: 'stp/employeeEtp',
  CREATE_TEMPLATE: 'createTemplate',
  TEMPLATE_DETAIL: 'templateDetail',
  PAYMENT_DETAIL: 'paymentDetail',
  PRODUCT_MANAGEMENT_DETAIL: 'productManagementDetail',
  INVOICE_BUSINESS_SETTINGS: 'invoiceBusinessSettings/invoiceBusinessSettings',
  INVOICE_EMAIL_SETTINGS: 'invoiceEmailSettings/invoiceEmailSettings',
  INVOICE_PAYMENT_SETTINGS: 'invoiceEmailSettings/invoicePaymentSettings',
  INVOICE_LOGO_SETTINGS: 'invoiceLogoSettings/invoiceLogoSettings',
  BANK_STATEMENT_IMPORT_LIST: 'bankStatementImport/bankStatementImportList',
  FILE_UNAVAILABLE: 'unavailable',
  JOB_LIST: 'job/jobList',
  JOB_DETAIL: 'job/jobDetail',
  QUOTE_WITH_STATUS_LIST: 'quoteWithList/quoteList',
  QUOTE_WITH_STATUS_DETAIL: 'quoteWithList/quoteDetail',
  REPORTS_SUBSCRIBE_NOW: 'reportsSubscribeNow',
  REPORT_SETTINGS: 'reportSettings',
  RECURRING_BILL: 'recurringTransaction/recurringBill',
  RECURRING_INVOICE: 'recurringTransaction/recurringInvoice',
  RECURRING_SPEND_MONEY: 'recurringTransaction/recurringSpendMoney',
  RECURRING_TRANSACTION_LIST: 'recurringTransaction/recurringTransactionList',
  REMITTANCE_ADVICE_LIST: 'remittanceAdvice/remittanceAdviceList',
  ONBOARDING_LEARN_SMARTME: 'smartme/learn',
  PAYDAY_FILING_ONBOARDING: 'paydayFiling/onboarding',
  PAYDAY_FILING: 'paydayFiling',
  MOVE_TO_MYOB: 'moveToMYOB',
  ONBOARDING: 'onboarding',
};

export default RouteName;
