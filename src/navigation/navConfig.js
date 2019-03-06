export const activeMapping = {
  'spendMoney.spendMoneyDetail': 'banking',
  'receiveMoney.receiveMoneyDetail': 'banking',
  'transferMoney.transferMoneyDetail': 'banking',
  'transactionList.transactionList': 'banking',
  'contact.contactDetail': 'contact',
  'contact.contactList': 'contact',
  'generalJournal.generalJournalDetail': 'journals',
  'incomeAllocation.incomeAllocation': 'business',
  'business.businessDetail': 'business',
  'tax.taxList': 'business',
};

export const featuresConfig = {
  spendMoney: {
    routeName: 'spendMoney.spendMoneyDetail',
    params: {
      spendMoneyId: 'new',
    },
  },
  receiveMoney: {
    routeName: 'receiveMoney.receiveMoneyDetail',
    params: {
      receiveMoneyId: 'new',
    },
  },
  transferMoney: {
    routeName: 'transferMoney.transferMoneyDetail',
    params: {
      transferMoneyId: 'new',
    },
  },
  transactionList: {
    routeName: 'transactionList',
  },
  createContact: {
    routeName: 'contact.contactDetail',
    params: {
      contactId: 'new',
    },
  },
  contactList: {
    routeName: 'contact.contactList',
  },
  generalJournal: {
    routeName: 'generalJournal.generalJournalDetail',
    params: {
      generalJournalId: 'new',
    },
  },
  generalJournalList: {
    routeName: 'transactionList.transactionList',
    params: {
      sourceJournal: 'General',
    },
  },
  incomeAllocation: {
    routeName: 'incomeAllocation.incomeAllocation',
  },
  businessDetails: {
    routeName: 'business.businessDetail',
  },
  taxList: {
    routeName: 'tax.taxList',
  },
};
