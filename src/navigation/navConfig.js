import RouteName from '../router/RouteName';

export const activeMapping = {
  [RouteName.DASHBOARD]: 'home',

  [RouteName.QUOTE_LIST]: 'sales',
  [RouteName.QUOTE_DETAIL]: 'sales',
  [RouteName.INVOICE_LIST]: 'sales',
  [RouteName.INVOICE_DETAIL]: 'sales',
  [RouteName.INVOICE_PAYMENT_DETAIL]: 'sales',
  [RouteName.CUSTOMER_RETURN_LIST]: 'sales',
  [RouteName.CUSTOMER_RETURN_PAY_REFUND]: 'sales',
  [RouteName.CUSTOMER_RETURN_APPLY_TO_SALE]: 'sales',
  [RouteName.APPLY_TO_SALE]: 'sales',
  [RouteName.INVENTORY_LIST]: 'sales',
  [RouteName.CUSTOMER_STATEMENT_LIST]: 'sales',

  [RouteName.BILL_LIST]: 'purchases',
  [RouteName.BILL_DETAIL]: 'purchases',
  [RouteName.BILL_PAYMENT_DETAIL]: 'purchases',
  [RouteName.SUPPLIER_RETURN_LIST]: 'purchases',
  [RouteName.SUPPLIER_RETURN_RECEIVE_REFUND]: 'purchases',
  [RouteName.SUPPLIER_RETURN_PURCHASE]: 'purchases',

  [RouteName.BANKING_TRANSACTION_LIST]: 'banking',
  [RouteName.BANK_RECONCILIATION]: 'banking',
  [RouteName.BANKING_RULE_LIST]: 'banking',
  [RouteName.BANKING_RULE_SPEND_MONEY]: 'banking',
  [RouteName.BANKING_RULE_RECEIVE_MONEY]: 'banking',
  [RouteName.BANKING_RULE_INVOICE]: 'banking',
  [RouteName.BANKING_RULE_BILL]: 'banking',
  [RouteName.BANK_FEEDS]: 'banking',
  [RouteName.SPEND_MONEY_DETAIL]: 'banking',
  [RouteName.ELECTRONIC_PAYMENTS_CREATE]: 'banking',
  [RouteName.RECEIVE_MONEY_DETAIL]: 'banking',
  [RouteName.TRANSFER_MONEY_DETAIL]: 'banking',
  [RouteName.TRANSACTION_LIST]: 'banking',
  [RouteName.PAY_REFUND]: 'banking',
  [RouteName.RECEIVE_REFUND]: 'banking',

  [RouteName.GENERAL_JOURNAL_DETAIL]: 'accounting',
  [RouteName.GENERAL_JOURNAL_LIST]: 'accounting',
  [RouteName.ACCOUNT_LIST]: 'accounting',
  [RouteName.LINKED_ACCOUNTS]: 'accounting',
  [RouteName.TAX_LIST]: 'accounting',
  [RouteName.PREPARE_BAS_OR_IAS]: 'accounting',

  [RouteName.EMPLOYEE_LIST_NZ]: 'payroll',

  [RouteName.EMPLOYEE_LIST]: 'payroll',
  [RouteName.EMPLOYEE_DETAIL]: 'payroll',
  [RouteName.PAY_ITEM_LIST]: 'payroll',
  [RouteName.PAY_ITEM_SUPER]: 'payroll',
  [RouteName.PAY_ITEM_WAGE]: 'payroll',
  [RouteName.PAY_ITEM_DEDUCTION]: 'payroll',
  [RouteName.PAY_ITEM_EXPENSE]: 'payroll',
  [RouteName.PAY_ITEM_LEAVE]: 'payroll',
  [RouteName.PAYROLL_SETTINGS]: 'payroll',
  [RouteName.PAY_SUPER_LIST]: 'payroll',
  [RouteName.PAY_SUPER_CREATE]: 'payroll',
  [RouteName.PAY_SUPER_READ]: 'payroll',
  [RouteName.STP_GET_STARTED]: 'payroll',
  [RouteName.STP_ERRORS]: 'payroll',
  [RouteName.STP_SETUP]: 'payroll',
  [RouteName.STP_REPORTING_CENTRE]: 'payroll',
  [RouteName.TIMESHEET]: 'payroll',
  [RouteName.STP_EMPLOYEE_ETP]: 'payroll',

  [RouteName.CONTACT_LIST]: 'contact',
  [RouteName.CONTACT_DETAIL]: 'contact',

  [RouteName.IN_TRAY]: 'inTray',

  [RouteName.BUSINESS_DETAIL]: 'business',
  [RouteName.INCOME_ALLOCATION]: 'business',
  [RouteName.SALES_SETTINGS]: 'business',
  [RouteName.USER_LIST]: 'business',
  [RouteName.USER_DETAIL]: 'business',
  [RouteName.DATA_IMPORT_EXPORT]: 'business',
  [RouteName.PAYMENT_DETAIL]: 'business',
};

