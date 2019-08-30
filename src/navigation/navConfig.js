export const activeMapping = {
  'spendMoney/spendMoneyDetail': 'banking',
  'receiveMoney/receiveMoneyDetail': 'banking',
  'transferMoney/transferMoneyDetail': 'banking',
  'transactionList/transactionList': 'banking',
  'contact/contactDetail': 'contact',
  'contact/contactList': 'contact',
  'employee/employeeList': 'payroll',
  'employee/employeeDetail': 'payroll',
  'generalJournal/generalJournalDetail': 'journals',
  'incomeAllocation/incomeAllocation': 'business',
  'business/businessDetail': 'business',
  'tax/taxList': 'business',
  'quote/quoteList': 'sales',
  'invoice/invoiceList': 'sales',
  'banking/bankTransactionList': 'banking',
  'inventory/itemList': 'sales',
  'quote/quoteDetail': 'sales',
  'user/userList': 'business',
  'user/userDetail': 'business',
  'billPayment/billPaymentDetail': 'purchases',
  'bill/billList': 'purchases',
  'invoicePayment/invoicePaymentDetail': 'sales',
  'customerReturn/customerReturnList': 'sales',
  'payrollSettings/payrollSettings': 'payroll',
  'supplierReturn/supplierReturnList': 'purchases',
  'supplierReturn/supplierReturnReceiveRefund': 'purchases',
  'receiveRefund/receiveRefund': 'banking',
  'customerReturn/customerReturnPayRefund': 'sales',
  'customerReturn/customerReturnApplyToSale': 'sales',
  'payRefund/payRefund': 'banking',
  'applyToSale/applyToSale': 'sales',
  'payItem/payItemList': 'payroll',
  'payItem/superPayItem': 'payroll',
  'payItem/wagePayItem': 'payroll',
  'payItem/deductionPayItemDetail': 'payroll',
  'payItem/expensePayItem': 'payroll',
  'prepareBasOrIas/prepareBasOrIas': 'business',
  'payItem/leavePayItem': 'payroll',
  'inTray/inTray': 'inTray',
  'linkedAccounts/linkedAccounts': 'business',
  'bankingRule/bankingRuleList': 'banking',
  'bankReconciliation/bankReconciliation': 'banking',
  'payRun/payRun': 'payroll',
  'bankingRule/bankingRuleSpendMoney': 'banking',
  'bankingRule/bankingRuleReceiveMoney': 'banking',
  'bankingRule/bankingRuleInvoice': 'banking',
  'bankingRule/bankingRuleBill': 'banking',
};

export const featuresConfig = {
  spendMoney: {
    routeName: 'spendMoney/spendMoneyDetail',
    params: {
      spendMoneyId: 'new',
    },
  },
  receiveMoney: {
    routeName: 'receiveMoney/receiveMoneyDetail',
    params: {
      receiveMoneyId: 'new',
    },
  },
  transferMoney: {
    routeName: 'transferMoney/transferMoneyDetail',
    params: {
      transferMoneyId: 'new',
    },
  },
  transactionList: {
    routeName: 'transactionList/transactionList',
  },
  createContact: {
    routeName: 'contact/contactDetail',
    params: {
      contactId: 'new',
    },
  },
  contactList: {
    routeName: 'contact/contactList',
  },
  employeeList: {
    routeName: 'employee/employeeList',
  },
  generalJournal: {
    routeName: 'generalJournal/generalJournalDetail',
    params: {
      generalJournalId: 'new',
    },
  },
  generalJournalList: {
    routeName: 'transactionList/transactionList',
    params: {
      sourceJournal: 'General',
    },
  },
  incomeAllocation: {
    routeName: 'incomeAllocation/incomeAllocation',
  },
  businessDetails: {
    routeName: 'business/businessDetail',
  },
  taxList: {
    routeName: 'tax/taxList',
  },
  quoteList: {
    routeName: 'quote/quoteList',
  },
  invoiceList: {
    routeName: 'invoice/invoiceList',
  },
  bankTransactionList: {
    routeName: 'banking/bankTransactionList',
  },
  inventory: {
    routeName: 'inventory/itemList',
  },
  userList: {
    routeName: 'user/userList',
  },
  billPayment: {
    routeName: 'billPayment/billPaymentDetail',
    params: {
      billPaymentId: 'new',
    },
  },
  billList: {
    routeName: 'bill/billList',
  },
  customerReturnList: {
    routeName: 'customerReturn/customerReturnList',
  },
  invoicePayment: {
    routeName: 'invoicePayment/invoicePaymentDetail',
    params: {
      invoicePaymentId: 'new',
    },
  },
  salesSettings: {
    routeName: 'salesSettings/salesSettingsDetail',
  },
  payrollSettings: {
    routeName: 'payrollSettings/payrollSettings',
  },
  supplierReturnList: {
    routeName: 'supplierReturn/supplierReturnList',
  },
  payItemList: {
    routeName: 'payItem/payItemList',
  },
  prepareBasOrIas: {
    routeName: 'prepareBasOrIas/prepareBasOrIas',
  },
  inTray: {
    routeName: 'inTray/inTray',
  },
  linkedAccounts: {
    routeName: 'linkedAccounts/linkedAccounts',
  },
  bankingRule: {
    routeName: 'bankingRule/bankingRuleList',
  },
  bankReconciliation: {
    routeName: 'bankReconciliation/bankReconciliation',
  },
};