export const featuresConfig = {
  quoteList: { routeName: RouteName.QUOTE_LIST },
  quoteCreate: { routeName: RouteName.QUOTE_DETAIL, params: { quoteId: 'new' } },
  invoiceList: { routeName: RouteName.INVOICE_LIST },
  invoiceCreate: { routeName: RouteName.INVOICE_DETAIL, params: { invoiceId: 'new' } },
  invoicePaymentCreate: { routeName: RouteName.INVOICE_PAYMENT_DETAIL, params: { invoicePaymentId: 'new' } },
  customerReturnList: { routeName: RouteName.CUSTOMER_RETURN_LIST },
  customerStatementList: { routeName: RouteName.CUSTOMER_STATEMENT_LIST },
  itemList: { routeName: RouteName.INVENTORY_LIST },

  billList: { routeName: RouteName.BILL_LIST },
  billCreate: { routeName: RouteName.BILL_DETAIL, params: { billId: 'new' } },
  billPaymentCreate: { routeName: RouteName.BILL_PAYMENT_DETAIL, params: { billPaymentId: 'new' } },
  supplierReturnList: { routeName: RouteName.SUPPLIER_RETURN_LIST },

  bankTransactionList: { routeName: RouteName.BANKING_TRANSACTION_LIST },
  bankReconciliation: { routeName: RouteName.BANK_RECONCILIATION },
  bankingRuleList: { routeName: RouteName.BANKING_RULE_LIST },
  bankFeeds: { routeName: RouteName.BANK_FEEDS },
  electronicPaymentBankCreate: { routeName: RouteName.ELECTRONIC_PAYMENTS_CREATE, params: { paymentType: 'SpendMoney' } },
  spendMoneyCreate: { routeName: RouteName.SPEND_MONEY_DETAIL, params: { spendMoneyId: 'new' } },
  receiveMoneyCreate: { routeName: RouteName.RECEIVE_MONEY_DETAIL, params: { receiveMoneyId: 'new' } },
  transferMoneyCreate: { routeName: RouteName.TRANSFER_MONEY_DETAIL, params: { transferMoneyId: 'new' } },
  transactionList: { routeName: RouteName.TRANSACTION_LIST },

  generalJournalList: { routeName: RouteName.GENERAL_JOURNAL_LIST, params: { sourceJournal: 'General' } },
  generalJournalCreate: { routeName: RouteName.GENERAL_JOURNAL_DETAIL, params: { generalJournalId: 'new' } },
  accountList: { routeName: RouteName.ACCOUNT_LIST },
  linkedAccounts: { routeName: RouteName.LINKED_ACCOUNTS },
  taxList: { routeName: RouteName.TAX_LIST },
  prepareBasOrIas: { routeName: RouteName.PREPARE_BAS_OR_IAS },

  employeeList: { routeName: RouteName.EMPLOYEE_LIST },
  employeeCreate: { routeName: RouteName.EMPLOYEE_DETAIL, params: { employeeId: 'new' } },
  payRunList: { routeName: RouteName.PAY_RUN_LIST },
  payRunCreate: { routeName: RouteName.PAY_RUN_CREATE },
  payItemList: { routeName: RouteName.PAY_ITEM_LIST },
  timesheets: { routeName: RouteName.TIMESHEET },
  electronicPaymentPayrollCreate: { routeName: RouteName.ELECTRONIC_PAYMENTS_CREATE, params: { paymentType: 'PayEmployees' } },
  superPaymentList: { routeName: RouteName.PAY_SUPER_LIST },
  stpReporting: { routeName: RouteName.STP_REPORTING_CENTRE },

  employeeListNz: { routeName: RouteName.EMPLOYEE_LIST_NZ },

  contactList: { routeName: RouteName.CONTACT_LIST },
  contactCreate: { routeName: RouteName.CONTACT_DETAIL, params: { contactId: 'new' } },

  reportsStandard: { routeName: RouteName.REPORTS_STANDARD },
  reportsFavourite: { routeName: RouteName.REPORTS_FAVOURITE },
  reportsCustom: { routeName: RouteName.REPORTS_CUSTOM },
  reportsException: { routeName: RouteName.REPORTS_EXCEPTION },
  reportsPackBuilder: { routeName: RouteName.REPORTS_PACK_BUILDER },
  reportsPdfStyleTemplates: { routeName: RouteName.REPORTS_PDF_STYLE_TEMPLATES },

  inTrayList: { routeName: RouteName.IN_TRAY },

  businessDetails: { routeName: RouteName.BUSINESS_DETAIL },
  incomeAllocation: { routeName: RouteName.INCOME_ALLOCATION },
  salesSettings: { routeName: RouteName.SALES_SETTINGS },
  payrollSettings: { routeName: RouteName.PAYROLL_SETTINGS },
  userList: { routeName: RouteName.USER_LIST },
  dataImportExport: { routeName: RouteName.DATA_IMPORT_EXPORT },
  paymentDetail: { routeName: RouteName.PAYMENT_DETAIL },
};
